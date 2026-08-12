<?php

namespace App\Http\Controllers;

use App\Models\VehicleImage;
use App\Http\Requests\StoreVehicleImageRequest;

class VehicleImageController extends Controller
{
    public function store(StoreVehicleImageRequest $request)
    {
        $image = VehicleImage::create($request->validated());
        return response()->json($image, 201);
    }

    public function destroy(VehicleImage $vehicleImage)
    {
        $vehicleImage->delete();
        return response()->json(['message' => 'Image supprimée avec succès']);
    }
}