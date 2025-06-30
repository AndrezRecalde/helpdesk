<?php

namespace App\Http\Controllers\General\Ruta;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Despacho;
use App\Models\Ingreso;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class RutaController extends Controller
{
    function getConsultaTramite(Request $request): JsonResponse
    {
        try {

            // ✅ Validar reCAPTCHA
            $captchaToken = $request->captcha;
            if (!$captchaToken) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Captcha requerido.',
                ], 422);
            }

            $captchaResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => config('services.recaptcha.secret'),
                'response' => $captchaToken,
                //'remoteip' => $request->ip(), // opcional
            ]);

            $captchaData = $captchaResponse->json();

            if (!($captchaData['success'] ?? false)) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'Validación del captcha fallida.',
                    'errors' => $captchaData['error-codes'] ?? [],
                ], 422);
            }

            // Validación básica
            $request->validate([
                'numero_ruta' => 'required|numeric',
                'anio' => 'required|digits:4|integer|min:2000|max:' . date('Y'),
            ]);

            $numero_ruta = (int) $request->numero_ruta;
            $numero_cifras = strlen((string) $numero_ruta);

            $anio_ingresado = (int) $request->anio;
            $anio_actual = now()->year;

            $anio_ruta = $anio_ingresado !== $anio_actual ? $anio_ingresado : null;

            // Determinar ceros a la izquierda
            if ($numero_cifras == 4) {
                $index = '00';
            } else if ($numero_cifras == 3) {
                $index = '000';
            } elseif ($numero_cifras == 2) {
                $index = '0000';
            } elseif ($numero_cifras == 1) {
                $index = '00000';
            } else {
                $index = ''; // o algún valor por defecto si es necesario
            }

            // Construir número completo
            $numero_ruta_completo = ($anio_ruta ? $anio_ruta : '') . $index . $numero_ruta;

            // Consultas (aunque no se usan en la respuesta aún)
            $ingreso = Ingreso::from('ingreso as ing')
                ->select(
                    'ing.cnsctvo_rta',
                    'ing.nmro_ofcio',
                    'ing.fcha_elbrcion',
                    'ing.fcha_rcpcion',
                    'ing.rmtnte',
                    'cl.nmbre_clnte as remitente',
                    'ing.dstntrio',
                    'd.nmbre_dprtmnto as destinatario',
                    'ing.asnto',
                    'ing.indctvo_estdo as var_estado',
                    'ie.detalle as detalle_estado',
                    'ie.detalle_largo',
                    'ie.color',
                    'ing.tipo_doc_id',
                    'rtd.ruta_tipo_documento'
                )
                ->join('clntes as cl', 'cl.cdgo_clnte', 'ing.rmtnte')
                ->join('dprtmntos as d', 'd.cdgo_dprtmnto', 'ing.dstntrio')
                ->join('ingreso_estado as ie', 'ie.indicativo', 'ing.indctvo_estdo')
                ->join('ruta_tipo_documento as rtd', 'rtd.idruta_tipo_documento', 'ing.tipo_doc_id')
                ->where('ing.cnsctvo_rta', $numero_ruta_completo)->first();


            $despachos = Despacho::from('despacho as d')
                ->select(
                    'd.cnsctvo_dspcho',
                    'd.envdo_a',
                    'cl.nmbre_clnte as remitente',
                    'd.cnsctvo_rta',
                    'd.nmro_item',
                    'd.fcha_dspcho',
                    'd.cdgo_accion',
                    'acc.nmbre_accion as accion',
                    'd.dscrpcion_accion as descripcion_accion',
                    'd.fcha_rspsta',
                    'd.ofcio_rspsta',
                    'd.dscrpcion_rspsta as descripcion_respuesta',
                    'd.nmro_ofcio as oficio_respuesta'
                )
                ->join('acciones as acc', 'acc.cdgo_accion', 'd.cdgo_accion')
                ->join('clntes as cl', 'cl.cdgo_clnte', 'd.envdo_a')
                ->where('d.cnsctvo_rta', $numero_ruta_completo)
                ->orderBy('d.nmro_item', 'ASC')
                ->get();

            if ($ingreso) {
                return response()->json([
                    'status' => MsgStatus::Success,
                    'numero_ruta' => $numero_ruta_completo,
                    'ingreso' => $ingreso, // Descomentar si deseas devolver resultados
                    'despachos' => $despachos,
                ], 200);
            } else {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'No se encontró el trámite para el número de ruta proporcionado.',
                ], 404);
            }
        } catch (\Throwable $e) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
