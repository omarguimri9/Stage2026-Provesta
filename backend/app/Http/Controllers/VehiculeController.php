<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    // Affiche tous les véhicules
    public function index()
    {
        $vehicules = Vehicule::with(['category', 'agency', 'images'])->get();
        return response()->json($vehicules);
    }

    // Ajoute un nouveau véhicule
    public function store(Request $request)
    {
        $validated = $request->validate([
            'marque' => 'required|string',
            'modele' => 'required|string',
            'annee' => 'required|integer',
            'immatriculation' => 'required|string|unique:vehicles',
            'prix_par_jour' => 'required|numeric',
            'carburant' => 'required|string',
            'transmission' => 'required|string',
            'categorie_id' => 'required|exists:categories,id',
            'agency_id' => 'required|exists:agencies,id',
        ]);

        $vehicule = Vehicule::create($validated);
        return response()->json($vehicule, 201);
    }

    // Affiche un véhicule spécifique
    public function show(Vehicule $vehicule)
    {
        return response()->json($vehicule->load(['category', 'agency', 'images']));
    }

    // Modifie un véhicule
    public function update(Request $request, Vehicule $vehicule)
    {
        $validated = $request->validate([
            'marque' => 'sometimes|string',
            'modele' => 'sometimes|string',
            'annee' => 'sometimes|integer',
            'prix_par_jour' => 'sometimes|numeric',
            'disponible' => 'sometimes|boolean',
        ]);

        $vehicule->update($validated);
        return response()->json($vehicule);
    }

    // Supprime un véhicule
    public function destroy(Vehicule $vehicule)
    {
        $vehicule->delete();
        return response()->json(['message' => 'Véhicule supprimé avec succès']);
    }
}