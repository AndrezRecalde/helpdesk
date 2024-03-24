<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SolicitudAdminRequest extends FormRequest
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
            'numero_escrito'      =>  '',
            'id_area_tic'         =>  'required',
            'id_direccion'        =>  'required',
            'id_usu_recibe'       =>  'required',
            'id_tipo_soporte'     =>  'required',
            'id_usu_tecnico_asig' => '',
            'incidente'           =>  'required',
        ];
    }
}
