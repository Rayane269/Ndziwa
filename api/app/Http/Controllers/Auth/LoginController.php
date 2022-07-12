<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
            'password' => ['required'],
        ]);
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json($request->user());
        }

        return response()->json([
            'errors' => __('auth.failed')
        ], 401);
    }
}