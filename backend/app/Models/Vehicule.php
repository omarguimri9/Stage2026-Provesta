<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $table = 'vehicles';

    protected $fillable = [
        'marque', 'modele', 'annee', 'immatriculation', 
        'prix_par_jour', 'disponible', 'couleur', 
        'carburant', 'transmission', 'nombre_places', 
        'kilometrage', 'description', 'categorie_id', 'agency_id'
    ];
    
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'vehicle_id');
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }
    
    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id');
    }
    
    public function images()
    {
        return $this->hasMany(VehicleImage::class, 'vehicle_id');
    }
    
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'vehicle_id');
    }

 
}
