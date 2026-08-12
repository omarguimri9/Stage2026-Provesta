<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehiculeRequest extends FormRequest
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
            'annee' => 'required|integer|min:1990|max:2030',
            'immatriculation' => 'required|string|unique:vehicles,immatriculation,' . $this->vehicule?->id,
            'prix_par_jour' => 'required|numeric|min:0',
            'carburant' => 'required|string',
            'transmission' => 'required|string',
            'categorie_id' => 'nullable|exists:categories,id',
            'agency_id' => 'nullable|exists:agencies,id',
        ];
    }

    public function messages(): array
    {
        return [
            'marque.required' => 'La marque est obligatoire.',
            'immatriculation.unique' => 'Cette immatriculation existe déjà.',
            'prix_par_jour.min' => 'Le prix doit être positif.',
        ];
    }
}