<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResponderDenunciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization is handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'respuesta' => 'required|string|min:10|max:5000',
            'estado' => 'required|in:PENDIENTE,EN_PROCESO,RESUELTO,RECHAZADO',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'respuesta.required' => 'La respuesta es obligatoria',
            'respuesta.min' => 'La respuesta debe tener al menos 10 caracteres',
            'respuesta.max' => 'La respuesta no puede exceder 5000 caracteres',
            'estado.required' => 'El estado es obligatorio',
            'estado.in' => 'El estado no es válido',
        ];
    }
}
