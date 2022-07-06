<?php

namespace App\Http\Controllers\Transaction;

use App\Models\Operation;
use Illuminate\Http\Request;

trait TransactionTrait {
    
    public function __construct(private Request $request) {}

    /**
     * registerTransaction
     *
     * @param  string $type type d'operation (dépot, retrait ... )
     * @param  Compte $account compte qui va recevoir le dépôt
     * @param  float $somme la somme à déposser
     * @param  string $libelle déscription de l'opération
     * @return bool renvoie true si la transaction est effectué ou fasle sinon
     *  
     */
    public function registerTransaction($type, $account, $somme, $libelle) {
        
        if ($account->save()) {
            $operation = new Operation();
            $operation->compte()->associate($account);
            $operation->type_operation = $type;
            $operation->somme = $somme;
            $operation->libelle = $libelle;
            $operation->responsable()->associate($this->request->user());
            return $operation->save();
        }

        return false;
    }
}