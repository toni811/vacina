<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

///
///LOGIN
///
Route::post('auth/login', [\App\Http\Controllers\AuthController::class,'login']);*/


///
///IMPFUNG
///

    // DELET -> DELET
    Route::delete('Impfung/{title}', [\App\Http\Controllers\ImpfungController::class,'delete']);






// SAVE -> POST
Route::post('Impfung', [\App\Http\Controllers\ImpfungController::class,'save']);

//UPDATE -> PUT
Route::put('Impfung/{title}', [\App\Http\Controllers\ImpfungController::class,'update']);

//INDEX
Route::get('Impfung', [\App\Http\Controllers\ImpfungController::class,'index']);

// Impfung nach Titel suchen
Route::get('Impfung/{title}', [\App\Http\Controllers\ImpfungController::class,'findByTitle']);


// CHECK TITLE
Route::get('Impfung/checkTitle/{title}', [\App\Http\Controllers\ImpfungController::class,'checkTitle']);


///
/// ORT
///
Route::get('orts', [\App\Http\Controllers\OrtController::class,'index']);

// SAVE -> POST
Route::post('ort', [\App\Http\Controllers\OrtController::class,'save']);

//UPDATE -> PUT
Route::put('ort/{address}', [\App\Http\Controllers\OrtController::class,'update']);

//DELET
Route::delete('ort/{address}', [\App\Http\Controllers\OrtController::class,'delete']);


///
/// USER
///

// FINDBY SVN
Route::get('user/{SVN}', [\App\Http\Controllers\UserController::class, 'findBySVN']);

// INDEX
Route::get('user', [\App\Http\Controllers\UserController::class,'index']);

Route::get('user/{id}', [UserController::class, 'findById']);



// DELET -> DELET
Route::delete('user/{SVN}', [\App\Http\Controllers\UserController::class,'delete']);


// SAVE -> POST
Route::post('user', [\App\Http\Controllers\UserController::class,'save']);







// ISADMIN x
Route::get('user/isAdmin/{SVN}', [\App\Http\Controllers\UserController::class, 'isAdmin']);

// ISVACCINATED  x

//UPDATE -> PUT x
// "updating User failed: Call to undefined relationship [user] on model [App\\Models\\User]."
Route::put('user/{SVN}', [\App\Http\Controllers\UserController::class,'update']);

