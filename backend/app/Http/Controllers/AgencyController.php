<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    public function index()
    {
        return response()->json(Agency::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'adresse' => 'required|string',
            'ville' => 'required|string',
            'telephone' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $agency = Agency::create($validated);
        return response()->json($agency, 201);
    }

    public function show(Agency $agency)
    {
        return response()->json($agency->load('vehicules'));
    }

    public function update(Request $request, Agency $agency)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string',
            'adresse' => 'sometimes|string',
            'ville' => 'sometimes|string',
        ]);

        $agency->update($validated);
        return response()->json($agency);
    }

    public function destroy(Agency $agency)
    {
        $agency->delete();
        return response()->json(['message' => 'Agence supprimée avec succès']);
    }
}