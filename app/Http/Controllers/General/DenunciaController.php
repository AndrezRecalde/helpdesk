<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDenunciaRequest;
use App\Mail\DenunciaMail;
use App\Models\NomDenuncia;
use App\Models\NomDenunciaArchivo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class DenunciaController extends Controller
{
    /**
     * Verificar que la cédula ingresada coincide con la del usuario autenticado
     */
    public function verificarCedula(Request $request)
    {
        $request->validate([
            'cedula' => 'required|string|size:10|regex:/^[0-9]+$/',
        ], [
            'cedula.required' => 'La cédula es obligatoria',
            'cedula.size' => 'La cédula debe tener 10 dígitos',
            'cedula.regex' => 'La cédula solo debe contener números',
        ]);

        $user = Auth::user();

        if ($user->usu_ci !== $request->cedula) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => 'La cédula ingresada no coincide con la del usuario autenticado',
            ], 403);
        }

        return response()->json([
            'status' => MsgStatus::Success,
            'msg' => 'Cédula verificada correctamente',
        ]);
    }

    /**
     * Crear una nueva denuncia
     */
    public function store(StoreDenunciaRequest $request)
    {
        try {
            // Verificar nuevamente la cédula
            $user = Auth::user();
            if ($user->usu_ci !== $request->cedula) {
                return response()->json([
                    'status' => MsgStatus::Error,
                    'msg' => 'La cédula no coincide con el usuario autenticado',
                ], 403);
            }

            DB::beginTransaction();

            // Generar número de denuncia único
            $numeroDenuncia = $this->generarNumeroDenuncia();

            // Crear la denuncia
            $denuncia = new NomDenuncia();
            $denuncia->numero_denuncia = $numeroDenuncia;
            $denuncia->usuario_id = $user->cdgo_usrio; // Se encripta automáticamente por el mutator
            $denuncia->mostrar_informacion = $request->mostrar_informacion;
            $denuncia->tipo_denuncia = $request->tipo_denuncia;
            $denuncia->descripcion = $request->descripcion;
            $denuncia->estado = 'PENDIENTE';
            $denuncia->save();

            // Procesar archivos adjuntos si existen
            if ($request->hasFile('archivos')) {
                $this->procesarArchivos($request->file('archivos'), $denuncia);
            }

            // Enviar notificaciones por correo
            $this->enviarNotificaciones($denuncia);

            DB::commit();

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Denuncia creada exitosamente',
                'data' => [
                    'numero_denuncia' => $numeroDenuncia,
                    'estado' => 'PENDIENTE',
                    'fecha_creacion' => $denuncia->created_at->format('Y-m-d H:i:s'),
                ],
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => 'Error al crear la denuncia: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Obtener las denuncias del usuario autenticado
     */
    public function getMisDenuncias(Request $request)
    {
        $user = Auth::user();

        // Obtener todas las denuncias y filtrar por usuario_id desencriptado
        $query = NomDenuncia::with('archivos')
            ->orderBy('created_at', 'desc');

        // Filtrar por año si existe
        if ($request->has('anio') && $request->anio) {
            $query->whereYear('created_at', $request->anio);
        }

        $denuncias = $query->get()
            ->filter(function ($denuncia) use ($user) {
                return $denuncia->usuario_id == $user->cdgo_usrio;
            })
            ->map(function ($denuncia) {
                return [
                    'id' => $denuncia->id,
                    'numero_denuncia' => $denuncia->numero_denuncia,
                    'tipo_denuncia' => $denuncia->tipo_denuncia,
                    'descripcion' => $denuncia->descripcion,
                    'estado' => $denuncia->estado,
                    'respuesta' => $denuncia->respuesta,
                    'fecha_respuesta' => $denuncia->fecha_respuesta?->format('Y-m-d H:i:s'),
                    'fecha_creacion' => $denuncia->created_at->format('Y-m-d H:i:s'),
                    'archivos_count' => $denuncia->archivos->count(),
                    'mostrar_informacion' => $denuncia->mostrar_informacion,
                ];
            })
            ->values(); // Re-index the collection

        return response()->json([
            'status' => MsgStatus::Success,
            'data' => $denuncias,
        ]);
    }

    /**
     * Obtener una denuncia específica del usuario
     */
    public function show(Request $request, $numero_denuncia)
    {
        $user = Auth::user();

        $denuncia = NomDenuncia::where('numero_denuncia', $numero_denuncia)
            ->with('archivos')
            ->first();

        if (!$denuncia) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => 'Denuncia no encontrada',
            ], 404);
        }

        // Verificar que la denuncia pertenece al usuario
        if ($denuncia->usuario_id != $user->cdgo_usrio) {
            return response()->json([
                'status' => MsgStatus::Error,
                'msg' => 'No tiene permisos para ver esta denuncia',
            ], 403);
        }

        return response()->json([
            'status' => MsgStatus::Success,
            'data' => [
                'id' => $denuncia->id,
                'numero_denuncia' => $denuncia->numero_denuncia,
                'tipo_denuncia' => $denuncia->tipo_denuncia,
                'descripcion' => $denuncia->descripcion,
                'estado' => $denuncia->estado,
                'respuesta' => $denuncia->respuesta,
                'fecha_respuesta' => $denuncia->fecha_respuesta?->format('Y-m-d H:i:s'),
                'fecha_creacion' => $denuncia->created_at->format('Y-m-d H:i:s'),
                'mostrar_informacion' => $denuncia->mostrar_informacion,
                'archivos' => $denuncia->archivos->map(function ($archivo) {
                    return [
                        'id' => $archivo->id,
                        'nombre_original' => $archivo->nombre_original,
                        'tamano' => $archivo->tamano_formateado,
                        'tipo_mime' => $archivo->tipo_mime,
                        'extension' => $archivo->extension,
                    ];
                }),
            ],
        ]);
    }

    /**
     * Generar número de denuncia único
     */
    private function generarNumeroDenuncia(): string
    {
        $year = date('Y');
        $lastDenuncia = NomDenuncia::where('numero_denuncia', 'like', "DEN-{$year}-%")
            ->orderBy('numero_denuncia', 'desc')
            ->first();

        if ($lastDenuncia) {
            $lastNumber = (int) substr($lastDenuncia->numero_denuncia, -5);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return sprintf('DEN-%s-%05d', $year, $newNumber);
    }

    /**
     * Procesar archivos adjuntos
     */
    private function procesarArchivos(array $archivos, NomDenuncia $denuncia): void
    {
        $directorio = "denuncias/{$denuncia->numero_denuncia}";

        foreach ($archivos as $archivo) {
            // Generar nombre único para el archivo
            $extension = $archivo->getClientOriginalExtension();
            $nombreAlmacenado = hash('sha256', $archivo->getClientOriginalName() . time() . rand()) . '.' . $extension;

            // Guardar el archivo
            $ruta = $archivo->storeAs($directorio, $nombreAlmacenado);

            // Crear registro en la base de datos
            NomDenunciaArchivo::create([
                'denuncia_id' => $denuncia->id,
                'nombre_original' => $archivo->getClientOriginalName(),
                'nombre_almacenado' => $nombreAlmacenado,
                'ruta_archivo' => $ruta,
                'tipo_mime' => $archivo->getMimeType(),
                'tamano' => $archivo->getSize(),
            ]);
        }
    }

    /**
     * Enviar notificaciones por correo a los responsables
     */
    private function enviarNotificaciones(NomDenuncia $denuncia): void
    {
        $emails = [
            env('DENUNCIA_EMAIL_1'),
            env('DENUNCIA_EMAIL_2'),
            env('DENUNCIA_EMAIL_3'),
        ];

        // Filtrar emails vacíos
        $emails = array_filter($emails);

        foreach ($emails as $email) {
            try {
                Mail::to($email)->send(new DenunciaMail($denuncia, 'nueva'));
            } catch (\Exception $e) {
                // Log error but don't fail the request
                \Log::error("Error enviando email de denuncia a {$email}: " . $e->getMessage());
            }
        }
    }
}
