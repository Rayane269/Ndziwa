<?php

namespace App\Http\Controllers\Register;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller {

    /**
     * firstStep enregistre les informations pérsonnelles 
     * Nom, Prénom et date de naissance
     *
     * @param  Request $request
     * @return Response
     */
    public function firstStep(Request $request) {
        
        $credentials = $request->validate([
            'nom' => ['required'],
            'prenom' => ['required'],
            'date_naissance' => ['required'],
        ]);
        
        $this->saveStep($request->session(), $credentials, 1);
        return response()->json(['message' => __('message.success')], 201);
    } 
    
    /**
     * secondStep verification du numero de téléphone
     * Enregistre le numero de téléphone et la région (pays)
     * 
     * @param  Request $request
     * @return Response
     */
    public function secondStep(Request $request) {

        $credentials = $request->validate([
            'region_id' => ['required'],
            'telephone' => ['required']
        ]);

        /* si le numero de téléphone est déja enregistré 
        / on renvois un message d'erreur
        */
        if (DB::table('users')->where('telephone', $credentials['telephone'])->count() > 0) {
            return response()->json([
                'errors' => [
                    'telephone' => __('validation.unique', ['attribute' => 'telephone'])
                ]
            ], 401);
        }
        
        if (!$this->saveStep($request->session(), $credentials, 2)) {
            return response()->json(['message' => __('message.step_indefined')], 401);
        }
        return response()->json(['message' => __('message.success')], 201);
    } 
    
    /**
     * thirdStep Verification du code envoyé par sms sur le numero de telephone
     *
     * @param  Request $request
     * @return void
     */
    public function thirdStep(Request $request) {

        $credentials = $request->validate([
            'first' => ['required', 'max:1'],
            'second' => ['required', 'max:1'],
            'third' => ['required', 'max:1'],
            'quatre' => ['required', 'max:1']
        ]);

        //$code = (int) $credentials['first'] . $credentials['second'] . $credentials['third'] . $credentials['quatre'];
        if (!$this->saveStep($request->session(), ['telephone_verified_at' => now()], 3)) {
            return response()->json(['message' => __('message.step_indefined')], 401);
        }

        return response()->json(['message' => __('message.success')], 201);
       
    } 
    
    /**
     * fourthStep Confirmer le mot de passe 
     * inscrir l'utisateur dans la base de données
     *
     * @param  Request $request
     * @return void
     */
    public function fourthStep(Request $request) {
        
        $credentials = $request->validate([
            'password' => ['required'],
            'confirm_password' => ['required']
        ]);
        
        if ($credentials['password'] !== $credentials['confirm_password']) {
            return response()->json([
                'errors' => [
                    'confirm_password' => __('validation.confirmed', ['attribute' => 'password'])
                ]
            ], 406);
        }

        $session = $request->session();
        $step = $this->saveStep(
            $session, 
            ['password' => Hash::make($credentials['password'])], 
            4
        );

        if (!$step) {
            return response()->json(['message' => __('message.step_indefined')], 401);
        }

        if (!$this->persistUser($session->get('register.steps'))) {
            $request->session()->forget('register');
            return response()->json(['message' => __('message.error')], 401);
        }
        $request->session()->forget('register');
        return response()->json(['message' => __('message.success')]);
    } 
    
    /**
     * saveStep
     *
     * @param  SessionInterface $session
     * @param  array $data
     * @param  string $step
     * @return bool
     */
    private function saveStep(Session $session, array $data, int $step) {
        $key = "register.steps.$step";
        $count = 'register.count';
        
        if ($step > 1 and $step - 1 !== $session->get($count)) {
            return false;
        }
        
        if (!$session->exists($key)) {
            $session->put($key, $data);
            if ($step !== 4) {
                $session->increment($count);
            } 
        }

        return true;
    }
    
    /**
     * persistUser persiste un nouvel utilisateur
     *
     * @param  array $steps
     * @return bool true si l'utilisateur est persisté et false sinon
     */
    private function persistUser(array $steps) {
        
        $values = array_reduce($steps, function ($a, $b) {
            return array_merge($a, $b);
        }, []);
        
        $user = User::create($values);
        return $user instanceof User;
    }
}