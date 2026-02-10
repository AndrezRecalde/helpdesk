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
            'numero_escrito'    => 'nullable',
            'id_usu_tecnico_asig' => 'required',
            'id_direccion'      =>  'required',
            'id_usu_recibe'     =>  'required',
            'id_tipo_soporte'   =>  'required',
            'id_area_tic'       =>  'required',
            'incidente'         =>  'required',
            'solucion'          =>  'nullable',
            'id_equipo'         =>  'nullable',
            'fecha_fin'         =>  'nullable',

        ];
    }

    public function messages(): array
    {
        return [
            'id_estado.required'         => 'El campo estado es obligatorio.',
            'fecha_ini.required'         => 'El campo fecha de inicio es obligatorio.',
            'id_tipo_solicitud.required' => 'El campo tipo de solicitud es obligatorio.',
            'id_usu_tecnico_asig.required' => 'El campo técnico asignado es obligatorio.',
            'id_direccion.required'      =>  'El campo dirección es obligatorio.',
            'id_usu_recibe.required'     =>  'El campo usuario que recibe es obligatorio.',
            'id_tipo_soporte.required'   =>  'El campo tipo de soporte es obligatorio.',
            'id_area_tic.required'       =>  'El campo área TIC es obligatorio.',
            'incidente.required'         =>  'El campo incidente es obligatorio.',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
