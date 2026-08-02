<?php

namespace App\Http\Controllers;

use App\Models\VehicleImage;
use Illuminate\Http\Request;

class VehicleImageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'image_path' => 'required|string',
            'is_principale' => 'boolean',
        ]);

        $image = VehicleImage::create($validated);
        return response()->json($image, 201);
    }

    public function destroy(VehicleImage $vehicleImage)
    {
        $vehicleImage->delete();
        return response()->json(['message' => 'Image supprimée avec succès']);
    }
}