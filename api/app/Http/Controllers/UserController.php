<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    
    /**
     * me recupére les informations de l'utilisateur courant
     *
     * @param  Request $request
     * @return Response
     */
    public function me(Request $request) {
        return new UserResource($request->user());
    }

    /**
     * Recuperer tous les utilisateurs
     */
    public function index() {
        return new UserCollection(User::all());
    }
}