<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NomGestionVacacionRequest extends FormRequest
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
            'estado_id' => 'required|in:2,6', // 2 = APROBADO, 6 = ANULADO
            //'periodo_vacacional_id' => 'required_if:estado,2|exists:nom_periodo_vacacionales,id',
        ];
    }

    public function messages()
    {
        return [
            'estado_id.required' => 'El estado es obligatorio.',
            'estado_id.in'       => 'El estado seleccionado no es válido.',
            //'periodo_vacacional_id.required_if' => 'Debe seleccionar un periodo vacacional si la solicitud es aprobada.',
            //'periodo_vacacional_id.exists'      => 'El periodo vacacional seleccionado no existe.',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
