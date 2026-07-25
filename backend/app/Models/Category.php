<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['nom', 'description'];

public function vehicules()
{
    return $this->hasMany(Vehicule::class, 'categorie_id');
}
    //
}
