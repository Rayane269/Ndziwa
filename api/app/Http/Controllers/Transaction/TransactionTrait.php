<?php

namespace App\Http\Controllers\Transaction;

use App\Models\User;
use App\Models\Compte;
use App\Models\Operation;
use Illuminate\Http\Request;

trait TransactionTrait {

    private $TRANSFER = "transfer";
    private $DEPOSITE = "deposite";
    private $WITHDRAWAL = "withdrawal";
    private $REQUEST = "request";

    private string $type;
    private float $somme;
    

    public function __construct(private Request $request) {}

        
    /**
     * registerTransaction 
     * 
     * @param string $type type de transaction (dépot, transfert, demande, rétrait)
     * @param Compte $account compte banquaire de la personne concerné (ou qui effectue le transfert)
     * @param User $beneficiaire utilisateur bénéficiaire du transfert
     * @param float $somme somme a débourser
     * @param string $libellé message 
     * 
     * @return bool
     */
    public function registerTransaction(
        string $type, 
        Compte $account, 
        ?User $beneficiaire,  
        float $somme, 
        string $libelle
    ) {

        $this->type = $type;
        $this->somme = $somme;

        if (!$account->save()) {
            return false;
        }

        if ($this->type === $this->TRANSFER) {

            //enregistre le transfert de l'argent
            $this->saveOperation(
                $account, 
                $this->request->user(),
                $beneficiaire,
                $libelle
            );

            //enregistre la reception de l'argent
            $this->saveOperation(
                $beneficiaire->compte, 
                $this->request->user(),
                $beneficiaire,
                __("message.receve", ["somme" => $this->somme])
            );

        } else {
            $this->saveOperation(
                $account, 
                null,
                null,
                $libelle
            );
        }
        
        return true;
    }

        
/**
 *  faire un transfert d'argent depuis le compte de l'utilisateur courant vers un autre compte
 *
 * @param  array $fields
 * @param  string $type
 * @return bool
 */
public function makeTransfertTransaction($fields=[], $type) {
		
	$somme = (float) $fields['somme'];
	$accountBeneficiaire = Compte::where('numero_compte', hash('md5', $fields['nin']))->first();
	$accountEmetteur = $this->request->user()->compte;

	if ($accountBeneficiaire === null) {
		throw new TransactionException(
			__(
				"message.inaccessible", 
				["ressource" => "cet utilisateur"]
			), 
			404
		);
	}

	if ($accountBeneficiaire->id === $accountEmetteur->id) {
		throw new TransactionException(__("message.error"));
	}

	if (!$accountBeneficiaire->activated || !$accountEmetteur->activated) {
		throw new TransactionException(__("message.not_activated"), 403);
	}
	
	if ($accountEmetteur->bourse <  $somme) {
		throw new TransactionException(__("message.insufficient_amout"), 403);
	}

	$accountEmetteur->bourse -= $somme;
	$accountBeneficiaire->bourse += $somme;
	$accountBeneficiaire->save();

	// On enregistre l'opération
	return $this->registerTransaction(
		$type, 
		$accountEmetteur,
		$accountBeneficiaire->user, 
		$somme, 
		!empty($fields['libelle']) ? $fields['libelle'] :  __("message.transfer", ['somme' => $somme]) 
	);
}
    
    /**
     * makeDepositOrWithdrawalTransaction
     *
     * @param  array $fields
     * @param  string $type
     * @return void
     */
    public function makeDepositOrWithdrawalTransaction($fields=[], $type) {

        $somme = (float) $fields['somme'];
        $account = Compte::where('numero_compte', hash('md5', $fields['nin']))->first();

        if ($account === null) {
            throw new TransactionException(
                __(
                    "message.inaccessible", 
                    ["ressource" => "cet utilisateur"]
                ), 
                404
            );
        }

        if ($account->user->nin === null) {
            throw new TransactionException(__("message.not_activated"), 403);
        }
        
        if ($type === $this->DEPOSITE) {
            $account->bourse += $somme;
        } else {
            $account->bourse -= $somme;
        }

        // On enregistre l'opération
        return $this->registerTransaction(
            $type, 
            $account,
            null,
            $somme, 
            $type === $this->DEPOSITE ? __("message.deposite", ['somme' => $somme]) : __("message.withdrawal", ['somme' => $somme])
        );
    }
        
    /**
     * saveOperation
     *
     * @param  Compte $account
     * @param  ?User $emetteur
     * @param  ?User $beneficiaire
     * @param  string $libelle
     * @return void
     */
    private function saveOperation(Compte $account, ?User $emetteur, ?User $beneficiaire, string $libelle) {

        $operation = new Operation();
        $operation->compte()->associate($account);

        if ($this->type === $this->TRANSFER) {
            $operation->emit()->associate($emetteur);
            $operation->accredit()->associate($beneficiaire);

        } else if ($this->type === $this->DEPOSITE || $this->type === $this->WITHDRAWAL) {
            $operation->deposit()->associate($this->request->user());
        }

        $operation->somme = $this->somme;
        $operation->type_operation = $this->type;
        $operation->libelle = $libelle;
        
        $operation->save();
    }
}