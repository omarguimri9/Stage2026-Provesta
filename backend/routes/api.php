<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehiculeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\VehicleImageController;

// Routes publiques (pas besoin de connexion)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/vehicules', [VehiculeController::class, 'index']);
Route::get('/vehicules/{vehicule}', [VehiculeController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/agencies', [AgencyController::class, 'index']);

// Routes protégées (connexion obligatoire)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('favorites', FavoriteController::class)->only(['index', 'store', 'destroy']);
});

// Routes protégées - Admin uniquement
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/vehicules', [VehiculeController::class, 'store']);
    Route::put('/vehicules/{vehicule}', [VehiculeController::class, 'update']);
    Route::delete('/vehicules/{vehicule}', [VehiculeController::class, 'destroy']);

    Route::apiResource('categories', CategoryController::class)->except(['index']);
    Route::apiResource('agencies', AgencyController::class)->except(['index']);
    Route::apiResource('vehicle-images', VehicleImageController::class)->only(['store', 'destroy']);
});