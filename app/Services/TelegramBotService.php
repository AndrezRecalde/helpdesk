<?php

namespace App\Services;

use App\Models\InvEquipo;
use App\Models\Soporte;
use App\Models\TelegramBotSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * TelegramBotService — Motor FSM del Bot de Telegram para HelpDesk TIC.
 *
 * ──────────────────────────────────────────────────────────────
 * FLUJO USUARIO (creación de ticket):
 *   /start
 *     → awaiting_cedula       (cédula de identidad)
 *     → awaiting_tecnico      (selección inline del técnico)
 *     → awaiting_incidente    (descripción del incidente)
 *     → [crea sop_soporte, notifica técnico]
 *
 * FLUJO TÉCNICO (diagnóstico y cierre):
 *   [notificación automática]
 *     → tech_awaiting_confirm_diag     (botón "Diagnosticar Soporte")
 *           ↓ valida: pertenece al técnico + id_estado ≠ 4
 *     → tech_awaiting_tipo_soporte     (inline: tipos 1-6)
 *           ↓ tipo ∈ {1,4,5,6}
 *     → tech_awaiting_codigo_equipo    (texto: código equipo)
 *     → tech_awaiting_seleccion_equipo (inline: lista de equipos)
 *     → tech_awaiting_estado_equipo    (inline: estados HW)
 *           ↓ tipo ∈ {2,3} saltan directamente aquí ↑
 *     → tech_awaiting_diagnostico      (texto libre: solución/diagnóstico)
 *     → [cierra ticket: id_estado=3, fecha_fin=now, solucion=texto]
 * ──────────────────────────────────────────────────────────────
 */
class TelegramBotService
{
    // Tipos que requieren vincular un equipo
    private const TIPOS_CON_EQUIPO = [1, 4, 5, 6];

    // Lista sincronizada con tabla sop_tipo_soporte
    private const TIPOS_SOPORTE = [
        1 => '🖥️ SOPORTE HARDWARE',
        2 => '💻 SOPORTE SOFTWARE',
        3 => '👤 SOPORTE A USUARIOS',
        4 => '📦 PRESTAMO DE EQUIPO',
        5 => '🔧 MANTENIMIENTO PREVENTIVO',
        6 => '⚙️ MANTENIMIENTO CORRECTIVO',
    ];

    // Lista sincronizada con tabla inv_estados
    private const ESTADOS_EQUIPO = [
        1 => '✅ BUENO',
        2 => '⚠️ REGULAR',
        3 => '❌ MALO',
        4 => '🔧 EN MANTENIMIENTO',
        5 => '🚫 BAJA',
    ];

    public function __construct(
        private readonly TelegramService $telegram
    ) {
    }

    // ═══════════════════════════════════════════════════════════
    // PUNTO DE ENTRADA
    // ═══════════════════════════════════════════════════════════

