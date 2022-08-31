<?php

namespace App\Http\Controllers\Tontine;

use Exception;
use App\Models\Etat;
use App\Models\User;
use App\Models\Group;
use App\Models\Montant;
use App\Models\Frequence;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Transaction\TransactionException;
use App\Http\Resources\Group\GroupResource;
use App\Http\Resources\Group\GroupCollection;
use DateInterval;
use DateTimeImmutable;

class TontineController extends Controller {
    
    use TontineTrait;

    const JOURNALIERE = "journaliere";
    const HEBDOMADAIRE = "hebdomadaire";
    const MENSUELL = "mensuelle";
    const ANNUELLE = "annuelle";

    /**
     * Prémiere étape de la création d'une tontine 
     * Définir les objectifs 
     * Définir le prix et la fréquence liée aux versement
     * 
     * @param  Request $request
     * @return JsonResponse
     */
    public function defineTontineObjectif(Request $request) {
        $data = $request->validate([
            "objectif" => ["required"],
            "montant" => ["required"],
            "frequence" => ["required"],
        ]);

        $user = $request->user();
        
        $tontine = new Group();
        $tontine->objectif = $data["objectif"];
        $tontine->memberAdmin()->associate($user);
        $tontine->montant()->associate(Montant::findOrFail($data["montant"]));
        $tontine->frequence()->associate(Frequence::findOrFail($data["frequence"]));
        $tontine->etat()->associate(Etat::findOrFail(1));
        $tontine->date_debut_souhaite = now();
        
        if (!$tontine->save()) {
            throw new Exception(__('message.error'));
        }
        
        $tontine->members()->attach($user->id);
        $roles = json_decode($user->roles);
        $roles[] = "ROLE_ADMIN_GROUP_$tontine->id";
        $user->roles = json_encode($roles);
        $user->save();

        return response()->json($tontine->id, 201);
    }
        
    /**
     * Sécond étape de la création d'une tontine
     * Ajouter des membres
     * 
     * @param  Request $request
     * @param int $id identifiant du groupe
     * @return JsonResponse
     */
    public function addGroupMembers(Request $request, int $id) {
        $group = Group::findOrFail($id);
        if ($request->user()->cannot('update', $group)) {
            abort(403, __('message.unauthorize'));
        }
        
        $members = $request->validate([
            "members" => ["required"]
        ]);
        
        foreach ($members['members'] as $member) {
            $user = User::findOrFail($member['id']);
            $roles = json_decode($user->roles);
            $needle = "ROLE_MEMBER_GROUP_$group->id";
            if (in_array($needle, $roles)) {
                abort(200, "L'utilisateur est déja enregistré");
            }
            $roles[] = $needle;
            $user->roles = json_encode($roles);
            $user->save();
            $group->members()->attach($user->id);
        }

        return response()->json($id, 201);
    }
        
    /**
     * Troisiéme étape definir l'ordre de collection
     *
     * @param  Request $request
     * @param int $id identifiant du groupe
     * @return JsonResponse
     */
    public function defineCollectionOrder(Request $request, int $id) {

        $group = Group::findOrFail($id);
        if ($request->user()->cannot('update', $group)) {
            abort(403, __('message.unauthorize'));
        }
        $members = $request->validate([
            "members" => ["required"]
        ]);

        $currentTime = new DateTimeImmutable();
        $frequence = $group->load('frequence')->frequence->libelle;
        
        foreach ($members['members'] as $member) {
            $rang = $member["rang"];
            $dateCollect = $currentTime;

            
            if ($frequence === self::JOURNALIERE) {
                $dateCollect = $dateCollect->add(new DateInterval('P' . $rang . 'D'));
            } else if ($frequence === self::HEBDOMADAIRE) {
                $dateCollect = $currentTime->add(new DateInterval('P' . 7 * $rang . 'D'));
            } else if ($frequence === self::MENSUELL) {
                $dateCollect = $currentTime->add(new DateInterval('P' . $rang . 'M'));
            } else if ($frequence === self::ANNUELLE) {
                $dateCollect = $currentTime->add(new DateInterval('P' . $rang . 'Y'));
            }

            $group->members()->updateExistingPivot(
                $member['id'], 
                ['rang' => $rang, 'date_collecte' => $dateCollect]
            );
        }

        $group->etat()->associate(Etat::findOrFail(2));
        $group->save();

        return response()->json($id, 201);
    }
        
    /**
     * supprimer un membre du groupe
     *
     * @param  Request $request
     * @param int $id identifiant du group
     * @return void
     */
    public function removeMember(Request $request, int $id) {
        $group = Group::findOrFail($id);
        if ($request->user()->cannot('update', $group)) {
            abort(403, __('message.unauthorize'));
        }

        $user = $request->validate([
            "user" => ["required"]
        ]);

        $this->detachUserOfGroup(User::findOrFail($user["user"]), $group);
    }
    
    /**
     * payer le round d'un tontine
     *
     * @param  Request $request
     * @param  int $id identifiant du groupe
     * @return void
     */
    public function pay(Request $request, int $id) {
        $group = Group::findOrFail($id)->load(['members', 'montant']);
        $user = $request->user();
        if ($user->cannot('view', $group)) {
            abort(403, __('message.unauthorize'));
        }
        
        //si l'utilisateur n'a pas encore payé
        foreach ($group->members as $member) {
            if ($member->id === $user->id && !$member->pivot->paid) {
                if ($user->compte->bourse < $group->montant->prix) throw new TransactionException(__('message.insufficient_amout'));
                $user->compte->bourse -= $group->montant->prix;
                $user->compte->save();
                $user->save();
                return response()->json($group->members()->updateExistingPivot($user->id, ['paid' => true]), 201);
            }
        }

        return response()->json(0, 200);
    }
    
    /**
     * 
     *
     * @param  Request $request
     * @param  int $id identifiant du group
     * @return void
     */
    public function collect(Request $request, int $id) {
        $group = Group::findOrFail($id)->load(['members', 'montant']);
        if ($request->user()->cannot('update', $group)) {
            abort(403, __('message.unauthorize'));
        }

        foreach ($group->members as $member) {
            if (!$member->pivot->paid) {
                abort(405, __('message.not_paid'));
            }

            if ($member->pivot->rang === $group->round) {
                $member->compte->bourse += count($group->members) * $group->montant;
                $member->compte->save();
            }
        }

        $group->round += 1;
        $group->save();
    }
        
    /**
     * Récuperer une collection de tontine
     *
     * @param  mixed $request
     * @return void
     */
    public function index(Request $request) {

        if ($request->has('user')) {
            $groups = Group::whereRelation(
                'members', 'user_id', 
                $request->query('user'))
                ->get()->load(['members', 'frequence', 'montant', 'etat']);
            return new GroupCollection($groups);
        }

        if ($request->user()->cannot('viewAny')) {
            abort(403, __('message.unauthorize'));
        }
        
        return new GroupCollection(Group::paginate());

    }

    /**
     * Récuperer une ressource de tontine
     *
     * @param  Request $request
     * @return void
     */
    public function show(Request $request, int $id) {
        $group = Group::findOrFail($id)->load(['members', 'frequence', 'montant', 'etat']);
        if ($request->user()->cannot('update', $group)) {
            abort(403, __('message.unauthorize'));
        }
        return new GroupResource($group);
    }
        
    /**
     * supprimer une ressource de tontine
     *
     * @param  Request $request
     * @param  int $id
     * @return void
     */
    public function remove(Request $request, int $id) {

    }
}