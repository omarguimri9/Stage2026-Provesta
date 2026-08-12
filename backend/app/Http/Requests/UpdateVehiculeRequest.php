<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehiculeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'marque' => 'sometimes|required|string|max:100',
            'modele' => 'sometimes|required|string|max:100',
            'annee' => 'sometimes|required|integer|min:1990|max:' . (date('Y') + 1),
            'categorie' => 'sometimes|required|string|max:100',
            'prix_jour' => 'sometimes|required|numeric|min:0',
            'disponibilite' => 'boolean',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
        ];
    }
}