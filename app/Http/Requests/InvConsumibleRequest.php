<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class InvConsumibleRequest extends FormRequest
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
            'nombre_consumible' => 'required',
            'codigo'            => ['required', Rule::unique('inv_consumibles')->ignore($this->request->get('id'))],
            'categoria_id'      => 'required',
            'stock'             => ''
        ];
    }

    function message() : array
    {
        return [
            'nombre_consumible.required' => 'El nombre del consumible es requerido',
            'codigo.required'            => 'El codigo del consumible es requerido',
            'codigo.unique'              => 'El codigo del consumible es requerido',
            'categoria_id.required'      => 'La categoria es requerida'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
