<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDenunciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization is handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'cedula' => 'required|string|size:10|regex:/^[0-9]+$/',
            'tipo_denuncia' => 'required|in:ACOSO,ABUSO,CORRUPCION,OTRO',
            'descripcion' => 'required|string|min:20|max:5000',
            'mostrar_informacion' => 'required|boolean',
            'archivos' => 'nullable|array|max:3',
            'archivos.*' => 'file|mimes:jpg,jpeg,png,pdf,docx|max:10240', // 10MB max
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'cedula.required' => 'La cédula es obligatoria',
            'cedula.size' => 'La cédula debe tener 10 dígitos',
            'cedula.regex' => 'La cédula solo debe contener números',
            'tipo_denuncia.required' => 'El tipo de denuncia es obligatorio',
            'tipo_denuncia.in' => 'El tipo de denuncia no es válido',
            'descripcion.required' => 'La descripción es obligatoria',
            'descripcion.min' => 'La descripción debe tener al menos 20 caracteres',
            'descripcion.max' => 'La descripción no puede exceder 5000 caracteres',
            'mostrar_informacion.required' => 'Debe indicar si desea mostrar su información',
            'mostrar_informacion.boolean' => 'El campo mostrar información debe ser verdadero o falso',
            'archivos.max' => 'No puede adjuntar más de 3 archivos',
            'archivos.*.file' => 'Cada adjunto debe ser un archivo válido',
            'archivos.*.mimes' => 'Los archivos deben ser de tipo: jpg, jpeg, png, pdf, docx',
            'archivos.*.max' => 'Cada archivo no puede exceder 10MB',
        ];
    }
}