    public function handle(array $update): void
    {
        try {
            if (isset($update['message'])) {
                $this->handleMessage($update['message']);
            } elseif (isset($update['callback_query'])) {
                $this->handleCallbackQuery($update['callback_query']);
            }
        } catch (\Throwable $th) {
            Log::error('[TelegramBot] Error en handle: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString(),
            ]);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // MENSAJES DE TEXTO
    // ═══════════════════════════════════════════════════════════

    private function handleMessage(array $message): void
    {
        $chatId = (string) $message['chat']['id'];
        $text = trim($message['text'] ?? '');

        if (empty($text)) {
            return;
        }

        $session = TelegramBotSession::obtenerOCrear($chatId);

        // Comando global /cancelar
        if (strtolower($text) === '/cancelar') {
            $session->reiniciar();
            $this->telegram->enviarMensaje($chatId, "❌ Operación cancelada. Envía /start para comenzar.");
            return;
        }

        // Comando /start — inicia flujo de usuario
        if (strtolower($text) === '/start') {
            $session->reiniciar();
            $session->cambiarEstado(TelegramBotSession::STATE_AWAITING_CEDULA);
            $this->telegram->enviarMensaje(
                $chatId,
                "👋 *Bienvenido al Sistema de Soporte TIC*\n\n" .
                "Por favor, escribe tu *número de cédula* para continuar."
            );
            return;
        }

        // Despachar según el estado actual
        match ($session->state) {
            TelegramBotSession::STATE_AWAITING_CEDULA
            => $this->procesarCedula($session, $chatId, $text),

            TelegramBotSession::STATE_AWAITING_INCIDENTE
            => $this->procesarIncidente($session, $chatId, $text),

            TelegramBotSession::STATE_TECH_AWAITING_CODIGO_EQUIPO
            => $this->procesarCodigoEquipo($session, $chatId, $text),

            TelegramBotSession::STATE_TECH_AWAITING_DIAGNOSTICO
            => $this->procesarDiagnostico($session, $chatId, $text),

            default => $this->telegram->enviarMensaje(
                $chatId,
                "ℹ️ Envía /start para iniciar una nueva solicitud de soporte o /cancelar para reiniciar."
            ),
        };
    }

    // ═══════════════════════════════════════════════════════════
    // CALLBACKS (botones inline)
    // ═══════════════════════════════════════════════════════════

    private function handleCallbackQuery(array $callbackQuery): void
    {
        $chatId = (string) $callbackQuery['message']['chat']['id'];
        $callbackId = $callbackQuery['id'];
        $data = $callbackQuery['data'] ?? '';

        $this->telegram->answerCallbackQuery($callbackId);

        $session = TelegramBotSession::obtenerOCrear($chatId);

        match (true) {
            // Técnico toca "Diagnosticar Soporte"
            $session->state === TelegramBotSession::STATE_TECH_AWAITING_CONFIRM_DIAG
            && $data === 'diag_confirmar'
            => $this->procesarConfirmDiagnostico($session, $chatId),

            // Técnico selecciona tipo de soporte
            $session->state === TelegramBotSession::STATE_TECH_AWAITING_TIPO_SOPORTE
            && str_starts_with($data, 'tipo_soporte_')
            => $this->procesarTipoSoporte($session, $chatId, $data),

            // Usuario selecciona técnico
            $session->state === TelegramBotSession::STATE_AWAITING_TECNICO
            && str_starts_with($data, 'tecnico_')
            => $this->procesarSeleccionTecnico($session, $chatId, $data),

            // Técnico selecciona equipo
            $session->state === TelegramBotSession::STATE_TECH_AWAITING_SELECCION_EQUIPO
            && (str_starts_with($data, 'equipo_') || $data === 'buscar_otro_equipo')
            => $this->procesarSeleccionEquipo($session, $chatId, $data),

            // Técnico selecciona estado del equipo
            $session->state === TelegramBotSession::STATE_TECH_AWAITING_ESTADO_EQUIPO
            && str_starts_with($data, 'estado_equipo_')
            => $this->procesarEstadoEquipo($session, $chatId, $data),

            default => $this->telegram->enviarMensaje(
                $chatId,
                "⚠️ Acción no reconocida. Envía /start para comenzar."
            ),
        };
    }

    // ═══════════════════════════════════════════════════════════
    // FLUJO DE USUARIO
    // ═══════════════════════════════════════════════════════════

    /**
     * Paso 1: Verificar cédula y mostrar lista de técnicos.
     */
    private function procesarCedula(TelegramBotSession $session, string $chatId, string $cedula): void
    {
        if (!ctype_digit($cedula)) {
            $this->telegram->enviarMensaje($chatId, "⚠️ La cédula debe contener solo números. Intenta nuevamente.");
            return;
        }

        $usuario = User::where('usu_ci', $cedula)->first();

        if (!$usuario) {
            $this->telegram->enviarMensaje(
                $chatId,
                "❌ *Usuario no encontrado.*\n\n" .
                "No existe ningún funcionario registrado con la cédula *{$cedula}*.\n\n" .
                "Verifica el número e intenta nuevamente o contacta al administrador TIC."
            );
            return;
        }

        $session->actualizarContexto([
            'usuario_id' => $usuario->cdgo_usrio,
            'usuario_nombre' => $usuario->nmbre_usrio,
            'id_direccion' => $usuario->cdgo_direccion,
        ]);

        $tecnicos = User::with('areasTicActivas')
            ->whereHas('roles', fn($q) => $q->where('name', 'TIC'))
            ->whereHas('areasTicActivas')
            ->get(['cdgo_usrio', 'nmbre_usrio']);

        if ($tecnicos->isEmpty()) {
            $this->telegram->enviarMensaje(
                $chatId,
                "⚠️ No hay técnicos disponibles en este momento. Contacta a TIC directamente."
            );
            $session->reiniciar();
            return;
        }

        $keyboard = $tecnicos->map(fn($t) => [
            [
                'text' => "👨‍💻 {$t->nmbre_usrio}",
                'callback_data' => "tecnico_{$t->cdgo_usrio}",
            ]
        ])->toArray();

        $session->cambiarEstado(TelegramBotSession::STATE_AWAITING_TECNICO);

        $this->telegram->enviarMensajeConTeclado(
            $chatId,
            "✅ Hola *{$usuario->nmbre_usrio}*\n\nSelecciona el técnico al que deseas asignar el soporte:",
            $keyboard
        );
    }

    /**
     * Paso 2 (callback): Guardar técnico y solicitar incidente.
     */
    private function procesarSeleccionTecnico(TelegramBotSession $session, string $chatId, string $data): void
    {
        $tecnicoId = str_replace('tecnico_', '', $data);
        $tecnico = User::with('areaTicPrincipal')->find($tecnicoId);

        if (!$tecnico) {
            $this->telegram->enviarMensaje($chatId, "⚠️ Técnico no encontrado. Intenta nuevamente con /start.");
            $session->reiniciar();
            return;
        }

        $areaPrincipal = $tecnico->areaTicPrincipal()->first();

        $session->actualizarContexto([
            'tecnico_id' => $tecnico->cdgo_usrio,
            'tecnico_nombre' => $tecnico->nmbre_usrio,
            'tecnico_chat_id' => $tecnico->telegram_chat_id,
            'notificar_tec' => (bool) $tecnico->notificar_telegram,
            'id_area_tic' => $areaPrincipal?->id_areas_tic,
        ]);

        $session->cambiarEstado(TelegramBotSession::STATE_AWAITING_INCIDENTE);

        $this->telegram->enviarMensaje(
            $chatId,
            "✅ Técnico seleccionado: *{$tecnico->nmbre_usrio}*\n\n" .
            "📝 Describe el incidente o problema que necesitas reportar:\n" .
            "_Escribe con el mayor detalle posible._"
        );
    }

    /**
     * Paso 3: Crear el ticket en la base de datos.
     */
    private function procesarIncidente(TelegramBotSession $session, string $chatId, string $incidente): void
    {
        if (strlen($incidente) < 10) {
            $this->telegram->enviarMensaje(
                $chatId,
                "⚠️ Por favor describe el incidente con más detalle (mínimo 10 caracteres)."
            );
            return;
        }

        $ctx = $session->context ?? [];

        foreach (['usuario_id', 'id_direccion', 'tecnico_id'] as $campo) {
            if (empty($ctx[$campo])) {
                $this->telegram->enviarMensaje($chatId, "❌ Error de sesión. Envía /start para reiniciar.");
                $session->reiniciar();
                return;
            }
        }

        try {
            DB::beginTransaction();

            $anio = Carbon::now()->year;
            $ultimoNum = Soporte::where('anio', $anio)->max('numero_sop') ?? 0;
            $numeroSop = $ultimoNum + 1;

            $soporte = Soporte::query()->create([
                'anio' => $anio,
                'numero_sop' => $numeroSop,
                'id_area_tic' => $ctx['id_area_tic'] ?? null,
                'id_direccion' => $ctx['id_direccion'],
                'id_usu_recibe' => $ctx['usuario_id'],
                'id_tipo_soporte' => 3,
                'id_usu_tecnico_asig' => $ctx['tecnico_id'],
                'id_usu_tecnico' => $ctx['tecnico_id'],
                'incidente' => $incidente,
                'id_estado' => 5,
                'fecha_ini' => Carbon::now(),
                'fecha_asig' => Carbon::now(),
                'id_usuario_crea' => $ctx['usuario_id'],
                'id_tipo_solicitud' => 1,
            ]);

            DB::commit();

            $this->telegram->enviarMensaje(
                $chatId,
                "✅ *Solicitud enviada exitosamente*\n\n" .
                "📋 *N° de Ticket:* #{$numeroSop}\n" .
                "👨‍💻 *Técnico asignado:* {$ctx['tecnico_nombre']}\n" .
                "📝 *Incidente registrado.*\n\n" .
                "_Te atenderemos a la brevedad posible._"
            );

            $session->reiniciar();

            // Notificar al técnico si tiene Telegram configurado
            if (!empty($ctx['tecnico_chat_id']) && $ctx['notificar_tec']) {
                $this->notificarTecnicoNuevoTicket(
                    tecnicoChatId: $ctx['tecnico_chat_id'],
                    tecnicoId: $ctx['tecnico_id'],
                    soporte: $soporte,
                    usuario: $ctx['usuario_nombre'],
                );
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('[TelegramBot] Error al crear soporte: ' . $th->getMessage());
            $this->telegram->enviarMensaje(
                $chatId,
                "❌ *Error al registrar tu solicitud.*\n\nPor favor intenta nuevamente o contacta al departamento TIC."
            );
        }
    }

    // ═══════════════════════════════════════════════════════════
    // FLUJO DE TÉCNICO
    // ═══════════════════════════════════════════════════════════

    /**
     * Notifica al técnico y abre la sesión FSM mostrando
     * el botón "Diagnosticar Soporte".
     */
    public function notificarTecnicoNuevoTicket(
        string $tecnicoChatId,
        string $tecnicoId,
        Soporte $soporte,
        string $usuario,
    ): void {
        $session = TelegramBotSession::obtenerOCrear($tecnicoChatId);
        $session->reiniciar();

        $session->actualizarContexto([
            'soporte_id' => $soporte->id_sop,
            'numero_sop' => $soporte->numero_sop,
            'usuario_nombre' => $usuario,
            'tecnico_id' => $tecnicoId,
        ]);
        $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_CONFIRM_DIAG);

        $keyboard = [
            [['text' => '🔍 Diagnosticar Soporte', 'callback_data' => 'diag_confirmar']],
        ];

        $this->telegram->enviarMensajeConTeclado(
            $tecnicoChatId,
            "🔔 *NUEVO SOPORTE ASIGNADO*\n\n" .
            "📋 *Ticket:* #{$soporte->numero_sop}\n" .
            "👤 *Solicitante:* {$usuario}\n" .
            "📝 *Incidente:*\n_{$soporte->incidente}_\n\n" .
            "Presiona el botón para iniciar el diagnóstico:",
            $keyboard
        );
    }

    /**
     * Técnico presionó "Diagnosticar Soporte".
     * Valida: propiedad del ticket y estado actual.
     */
    private function procesarConfirmDiagnostico(TelegramBotSession $session, string $chatId): void
    {
        $soporteId = $session->getContexto('soporte_id');
        $tecnicoId = $session->getContexto('tecnico_id');

        if (!$soporteId || !$tecnicoId) {
            $this->telegram->enviarMensaje($chatId, "❌ Error de sesión. Contacta al administrador.");
            $session->reiniciar();
            return;
        }

        $soporte = Soporte::find($soporteId);

        if (!$soporte) {
            $this->telegram->enviarMensaje($chatId, "❌ El ticket no fue encontrado en el sistema.");
            $session->reiniciar();
            return;
        }

        // ── Validar propiedad: ¿aún me pertenece este soporte? ──
        if ((string) $soporte->id_usu_tecnico_asig !== (string) $tecnicoId) {
            $this->telegram->enviarMensaje(
                $chatId,
                "⚠️ *Este soporte ha sido reasignado.*\n\n" .
                "📋 *Ticket #" . $soporte->numero_sop . "* ya no está asignado a ti.\n\n" .
                "Si crees que esto es un error, contacta al administrador TIC."
            );
            $session->reiniciar();
            return;
        }

        // ── Validar estado: ¿ya fue diagnosticado? (id_estado = 4) ──
        if ($soporte->id_estado == 4) {
            $this->telegram->enviarMensaje(
                $chatId,
                "ℹ️ *Este soporte ya ha sido diagnosticado.*\n\n" .
                "📋 *Ticket #" . $soporte->numero_sop . "* ya tiene diagnóstico registrado.\n\n" .
                "Si necesitas modificarlo, hazlo desde el sistema web."
            );
            $session->reiniciar();
            return;
        }

        // ── Validar estado: ¿ya fue cerrado? (id_estado = 3) ──
        if ($soporte->id_estado == 3) {
            $this->telegram->enviarMensaje(
                $chatId,
                "ℹ️ *Este soporte ya fue cerrado.*\n\n" .
                "📋 *Ticket #" . $soporte->numero_sop . "* se encuentra en estado ATENDIDO."
            );
            $session->reiniciar();
            return;
        }

        // ── Todo ok: mostrar tipos de soporte ──
        $keyboard = array_map(
            fn($id, $nombre) => [['text' => $nombre, 'callback_data' => "tipo_soporte_{$id}"]],
            array_keys(self::TIPOS_SOPORTE),
            array_values(self::TIPOS_SOPORTE)
        );

        $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_TIPO_SOPORTE);

        $this->telegram->enviarMensajeConTeclado(
            $chatId,
            "✅ *Ticket #" . $soporte->numero_sop . "* verificado.\n\n" .
            "Selecciona el *tipo de soporte* que aplicarás:",
            $keyboard
        );
    }

