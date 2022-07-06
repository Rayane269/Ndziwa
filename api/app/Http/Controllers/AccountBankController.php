<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Compte;
use Illuminate\Http\Request;

class AccountBankController extends Controller {
        
    /**
     * activate active un compte
     *
     * @param  Request $request
     * @return Response
     */
    public function activate(Request $request) {

        $user = $request->user();
        $account = Compte::where('user_id', $user->id)->first();
            
        if ($account->activated) {
            return response()->json(['message' => __('message.already_activated', ['attribute' => 'compte'])], 405);
        }
        
        if (is_null($user->nin)) {
            $fields = $request->validate(['nin' => ['required', 'min:9']]);
            if (User::where('nin', $fields['nin'])->first()) {
                return response()->json(['message' => __('validation.unique', ['attribute' => 'NIN'])], 406);
            } 
            $user->nin = $fields['nin'];
            $account->numero_compte = hash('md5', $fields['nin']);
            $user->save();
        }

        $account->activated = true;
        $account->activated_at = now();
        $account->save();

        return response()->json(['message' => __('message.activated', ['attribute' => 'compte'])], 201);

    }

    /**
     * desactivate desactive un compte
     *
     * @param  Request $request
     * @return void
     */
    public function desactivate(Request $request) {

        $account = Compte::where('user_id', $request->user()->id)
            ->update(['activated' => 0, 'activated_at' => null])
        ;

        if ($account) {
            return response()->json(['message' => __('message.desactivated', ['attribute' => 'compte'])], 201);
        }
    }
    
    /**
     * forceDelete supprime completement le compte
     * ça va également supprimer l'utilisateur
     *
     * @param  mixed $request
     * @return void
     */
    public function forceDelete(Request $request) {
        
    }
}