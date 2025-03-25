<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UbicacionInvRequest extends FormRequest
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
             'nombre_edificio'      =>  ['required', Rule::unique('inv_ubicaciones')->ignore($this->request->get('id'))],
             'nombre_ubicacion'     =>  ['required', Rule::unique('inv_ubicaciones')->ignore($this->request->get('id'))],

        ];
    }

    function messages(): array
    {
        return [
            'nombre_edificio.required'  => 'El nombre del edificio es obligatorio',
            'nombre_edificio.unique'    => 'El nombre del edificio ya existe',
            'nombre_ubicacion.required' => 'El nombre de la ubicacion es obligatorio',
            'nombre_ubicacion.unique'   => 'El nombre de la ubicacion ya existe',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
