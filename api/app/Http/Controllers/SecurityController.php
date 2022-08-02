<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SecurityController extends Controller {

    public function passwordConfirmation(Request $request): JsonResponse {
        $password = $request->validate([
            "password" => ["required"]
        ]);
        return response()->json(["message" => __("message.success")]);
    }

    public function smsVerify (Request $request) {

        $code = $request->validate([
            "code" => ["required"]
        ]);

        if ($code["code"] === "1234") {
            return response()->json(["message" => __("message.success")]);
        }
        
        throw new Exception(__("validation.confirmed", ["attribute" => "code"]), 403);
    }
}