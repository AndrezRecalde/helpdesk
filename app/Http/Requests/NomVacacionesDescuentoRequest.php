<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NomVacacionesDescuentoRequest extends FormRequest
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
            'usuario_id'                => 'required|exists:usrios_sstma,cdgo_usrio',
            'nom_periodo_vacacional_id' => 'required|exists:nom_periodo_vacacionales,id',
            'dias_descuento'            => 'required',
            'motivo'                    => 'required|string|max:255',
        ];
    }

    function message() : array
    {
        return [
            'usuario_id.required'                => 'El usuario es requerido',
            'usuario_id.exists'                  => 'El usuario no existe',
            'nom_periodo_vacacional_id.required' => 'El periodo vacacional es requerido',
            'nom_periodo_vacacional_id.exists'   => 'El periodo vacacional no existe',
            'dias_descuento.required'            => 'Los días de descuento son requeridos',
            'motivo.required'                    => 'El motivo es requerido',
            'motivo.string'                      => 'El motivo debe ser una cadena de texto',
            'motivo.max'                         => 'El motivo no puede exceder los 255 caracteres',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
