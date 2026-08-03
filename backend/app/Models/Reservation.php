<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservation';
    protected $fillable = [
        'user_id', 'vehicle_id', 'date_debut', 'date_fin', 
        'montant_total', 'mode_paiement', 'statut_paiement', 
        'statut', 'lieu_prise_en_charge', 'lieu_retour'
    ];

public function user()
{
    return $this->belongsTo(User::class);
}

public function vehicule()
{
    return $this->belongsTo(Vehicule::class, 'vehicle_id');
}
    //
}
