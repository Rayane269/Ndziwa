<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {


    /**
     * login Authentifie un utilisateur
     *
     * @param  Request  $request
     * @return Response
     */    

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'telephone' => ['required'],
            'password' => [],
        ]);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json($request->user());
        }

        return response()->json([
            'error' => __('auth.failed')
        ], 401);
    }
}