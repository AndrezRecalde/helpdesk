<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ConceptoInvRequest extends FormRequest
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
            //'nombre_concepto' => 'required',
            'nombre_concepto'      =>  ['required', Rule::unique('inv_conceptos')->ignore($this->request->get('id'))],
        ];
    }

    function messages(): array
    {
        return [
            'nombre_concepto.required' => 'El nombre del concepto es obligatorio',
            'nombre_concepto.unique'   => 'El nombre del concepto ya existe'

        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
