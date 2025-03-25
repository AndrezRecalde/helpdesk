<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class EstadoInvRequest extends FormRequest
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
            //'nombre_estado' =>  'required',
            'nombre_estado'      =>  ['required', Rule::unique('inv_estados')->ignore($this->request->get('id'))],
            'color'              =>  'required'
        ];
    }

    function message() : array
    {
        return [
            'nombre_estado.required'    => 'El nombre del estado es requerido',
            'nombre_estado.unique'      => 'El nombre del estado ya existe',
            'color.required'            => 'El color del estado es requerido',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
