<?php

namespace App\Http\Controllers\General\Ruta;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Models\Despacho;
use App\Models\Ingreso;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
                    'd.ofcio_rspsta as oficio_respuesta',
                    'd.dscrpcion_rspsta as descripcion_respuesta',
                    'd.nmro_ofcio as numero_oficio'
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

    function buscarFichasIngresos(Request $request): JsonResponse
    {
        try {
            // Validación de entrada
            $validated = $request->validate([
                'anio' => 'nullable|integer|digits:4|min:2000|max:' . now()->year,
                'numero_ruta' => 'nullable|integer|min:1',
                'numero_oficio' => 'nullable|string',
                'fechaElabInicio' => 'nullable|date',
                'fechaElabFin' => 'nullable|date|after_or_equal:fechaElabInicio',
                'fechaRecInicio' => 'nullable|date',
                'fechaRecFin' => 'nullable|date|after_or_equal:fechaRecInicio',
                'remitente' => 'nullable|string',
                'asunto' => 'nullable|string',
            ]);

            // Validar que si viene numero_ruta, también venga anio
            if ($request->filled('numero_ruta') && ! $request->filled('anio')) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'message' => 'El año es requerido cuando se proporciona el número de ruta.',
                ], 422);
            }

            $query = Ingreso::from('ingreso as ing')
                ->select(
                    'ing.cnsctvo_rta',
                    'ing.nmro_ofcio as numero_oficio',
                    'ing.fcha_rcpcion as fecha_recepcion',
                    'ing.rmtnte as remitente',
                    'ing.asnto',
                    'ie.detalle_largo',
                    DB::raw('COUNT(dsp.cnsctvo_dspcho) as total_despachos')
                )
                ->join('clntes as clr', 'clr.cdgo_clnte', 'ing.rmtnte')
                ->join('clntes as cld', 'cld.cdgo_clnte', 'ing.dstntrio')
                ->join('ingreso_estado as ie', 'ie.indicativo', 'ing.indctvo_estdo')
                ->join('ruta_tipo_documento as rtd', 'rtd.idruta_tipo_documento', 'ing.tipo_doc_id')
                ->leftJoin('despacho as dsp', 'dsp.cnsctvo_rta', '=', 'ing.cnsctvo_rta')
                ->groupBy(
                    'ing.cnsctvo_rta',
                    'ing.nmro_ofcio',
                    'ing.fcha_rcpcion',
                    'ing.rmtnte',
                    'ing.asnto',
                    'ie.detalle_largo'
                );

            // Búsqueda por número de ruta (requiere año y número)
            if ($request->filled(['anio', 'numero_ruta'])) {
                $numero_ruta_completo = $this->construirNumeroRutaCompleto(
                    $validated['anio'],
                    $validated['numero_ruta']
                );
                $query->byNumeroRuta($numero_ruta_completo);
            } else {
                // Búsqueda alternativa por otros campos
                $query->byNumeroOficio($request->numero_oficio)
                    ->byFechaElaboracion($request->fechaElabInicio, $request->fechaElabFin)
                    ->byFechaRecepcion($request->fechaRecInicio, $request->fechaRecFin)
                    ->byClientes($request->remitente)
                    ->byAsunto($request->asunto);
            }

            $fichas_ingresos = $query->get();

            if ($fichas_ingresos->isEmpty()) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'No se encontró ningún trámite.',
                ], 404);
            }

            return response()->json([
                'status' => MsgStatus::Success,
                'fichas_ingresos' => $fichas_ingresos,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Datos de entrada inválidos',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $th) {
            Log::error('Error en buscarFichasIngresos: ' .  $th->getMessage(), [
                'request' => $request->all(),
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'status' => MsgStatus::Error,
                'message' => 'Error interno del servidor',
            ], 500);
        }
    }

    /**
     * Construye el número de ruta completo según las reglas de negocio:
     * - Año actual:  solo el número de ruta sin modificar
     * - Años anteriores: año + ceros según cifras + número de ruta
     *
     * Ejemplos:
     * - construirNumeroRutaCompleto(2026, 5) -> "5"
     * - construirNumeroRutaCompleto(2025, 5) -> "2025000005"
     * - construirNumeroRutaCompleto(2025, 123) -> "2025000123"
     * - construirNumeroRutaCompleto(2025, 12345) -> "20250012345"
     */
    private function construirNumeroRutaCompleto(int $anio, int $numero_ruta): string
    {
        $anio_actual = now()->year;

        // Si es el año actual, retornar solo el número sin modificar
        if ($anio === $anio_actual) {
            return (string) $numero_ruta;
        }

        // Para años anteriores, calcular ceros necesarios
        $numero_cifras = strlen((string) $numero_ruta);

        // Determinar ceros según el número de cifras
        $ceros = match (true) {
            $numero_cifras >= 4 => '00',    // 4+ cifras:  2 ceros
            $numero_cifras === 3 => '000',  // 3 cifras: 3 ceros
            $numero_cifras === 2 => '0000', // 2 cifras: 4 ceros
            $numero_cifras === 1 => '00000', // 1 cifra: 5 ceros
            default => ''
        };

        return $anio .  $ceros . $numero_ruta;
    }
}
