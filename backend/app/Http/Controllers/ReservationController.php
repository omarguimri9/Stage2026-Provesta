<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Vehicule;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    // Affiche toutes les réservations
    public function index()
    {
        $reservations = Reservation::with(['user', 'vehicule'])->get();
        return response()->json($reservations);
    }

    // Créer une nouvelle réservation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'date_debut' => 'required|date|after_or_equal:today',
            'date_fin' => 'required|date|after:date_debut',
            'mode_paiement' => 'nullable|string',
            'lieu_prise_en_charge' => 'nullable|string',
            'lieu_retour' => 'nullable|string',
        ]);

        // Vérifier si le véhicule est déjà réservé sur cette période
        $conflit = Reservation::where('vehicle_id', $validated['vehicle_id'])
            ->whereIn('statut', ['en_attente', 'confirmee'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('date_debut', [$validated['date_debut'], $validated['date_fin']])
                    ->orWhereBetween('date_fin', [$validated['date_debut'], $validated['date_fin']])
                    ->orWhere(function ($q) use ($validated) {
                        $q->where('date_debut', '<=', $validated['date_debut'])
                          ->where('date_fin', '>=', $validated['date_fin']);
                    });
            })->exists();

        if ($conflit) {
            return response()->json(['message' => 'Ce véhicule est déjà réservé sur cette période.'], 409);
        }

        // Calculer le montant total automatiquement
        $vehicule = Vehicule::findOrFail($validated['vehicle_id']);
        $jours = (strtotime($validated['date_fin']) - strtotime($validated['date_debut'])) / 86400;
        $validated['montant_total'] = $jours * $vehicule->prix_par_jour;
        $validated['statut'] = 'en_attente';
        $validated['statut_paiement'] = 'en_attente';

        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }

    // Affiche une réservation spécifique
    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load(['user', 'vehicule']));
    }

    // Modifier une réservation (statut, paiement...)
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'statut' => 'sometimes|in:en_attente,confirmee,annulee,terminee',
            'statut_paiement' => 'sometimes|in:en_attente,paye,rembourse',
        ]);

        $reservation->update($validated);
        return response()->json($reservation);
    }

    // Supprimer une réservation
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(['message' => 'Réservation supprimée avec succès']);
    }
}