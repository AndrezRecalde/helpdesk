<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'nombre_equipo'     =>  'required',
            'codigo_antiguo'    =>  '',
            'codigo_nuevo'      =>  '',
            'modelo'            =>  'required',
            'numero_serie'      =>  'required',
            'fecha_adquisicion' =>  'required',
            'fecha_amortizacion' => '',
            'vida_util'         =>  'required',
            'descripcion'       =>  'required',
            'bien_adquirido'    =>  'required',
            'bien_donado'       =>  'required',
            'bien_usado'        =>  'required',
            'ubicacion_id'      =>  '',
            'categoria_id'      =>  'required',
            'estado_id'         =>  'required',
            'marca_id'          =>  'required',
            'usuario_id'        =>  '',
            'direccion_id'      =>  '',
            'concepto_id'       =>  '',
            'observacion'       => ''

        ];
    }

    function message(): array
    {
        return [
            'nombre_equipo.required'    =>  'El nombre del equipo es requerido',
            'modelo.required'           =>   'El modelo es requerido',
            'numero_serie.required'     =>   'El número de serie es requerido',
            'fecha_adquisicion.required' =>   'La fecha de adquisición es requerida',
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
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
