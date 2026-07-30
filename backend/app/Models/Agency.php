<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = ['nom', 'adresse', 'ville', 'telephone', 'latitude', 'longitude'];

public function vehicules()
{
    return $this->hasMany(Vehicule::class, 'agency_id');
}
}
