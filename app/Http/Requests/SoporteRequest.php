<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SoporteRequest extends FormRequest
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
            'id_estado'         => 'required',
            'fecha_ini'         => 'required',
            'id_tipo_solicitud' => 'required',
            'numero_escrito'    => '',
            'id_usu_tecnico_asig' => 'required',
            'id_direccion'      =>  'required',
            'id_usu_recibe'     =>  'required',
            'id_tipo_soporte'   =>  'required',
            'id_area_tic'       =>  'required',
            'incidente'         =>  'required',
            'solucion'          =>  '',
            'id_equipo'         =>  '',
            'fecha_fi'          =>  '',

        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
