<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;


class InvPerifericoRequest extends FormRequest
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
        $perifericoId = $this->route('id');
        return [
            'modelo'        =>      'required',
            'marca_id'      =>      'required',
            'categoria_id'  =>      'required',
            'numero_serie'  =>      ['', Rule::unique('inv_equipos')->ignore($perifericoId)],
            'fecha_adquisicion' =>    '',
            'es_adquirido'    =>    'required',
            'es_donado'       =>    'required',
            'es_usado'        =>    'required',
            'estado_id'       =>    'required',
        ];
    }

    function messages() : array
    {
        return [
            'modelo.required'   =>  'Es necesario registrar el modelo del periferico',
            'marca_id.required' =>  'Debe seleccionar la marca',
            'categoria_id.required' => 'Debe seleccionar la categoria',
            'numero_serie.required' =>  'Debe digitar un número de serie',
            'es_adquirido.required' =>  'Seleccione si es adquirido',
            'es_donado.required'    =>  'Seleccione si es donado',
            'es_usado.required'     =>  'Seleccione si es usado',
            'estado_id.required'    =>  'Seleccione un estado'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
