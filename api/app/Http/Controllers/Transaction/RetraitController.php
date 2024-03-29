<?php

namespace App\Http\Controllers\Transaction;

use App\Models\Compte;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class RetraitController extends Controller {

    use TransactionTrait;
    
    /**
     * withDrawal rétire de l'argent
     *
     * @param  Request $request
     * @return Response message de success si l'operation s'est bien terminer sinon une message d'erreur
     */
    public function withDrawal(Request $request) {

        // Si l'utilisateur n'est pas administrateur (ROLE_ADMIN)
        // On lui interdit l'accée
        if (!Gate::allows('transaction-argent', $request->user())) {
            return response()->json(['message' => 'forbidden'], 403);
        }

        $fields = $request->validate([
            'nin' => ['required', 'min:9'],
            'somme' => ['required'],
        ]);

        $this->makeDepositOrWithdrawalTransaction($fields, $this->WITHDRAWAL);
    }
}