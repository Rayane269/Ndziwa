<?php

namespace App\Http\Controllers\Transaction;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\User;

class TransfertController extends Controller {

    use TransactionTrait;

    public function send(Request $request): JsonResponse {

        $fields = $request->validate([
            "telephone" => ["required"],
            "somme" => ["required", "max:10"],
            "libelle" => ["max:200"]
        ]);

        $user = User::where('telephone', $fields['telephone'])->first();
        
        if ($user === null) {
            throw new TransactionException(__("message.inaccessible", ["ressource" => "cet utilisateur"]), 404);
        }
        
        $fields["nin"] = $user->nin;

        if (!$this->makeTransfertTransaction($fields, $this->TRANSFER)) {
            throw new TransactionException(__("message.error"), 400);
        }

        return response()->json(__("message.success"));
    }

}