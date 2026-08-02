<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehiculeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\VehicleImageController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('vehicules', VehiculeController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('agencies', AgencyController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('favorites', FavoriteController::class)->only(['index', 'store', 'destroy']);
Route::apiResource('vehicle-images', VehicleImageController::class)->only(['store', 'destroy']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});