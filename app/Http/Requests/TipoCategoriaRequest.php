<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class TipoCategoriaRequest extends FormRequest
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
            //'nombre_tipocategoria' => 'required',
            'nombre_tipocategoria'      =>  ['required', Rule::unique('inv_tipocategorias')->ignore($this->request->get('id'))],
        ];
    }

    function message() : array
    {
        return [
            'nombre_tipocategoria.required'    => 'El nombre del tipo categoria es requerido',
            'nombre_tipocategoria.unique'      => 'El nombre del tipo categoria ya existe',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
