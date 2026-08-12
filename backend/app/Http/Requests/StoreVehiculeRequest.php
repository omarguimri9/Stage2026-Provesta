<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehiculeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'marque' => 'required|string|max:100',
            'modele' => 'required|string|max:100',
            'annee' => 'required|integer|min:1990|max:' . (date('Y') + 1),
            'categorie' => 'required|string|max:100',
            'prix_jour' => 'required|numeric|min:0',
            'disponibilite' => 'boolean',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
        ];
    }
}