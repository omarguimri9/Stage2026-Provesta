<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservation';

protected $fillable = ['user_id', 'vehicle_id', 'date_debut', 'date_fin', 'prix_total', 'statut'];

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
