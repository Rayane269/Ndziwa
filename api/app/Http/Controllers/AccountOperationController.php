<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Operation\OperationCollection;
use App\Models\Operation;

/**
 * AccountOperationController recuperation des relevets de compte 
 */
class AccountOperationController extends Controller {


    public function getOperationsWithAnother(Request $request, int $id) {
        $operations = Operation::where([
                ['emetteur', '=', $request->user()->id],
                ['beneficiaire', '=', $id]
            ])
            ->orWhere([
                ['emetteur', '=', $id],
                ['beneficiaire', '=', $request->user()->id]
            ])->get()
        ;
        
        return new OperationCollection($operations);
    }

    public function getAllOperations(Request $request) {

    }
}