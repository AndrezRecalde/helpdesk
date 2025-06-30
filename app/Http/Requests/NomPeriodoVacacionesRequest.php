<?php

namespace App\Http\Requests;

use App\Models\NomPeriodoVacacional;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class NomPeriodoVacacionesRequest extends FormRequest
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
            'cdgo_usrio' => [
                'required',
                'exists:usrios_sstma,cdgo_usrio',
            ],

            'anios' => [
                'required',
                'array',
                'min:1',
            ],

            'anios.*' => [
                'required',
                'integer',
                'digits:4',
                function ($attribute, $value, $fail) {
                    $usuario = $this->cdgo_usrio;
                    if (NomPeriodoVacacional::where('cdgo_usrio', $usuario)->where('anio', $value)->exists()) {
                        $fail("El usuario ya tiene registrado el periodo vacacional del año {$value}.");
                    }
                }
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'cdgo_usrio.required' => 'El usuario es requerido.',
            'cdgo_usrio.exists'   => 'El usuario seleccionado no existe.',
            'anio.required'       => 'El año es requerido.',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
