<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DepotController extends Controller {

    use TransactionTrait;
    
    /**
     * deposite dépose de l'argent
     *
     * @param  Request $request
     * @return Response 
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
        ]);

        $this->makeDepositOrWithdrawalTransaction($fields, $this->DEPOSITE);

        //bo mzé ngo djo gérer wewé ba nstu chinda 😂😂
        //renvoyer une vue et gerer le reste, les erreurs et tout
        
    }
}