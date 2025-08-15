<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApplicationRequest extends FormRequest
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
            'imagen_login' => 'required|string|max:255',
            'imagen_fondo' => 'required|string|max:255',
            'imagen_logo' => 'required|string|max:255',
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'imagen_login.required'     => 'La imagen de inicio de sesión es obligatoria.',
            'imagen_fondo.required'     => 'La imagen de fondo es obligatoria.',
            'imagen_logo.required'      => 'La imagen de logo es obligatoria.',
            'imagen_login.string'       => 'La imagen de inicio de sesión debe ser una cadena de texto.',
            'imagen_fondo.string'       => 'La imagen de fondo debe ser una cadena de texto.',
            'imagen_logo.string'        => 'La imagen de logo debe ser una cadena de texto.',
            'imagen_login.max'          => 'La imagen de inicio de sesión no puede exceder los 255 caracteres.',
            'imagen_fondo.max'          => 'La imagen de fondo no puede exceder los 255 caracteres.',
            'imagen_logo.max'           => 'La imagen de logo no puede exceder los 255 caracteres.'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
