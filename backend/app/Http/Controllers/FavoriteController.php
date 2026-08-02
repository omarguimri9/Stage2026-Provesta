<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = Favorite::with('vehicule')
            ->where('user_id', $request->user_id)
            ->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vehicle_id' => 'required|exists:vehicles,id',
        ]);

        $favorite = Favorite::firstOrCreate($validated);
        return response()->json($favorite, 201);
    }

    public function destroy(Favorite $favorite)
    {
        $favorite->delete();
        return response()->json(['message' => 'Favori supprimé avec succès']);
    }
}