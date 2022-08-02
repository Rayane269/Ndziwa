<?php

use App\Http\Controllers\AccountBankController;
use App\Http\Controllers\AccountOperationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\Register\RegisterController;
use App\Http\Controllers\SecurityController;
use App\Http\Controllers\Transaction\DepotController;
use App\Http\Controllers\Transaction\RequestController;
use App\Http\Controllers\Transaction\RetraitController;
use App\Http\Controllers\Transaction\TransfertController;
use App\Http\Controllers\UserController;
use App\Http\Resources\OperationResource;
use App\Models\Operation;
use App\Models\User;

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

//Inscription
Route::prefix('/register')
    ->controller(RegisterController::class)
    ->group(function () {
        Route::post('/first-step', 'firstStep');
        Route::post('/second-step', 'secondStep');
        Route::post('/third-step', 'thirdStep');
        Route::post('/fourth-step', 'fourthStep');
    });

//Authentication
Route::post('/login', [LoginController::class, 'login'], 'login');
Route::post('/logout', [LoginController::class, 'logout']);

//activate and desactivate account bank
Route::middleware('auth:sanctum')
    ->prefix('/bank')
    ->controller(AccountBankController::class)
    ->group(function () {
        Route::post('/activate', 'activate');
        Route::post('/desactivate', 'desactivate');
    });

Route::middleware('auth:sanctum')
    ->post(
        'password-confirmation', 
        [SecurityController::class, 'passwordConfirmation']
    );

//transaction
Route::middleware('auth:sanctum')
    ->prefix('/transaction/')
    ->group(function () {
        Route::post('deposit', [DepotController::class, 'deposite']);
        Route::post('withdrawal', [RetraitController::class, 'withDrawal']);
        Route::post('send', [TransfertController::class, 'send']);
        Route::post('request', [RequestController::class, 'request']);
    });

//profile
Route::middleware('auth:sanctum')->get('/me', [UserController::class, 'me']);

//resources
Route::get('/regions', [RegionController::class, 'index'], 'regions');
Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        '/operations/{id}', 
        [AccountOperationController::class, 'getOperationsWithAnother'], 
        'operation'
    )->where('id', '[0-9]+');
});


//verify sms
Route::middleware('auth:sanctum')->post('/sms-verify', [SecurityController::class, 'smsVerify']);