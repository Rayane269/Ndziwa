<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Register\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Inscrire un utilisateur
Route::prefix('/register')->controller(RegisterController::class)->group(function () {

    Route::post('/first-step', 'firstStep');
    Route::post('/second-step', 'secondStep');
    Route::post('/third-step', 'thirdStep');
    Route::post('/fourth-step', 'fourthStep');

});

//connecter un utilisateur
Route::post('/login', [LoginController::class, 'login'], 'login');


Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
