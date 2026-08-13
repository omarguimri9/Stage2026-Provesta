<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'client')->withCount('reservations')->get();
        return response()->json($users);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Client supprimé avec succès']);
    }
}