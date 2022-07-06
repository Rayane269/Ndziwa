<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Models\Compte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DepotController extends Controller {

    use TransactionTrait;
    
    /**
     * deposite dépose de l'argent
     *
     * @param  Request $request
     * @return Response message de success si l'operation s'est bien terminer sinon une message d'erreur
     */
    public function deposite(Request $request) {

        // Si l'utilisateur n'est pas administrateur (ROLE_ADMIN)
        // On lui interdit l'accée
        if (!Gate::allows('transaction-argent', $request->user())) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $fields = $request->validate([
            'nin' => ['required', 'min:9'],
            'somme' => ['required'],
            'libelle',
        ]);
        
        $account = Compte::where('numero_compte', hash('md5', $fields['nin']))->first();

        if ($account === null) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $somme = (float) $fields['somme'];
        $account->bourse += $somme;
        // On enregistre l'opération
        $transaction = $this->registerTransaction('dépôt', $account, $somme, $fields['libelle'] ?? null);

        if ($transaction) {
            return response()->json(['success' => __('message.success')], 201);
        } else 
            return response()->json(['error' => __('message.error')], 401);
        
    }
}