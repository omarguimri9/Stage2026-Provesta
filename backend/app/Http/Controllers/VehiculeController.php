<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use App\Http\Requests\VehiculeRequest;

class VehiculeController extends Controller
{
    // Affiche tous les véhicules
    public function index()
    {
        $vehicules = Vehicule::with(['category', 'agency', 'images'])->get();
        return response()->json($vehicules);
    }

    // Ajoute un nouveau véhicule
    public function store(VehiculeRequest $request)
    {
        $vehicule = Vehicule::create($request->validated());
        return response()->json($vehicule, 201);
    }

    // Affiche un véhicule spécifique
    public function show(Vehicule $vehicule)
    {
        return response()->json($vehicule->load(['category', 'agency', 'images']));
    }

    // Modifie un véhicule
    public function update(VehiculeRequest $request, Vehicule $vehicule)
    {
        $vehicule->update($request->validated());
        return response()->json($vehicule);
    }

    // Supprime un véhicule
    public function destroy(Vehicule $vehicule)
    {
        $vehicule->delete();
        return response()->json(['message' => 'Véhicule supprimé avec succès']);
    }
}