<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'usu_ci'                => 'required',
            'titulo'                => 'required',
            'nmbre_usrio'           => 'required',
            'nombre_formateado'     => 'required',
            'usu_id_empresa'        => 'required',
            'usu_id_sub_empresa'    => 'required',
            'crgo_id'               => 'required',
            'actvo'                 => 'required',
            'lgin'                  => ['required', Rule::unique('usrios_sstma')->ignore($this->request->get('cdgo_usrio'))],
            'email'                 => ['required', Rule::unique('usrios_sstma')->ignore($this->request->get('cdgo_usrio'))],
            'cdgo_direccion'        => 'required',
            'cdgo_dprtmnto'         => 'required',
            'sexo'                  => 'required',
            'tecnico'               => 'required',
            'secretaria_tic'        => 'required',
            'super_user'            => 'required',
            'interno'               => 'required',
            'finaliza_contrato'     => 'required',
            'usu_f_f_contrato'      => 'required',
            'usu_estado'            => 'required',
            'id_tipo_usuario'       => 'required',
            'usu_ult_tipo_contrato' => 'required',
            'usu_alias'             => 'required',
            'usu_ing'               => 'required',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
