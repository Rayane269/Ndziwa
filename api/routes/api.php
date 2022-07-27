<?php

use App\Http\Controllers\AccountBankController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\Register\RegisterController;
use App\Http\Controllers\Transaction\DepotController;
use App\Http\Controllers\Transaction\RetraitController;
use App\Http\Controllers\UserController;

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

//Inscription des utilisateurs
Route::prefix('/register')->controller(RegisterController::class)->group(function () {

    Route::post('/first-step', 'firstStep');
    Route::post('/second-step', 'secondStep');
    Route::post('/third-step', 'thirdStep');
    Route::post('/fourth-step', 'fourthStep');

});

//Route liée a l'authentification de l'utilisateur
Route::post('/login', [LoginController::class, 'login'], 'login');
Route::post('/logout', [LoginController::class, 'logout']);


Route::get('/regions', [RegionController::class, 'index'], 'regions');


//route liée aux comptes bancaires
Route::middleware('auth:sanctum')->prefix('/bank')->controller(AccountBankController::class)->group(function () {
    Route::post('/activate', 'activate');
    Route::post('/desactivate', 'desactivate');
});

Route::middleware('auth:sanctum')->prefix('/transaction/')->group(function () {
    Route::post('deposit', [DepotController::class, 'deposite']);
    Route::post('withdrawal', [RetraitController::class, 'withDrawal']);
});

//profile
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);
