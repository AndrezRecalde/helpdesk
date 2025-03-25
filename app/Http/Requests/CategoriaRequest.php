<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CategoriaRequest extends FormRequest
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
            //'nombre_categoria' => 'required',
            'nombre_categoria'      =>  ['required', Rule::unique('inv_categorias')->ignore($this->request->get('id'))],
            'tipocategoria_id' => 'required',
            //'stock'            =>  'required'
        ];
    }

    function message() : array
    {
        return [
            'nombre_categoria.required'    => 'El nombre de la categoria es requerido',
            'nombre_categoria.unique'      => 'El nombre de la categoria ya existe',
            'tipocategoria_id.required'    => 'Seleccione un tipo de categoria',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
