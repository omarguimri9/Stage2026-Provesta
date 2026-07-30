<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleImage extends Model
{
    protected $table = 'vehicle_images';

protected $fillable = ['vehicle_id', 'image_path', 'is_principale'];

public function vehicule()
{
    return $this->belongsTo(Vehicule::class, 'vehicle_id');
}
}
