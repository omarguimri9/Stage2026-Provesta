<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehiculeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ReservationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('vehicules', VehiculeController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('agencies', AgencyController::class);
Route::apiResource('reservations', ReservationController::class);