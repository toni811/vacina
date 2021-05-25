<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImpfungController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// CONTROLLER WERDEN AUFGERUFEN
/*
Route::get('/', [ImpfungController::class,'index']);
Route::get('/Impfung', [ImpfungController::class,'index']);
Route::get('/Impfung/{impfung}',[ImpfungController::class,'show']);
*/
Route::get('/', [\App\Http\Controllers\ImpfungController::class,'index']);
Route::get('/Impfung', [\App\Http\Controllers\ImpfungController::class,'index']);
Route::get('/Impfung/{impfung}',[\App\Http\Controllers\ImpfungController::class,'show']);



