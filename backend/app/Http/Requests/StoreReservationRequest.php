<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'vehicule_id' => 'required|exists:vehicules,id',
            'date_debut' => 'required|date|after_or_equal:today',
            'date_fin' => 'required|date|after:date_debut',
        ];
    }

    public function messages(): array
    {
        return [
            'vehicule_id.exists' => 'Ce véhicule n\'existe pas.',
            'date_debut.after_or_equal' => 'La date de début doit être aujourd\'hui ou après.',
            'date_fin.after' => 'La date de fin doit être après la date de début.',
        ];
    }
}