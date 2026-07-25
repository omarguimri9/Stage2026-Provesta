<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicles';

protected $fillable = [
    'marque', 'modele', 'annee', 'immatriculation', 
    'prix_par_jour', 'disponible', 'image', 'couleur', 
    'carburant', 'transmission', 'description', 'categorie_id'
];

public function reservations()
{
    return $this->hasMany(Reservation::class, 'vehicle_id');
}

public function category()
{
    return $this->belongsTo(Category::class, 'categorie_id');
}
    //
}