    /**
     * Técnico seleccionó el tipo de soporte.
     * Si requiere equipo → pedir código; si no → pedir diagnóstico directamente.
     */
    private function procesarTipoSoporte(TelegramBotSession $session, string $chatId, string $data): void
    {
        $tipoSoporteId = (int) str_replace('tipo_soporte_', '', $data);

        if (!array_key_exists($tipoSoporteId, self::TIPOS_SOPORTE)) {
            $this->telegram->enviarMensaje($chatId, "⚠️ Tipo de soporte no válido. Intenta nuevamente.");
            return;
        }

        $tipoNombre = self::TIPOS_SOPORTE[$tipoSoporteId];
        $session->actualizarContexto(['tipo_soporte_id' => $tipoSoporteId]);

        if (in_array($tipoSoporteId, self::TIPOS_CON_EQUIPO)) {
            // Tipos que requieren equipo: pedir código primero
            $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_CODIGO_EQUIPO);
            $this->telegram->enviarMensaje(
                $chatId,
                "✅ Tipo seleccionado: *{$tipoNombre}*\n\n" .
                "🔍 Escribe el *código o número de serie* del equipo a buscar:"
            );
        } else {
            // Tipos 2 y 3: no requieren equipo, pedir diagnóstico directamente
            $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_DIAGNOSTICO);
            $this->telegram->enviarMensaje(
                $chatId,
                "✅ Tipo seleccionado: *{$tipoNombre}*\n\n" .
                "📝 Escribe el *diagnóstico* o solución aplicada:"
            );
        }
    }

    /**
     * Técnico envió código de equipo → buscar y mostrar coincidencias.
     */
    private function procesarCodigoEquipo(TelegramBotSession $session, string $chatId, string $codigo): void
    {
        if (strlen($codigo) < 2) {
            $this->telegram->enviarMensaje($chatId, "⚠️ Ingresa al menos 2 caracteres para buscar el equipo.");
            return;
        }

        $equipos = InvEquipo::from('inv_equipos as inve')
            ->select('inve.id', 'inve.codigo_antiguo', 'inve.codigo_nuevo', 'inve.numero_serie', 'inve.modelo')
            ->where(function ($q) use ($codigo) {
                $q->where('inve.codigo_antiguo', 'LIKE', "%{$codigo}%")
                    ->orWhere('inve.codigo_nuevo', 'LIKE', "%{$codigo}%")
                    ->orWhere('inve.numero_serie', 'LIKE', "%{$codigo}%");
            })
            ->limit(10)
            ->get();

        if ($equipos->isEmpty()) {
            $this->telegram->enviarMensaje(
                $chatId,
                "❌ No se encontraron equipos con el código *{$codigo}*.\n\nIntenta con otro código o número de serie."
            );
            return;
        }

        $keyboard = $equipos->map(function ($equipo) {
            $label = trim(implode(' | ', array_filter([
                $equipo->codigo_nuevo ?? $equipo->codigo_antiguo,
                $equipo->modelo,
                $equipo->numero_serie ? "SN: {$equipo->numero_serie}" : null,
            ])));
            return [['text' => $label, 'callback_data' => "equipo_{$equipo->id}"]];
        })->toArray();

        $keyboard[] = [['text' => '🔍 Buscar otro código', 'callback_data' => 'buscar_otro_equipo']];

        $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_SELECCION_EQUIPO);

        $this->telegram->enviarMensajeConTeclado(
            $chatId,
            "🔍 *Equipos encontrados para:* `{$codigo}`\n\nSelecciona el equipo correspondiente:",
            $keyboard
        );
    }

    /**
     * Técnico seleccionó el equipo → mostrar estados del equipo.
     */
    private function procesarSeleccionEquipo(TelegramBotSession $session, string $chatId, string $data): void
    {
        if ($data === 'buscar_otro_equipo') {
            $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_CODIGO_EQUIPO);
            $this->telegram->enviarMensaje($chatId, "🔍 Escribe el nuevo código o número de serie del equipo:");
            return;
        }

        $equipoId = (int) str_replace('equipo_', '', $data);
        $equipo = InvEquipo::find($equipoId);

        if (!$equipo) {
            $this->telegram->enviarMensaje($chatId, "⚠️ Equipo no encontrado. Intenta nuevamente.");
            return;
        }

        $session->actualizarContexto([
            'equipo_id' => $equipoId,
            'equipo_label' => $equipo->codigo_nuevo ?? $equipo->codigo_antiguo ?? 'S/N',
        ]);
        $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_ESTADO_EQUIPO);

        $keyboard = array_map(
            fn($id, $nombre) => [['text' => $nombre, 'callback_data' => "estado_equipo_{$id}"]],
            array_keys(self::ESTADOS_EQUIPO),
            array_values(self::ESTADOS_EQUIPO)
        );

        $this->telegram->enviarMensajeConTeclado(
            $chatId,
            "✅ Equipo seleccionado: *{$equipo->codigo_nuevo}*\n\nSelecciona el *estado actual* del equipo:",
            $keyboard
        );
    }

    /**
     * Técnico seleccionó el estado del equipo → pedir diagnóstico.
     */
    private function procesarEstadoEquipo(TelegramBotSession $session, string $chatId, string $data): void
    {
        $estadoId = (int) str_replace('estado_equipo_', '', $data);

        if (!array_key_exists($estadoId, self::ESTADOS_EQUIPO)) {
            $this->telegram->enviarMensaje($chatId, "⚠️ Estado no válido. Intenta nuevamente.");
            return;
        }

        $estadoNombre = self::ESTADOS_EQUIPO[$estadoId];

        // Guardar estado del equipo en contexto, luego pedir diagnóstico
        $session->actualizarContexto(['estado_equipo_id' => $estadoId]);
        $session->cambiarEstado(TelegramBotSession::STATE_TECH_AWAITING_DIAGNOSTICO);

        $this->telegram->enviarMensaje(
            $chatId,
            "✅ Estado del equipo: *{$estadoNombre}*\n\n" .
            "📝 Escribe el *diagnóstico* o solución aplicada al soporte:"
        );
    }

    /**
     * Técnico escribió el diagnóstico → cerrar el ticket.
     */
    private function procesarDiagnostico(TelegramBotSession $session, string $chatId, string $diagnostico): void
    {
        if (strlen($diagnostico) < 5) {
            $this->telegram->enviarMensaje(
                $chatId,
                "⚠️ El diagnóstico es muy corto. Describe la solución con más detalle."
            );
            return;
        }

        $this->cerrarTicket($session, $chatId, $diagnostico);
    }

    // ═══════════════════════════════════════════════════════════
    // CIERRE DEL TICKET
    // ═══════════════════════════════════════════════════════════

    /**
     * Cerrar el ticket:
     *  - Actualiza sop_soporte (id_estado=3, fecha_fin, solucion, tipo, equipo)
     *  - Actualiza inv_equipos si corresponde
     */
    private function cerrarTicket(
        TelegramBotSession $session,
        string $chatId,
        string $diagnostico,
    ): void {
        $soporteId = $session->getContexto('soporte_id');
        $numeroSop = $session->getContexto('numero_sop');
        $tipoSopId = $session->getContexto('tipo_soporte_id');
        $equipoId = $session->getContexto('equipo_id');
        $estadoEqId = $session->getContexto('estado_equipo_id');
        $equiLabel = $session->getContexto('equipo_label');

        if (!$soporteId) {
            $this->telegram->enviarMensaje($chatId, "❌ Sesión inválida. Contacta al administrador.");
            $session->reiniciar();
            return;
        }

        try {
            DB::beginTransaction();

            $soporte = Soporte::findOrFail($soporteId);
            $soporte->id_tipo_soporte = $tipoSopId;
            $soporte->solucion = $diagnostico;
            $soporte->id_estado = 3;
            $soporte->fecha_fin = Carbon::now();

            if ($equipoId) {
                $soporte->id_equipo = $equipoId;
            }

            $soporte->save();

            // Actualizar estado físico del equipo si aplica
            if ($equipoId && $estadoEqId) {
                $equipo = InvEquipo::find($equipoId);
                if ($equipo) {
                    $equipo->estado_id = $estadoEqId;
                    $equipo->save();
                }
            }

            DB::commit();

            // Mensaje de confirmación
            $tipoNombre = self::TIPOS_SOPORTE[$tipoSopId] ?? 'N/A';
            $estadoNombre = $estadoEqId ? (self::ESTADOS_EQUIPO[$estadoEqId] ?? 'N/A') : null;

            $msg = "✅ *TICKET CERRADO EXITOSAMENTE*\n\n";
            $msg .= "📋 *N° Ticket:* #{$numeroSop}\n";
            $msg .= "🔧 *Tipo de soporte:* {$tipoNombre}\n";

            if ($equiLabel) {
                $msg .= "🖥️ *Equipo:* {$equiLabel}\n";
            }
            if ($estadoNombre) {
                $msg .= "📊 *Estado del equipo:* {$estadoNombre}\n";
            }

            $msg .= "📝 *Diagnóstico:* _{$diagnostico}_\n";
            $msg .= "\n🕒 *Fecha de cierre:* " . Carbon::now()->format('d/m/Y H:i');

            $this->telegram->enviarMensaje($chatId, $msg);
            $session->reiniciar();
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('[TelegramBot] Error al cerrar ticket: ' . $th->getMessage());
            $this->telegram->enviarMensaje(
                $chatId,
                "❌ Error al cerrar el ticket. Ciérralo manualmente desde el sistema web."
            );
            $session->reiniciar();
        }
    }
}
