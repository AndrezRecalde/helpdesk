<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TecnicoAreaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tecnico_id' => 'required|integer|exists:usrios_sstma,cdgo_usrio',
            'area_tic_id' => 'required|integer|exists:sop_areas_tic,id_areas_tic',
            'principal' => 'boolean',
            'activo' => 'boolean'
        ];
    }

    /**
     * Mensajes personalizados de validación
     */
    public function messages(): array
    {
        return [
            'tecnico_id.required' => 'El técnico es requerido',
            'tecnico_id.integer' => 'El ID del técnico debe ser un número entero',
            'tecnico_id.exists' => 'El técnico seleccionado no existe',
            'area_tic_id.required' => 'El área TIC es requerida',
            'area_tic_id.integer' => 'El ID del área debe ser un número entero',
            'area_tic_id.exists' => 'El área TIC seleccionada no existe',
            'principal.boolean' => 'El campo principal debe ser verdadero o falso',
            'activo.boolean' => 'El campo activo debe ser verdadero o falso'
        ];
    }

    /**
     * Manejo de errores de validación
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new \Illuminate\Http\Exceptions\HttpResponseException(
            response()->json(['errores' => $validator->errors()], 422)
        );
    }
}
