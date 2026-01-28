<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class EquipoInvRequest extends FormRequest
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
            'codigo_antiguo'    =>  'nullable',
            'codigo_nuevo'      =>  ['required', Rule::unique('inv_equipos')->ignore($this->request->get('id'))],
            'modelo'            =>  'required',
            'numero_serie' => [
                'nullable',
                Rule::unique('inv_equipos')->ignore($this->request->get('id'))->whereNotNull('numero_serie')
            ],
            'fecha_adquisicion' =>  'required',
            //'fecha_amortizacion' => '',
            'vida_util'         =>  'required',
            'descripcion'       =>  '',
            'bien_adquirido'    =>  'required',
            'bien_donado'       =>  'required',
            'bien_usado'        =>  'required',
            'ubicacion_id'      =>  'nullable',
            'categoria_id'      =>  'required',
            'estado_id'         =>  'required',
            'marca_id'          =>  'required',
            'user_id'           =>  'nullable',
            'direccion_id'      =>  'nullable'

            /* 'usuario_id'        =>  '',
            'direccion_id'      =>  '',
            'concepto_id'       =>  '',
            'observacion'       =>  '', */

            // Validación de periféricos si están presentes
            /* 'perifericos'       =>  'array|nullable',  // Aceptar un array o nulo si no hay periféricos

            // Validación de cada periférico en el array
            'perifericos.*.numero_serie' => [
                'required',
                Rule::unique('inv_perifericos', 'numero_serie')
                    ->ignore($equipoId, 'equipo_id')  // Ignorar si el número de serie ya pertenece al equipo actual
            ], */
        ];
    }

    function message(): array
    {
        return [
            'modelo.required'           =>   'El modelo es requerido',
            //'numero_serie.required'     =>   'El número de serie es requerido',
            'numero_serie.unique'       =>   'El número de serie ya está registrado en otro equipo o periférico',
            'fecha_adquisicion.required' =>  'La fecha de adquisición es requerida',
            'vida_util.required'        =>   'Coloque la vida útil en años',
            'descripcion.required'      =>   'Por favor coloqué una descripción al equipo',
            'bien_adquirido.required'   =>   'Por favor seleccione una opción',
            'bien_donado.required'      =>   'Por favor seleccione una opción',
            'bien_usado.required'       =>   'Por favor seleccione una opción',
            //'ubicacion_id.required'     =>   'Por favor seleccione la ubicación fisica del equipo',
            'categoria_id.required'     =>   'Por favor seleccione una categoria',
            'estado_id.required'        =>   'Por favor seleccione el estado del equipo',
            'marca_id.required'         =>   'Por favor seleccione la marca del equipo',
            //'usuario.required'         =>   'Por favor seleccione el usuario a quien le pertenece',
            //'departamento.required'    =>   'Por favor seleccione el departamento donde se encuentra',


            //'perifericos.*.numero_serie.required' => 'El número de serie del periférico es requerido',
            //'perifericos.*.numero_serie.unique'   => 'El número de serie del periférico ya está registrado',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
