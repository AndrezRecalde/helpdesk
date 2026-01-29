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
        $cdgo_usrio = $this->request->get('cdgo_usrio');

        return [
            'usu_ci'                => 'required',
            'titulo'                => 'required',
            //'nmbre_usrio'           => 'required',
            'usu_ape_pat'           => 'required',
            'usu_ape_mat'           => 'required',
            'usu_nombres'           => 'required',
            //'nombre_formateado'     => 'required',
            'usu_id_empresa'        => 'required',
            //'usu_id_sub_empresa'    => 'required',
            'crgo_id'               => 'required',
            'actvo'                 => 'required',
            'lgin'                  => ['nullable', Rule::unique('usrios_sstma')->ignore($cdgo_usrio, 'cdgo_usrio')->whereNotNull('lgin')],
            'email'                 => ['nullable', Rule::unique('usrios_sstma')->ignore($cdgo_usrio, 'cdgo_usrio')->whereNotNull('email')],
            'cdgo_direccion'        => 'required',
            'cdgo_dprtmnto'         => 'nullable',
            'sexo'                  => 'required',
            'tecnico'               => 'required',
            'secretaria_tic'        => 'required',
            'super_user'            => 'required',
            'interno'               => 'required',
            'finaliza_contrato'     => 'required',
            'usu_f_f_contrato'      => 'nullable',
            'usu_estado'            => 'required',
            'id_tipo_usuario'       => 'required',
            'usu_ult_tipo_contrato' => 'required',
            //'usu_alias'             => 'required',
            'usu_ing'               => 'required',
            'cdgo_lrgo'             => 'required'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
