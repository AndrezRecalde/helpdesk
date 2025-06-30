<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NomVacacionesRequest extends FormRequest
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
            'cdgo_usrio'       => 'required',
            'fecha_solicitud'  => '',
            'fecha_inicio'     => 'required',
            'fecha_fin'        => 'required',
            'fecha_retorno'    => 'required',
            'dias_solicitados' => 'required',
            'jefe_id'          => 'nullable',
            'director_id'      => 'nullable',
            'motivo_id'        => 'required',
        ];
    }

    function message() : array
    {
        return [
            'cdgo_usrio.required'       => 'El usuario es requerido',
            'fecha_inicio.required'     => 'La fecha de inicio es requerida',
            'fecha_fin.required'        => 'La fecha de final es requerida',
            'fecha_retorno.required'    => 'La fecha de retorno es requerida',
            'dias_solicitados.required' => 'Los dias solicitados es requerido',

        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
