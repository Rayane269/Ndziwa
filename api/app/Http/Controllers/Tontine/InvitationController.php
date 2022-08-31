<?php

namespace App\Http\Controllers\Tontine;

use App\Models\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvitationController extends Controller {

    use TontineTrait;

    /**
     * accepter une invitation 
     *
     * @param  int $idGroup identifiant du group
     * @return void
     */
    public function acceptInvitation(Request $request, int $id) {
        $group = Group::findOrFail($id);
        $user = $request->user();

        if ($user->cannot('view', $group)) {
            abort(403, __('message.unauthorize'));
        }

        return response()->json(
            $group->members()
            ->updateExistingPivot($user->id, ['invitation_accepted' => true])
        );
    }

    /**
     * refuser l'invitation
     *
     * @param  int $id identifiant du group
     * @return void
     */
    public function removeInvitation(Request $request, int $id) {
        
        $group = Group::findOrFail($id);
        $user = $request->user();

        if ($user->cannot('view', $group)) {
            abort(403, __('message.unauthorize'));
        }

        $this->detachUserOfGroup($user, $group);
    }
}