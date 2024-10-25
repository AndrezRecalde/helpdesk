<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AssignComponenteRequest extends FormRequest
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
            'perifericos'               => 'required|array',
            'perifericos.*.modelo'      => 'required',
            'perifericos.*.marca_id'    => 'required',
            'perifericos.*.categoria_id'    => 'required',
            'perifericos.*.numero_serie' => 'required|unique:inv_perifericos,numero_serie',
            'perifericos.*.es_adquirido'    => 'required',
            'perifericos.*.es_donado'    => 'required',
            'perifericos.*.es_usado'    => 'required',
            'perifericos.*.estado_id'    => 'required',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
