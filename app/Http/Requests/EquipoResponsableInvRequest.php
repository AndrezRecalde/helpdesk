<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EquipoResponsableInvRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'usuario_id'        =>  'required',
            'direccion_id'      =>  'required',
            'concepto_id'       =>  'required',
            'observacion'       =>  ''
        ];
    }


    function message(): array
    {
        return [
            'usuario_id.required'         =>   'Por favor seleccione el usuario a quien le pertenece',
            'direccion_id.required'       =>   'Por favor seleccione el departamento donde se encuentra',
            'concepto_id.required'        =>   'Por favor seleccione el departamento donde se encuentra',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
