<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TelegramService
{
    private string $botToken;
    private string $baseUrl;

    public function __construct()
    {
        $this->botToken = config('services.telegram.bot_token', '');
        $this->baseUrl = "https://api.telegram.org/bot{$this->botToken}";
    }

    // ─── Verificación ─────────────────────────────────────────

    public function isConfigured(): bool
    {
        return !empty($this->botToken);
    }

    // ─── Envío de mensajes ────────────────────────────────────

    /**
     * Enviar mensaje de texto simple a un chat.
     */
    public function enviarMensaje(string $chatId, string $mensaje, bool $markdown = true): bool
    {
        $data = [
            'chat_id' => $chatId,
            'text' => $mensaje,
        ];

        if ($markdown) {
            $data['parse_mode'] = 'Markdown';
        }

        return $this->post('sendMessage', $data);
    }

    /**
     * Enviar mensaje con teclado inline (botones).
     *
     * @param array $inlineKeyboard Matriz de filas de botones.
     *   Cada botón: ['text' => 'Label', 'callback_data' => 'valor']
     *
     * Ejemplo:
     *   [
     *     [['text' => 'Opción 1', 'callback_data' => 'op_1']],
     *     [['text' => 'Opción 2', 'callback_data' => 'op_2']],
     *   ]
     */
    public function enviarMensajeConTeclado(
        string $chatId,
        string $texto,
        array $inlineKeyboard,
        bool $markdown = true
    ): bool {
        $data = [
            'chat_id' => $chatId,
            'text' => $texto,
            'reply_markup' => json_encode([
                'inline_keyboard' => $inlineKeyboard,
            ]),
        ];

        if ($markdown) {
            $data['parse_mode'] = 'Markdown';
        }

        return $this->post('sendMessage', $data);
    }

    /**
     * Responder a un callback query (confirma el tap en el botón —
     * elimina el "spinner" de Telegram).
     */
    public function answerCallbackQuery(string $callbackQueryId, string $text = ''): bool
    {
        return $this->post('answerCallbackQuery', [
            'callback_query_id' => $callbackQueryId,
            'text' => $text,
        ]);
    }

    /**
     * Editar texto de un mensaje ya enviado (para actualizar opciones seleccionadas).
     */
    public function editarMensaje(string $chatId, int $messageId, string $texto): bool
    {
        return $this->post('editMessageText', [
            'chat_id' => $chatId,
            'message_id' => $messageId,
            'text' => $texto,
            'parse_mode' => 'Markdown',
        ]);
    }

    // ─── Notificaciones predefinidas ──────────────────────────

    /**
     * Notificar a un técnico que se le asignó un soporte.
     * Retorna true si la notificación fue enviada.
     */
    public function notificarSoporteAsignado(object $asignacion): bool
    {
        if (empty($asignacion->telegram_chat_id) || !$asignacion->notificar_telegram) {
            return false;
        }

        $mensaje = "🔔 *NUEVO SOPORTE ASIGNADO*\n\n";
        $mensaje .= "📋 *Ticket:* #" . ($asignacion->numero_sop ?? 'N/A') . "\n";
        $mensaje .= "👤 *Solicitante:* {$asignacion->solicitante}\n";
        $mensaje .= "🏢 *Dirección:* {$asignacion->direccion}\n";

        if (!empty($asignacion->area_tic)) {
            $mensaje .= "🔧 *Área:* {$asignacion->area_tic}\n";
        }

        $mensaje .= "📝 *Incidente:*\n_{$asignacion->incidente}_\n\n";
        $mensaje .= "📅 *Fecha:* " . Carbon::parse($asignacion->fecha_ini)->format('d/m/Y H:i') . "\n\n";
        $mensaje .= "⚡ _Por favor, atiende este ticket a la brevedad posible._";

        return $this->enviarMensaje($asignacion->telegram_chat_id, $mensaje);
    }

    /**
     * Notificar soporte cerrado.
     */
    public function notificarSoporteCerrado(object $soporte): bool
    {
        if (empty($soporte->telegram_chat_id) || !$soporte->notificar_telegram) {
            return false;
        }

        $mensaje = "✅ *SOPORTE CERRADO*\n\n";
        $mensaje .= "📋 *Ticket:* #{$soporte->numero_sop}\n";
        $mensaje .= "👤 *Solicitante:* {$soporte->solicitante}\n";
        $mensaje .= "📝 *Incidente:* {$soporte->incidente}\n\n";
        $mensaje .= "✓ El soporte ha sido cerrado exitosamente.";

        return $this->enviarMensaje($soporte->telegram_chat_id, $mensaje);
    }

    /**
     * Notificar soporte reasignado.
     */
    public function notificarSoporteReasignado(object $asignacion): bool
    {
        if (empty($asignacion->telegram_chat_id) || !$asignacion->notificar_telegram) {
            return false;
        }

        $mensaje = "🔄 *SOPORTE REASIGNADO*\n\n";
        $mensaje .= "📋 *Ticket:* #{$asignacion->numero_sop}\n";
        $mensaje .= "👤 *Solicitante:* {$asignacion->solicitante}\n";
        $mensaje .= "🏢 *Dirección:* {$asignacion->direccion}\n";
        $mensaje .= "📝 *Incidente:*\n_{$asignacion->incidente}_\n\n";
        $mensaje .= "⚠️ Este soporte ha sido reasignado a ti.";

        return $this->enviarMensaje($asignacion->telegram_chat_id, $mensaje);
    }

    /**
     * Mensaje de prueba para confirmar la configuración.
     */
    public function notificarPrueba(string $chatId, string $nombreUsuario): bool
    {
        $mensaje = "✅ *Telegram configurado correctamente*\n\n";
        $mensaje .= "Hola *{$nombreUsuario}*,\n\n";
        $mensaje .= "A partir de ahora recibirás notificaciones de los soportes asignados en este chat.\n\n";
        $mensaje .= "🔔 Sistema de HelpDesk - TIC";

        return $this->enviarMensaje($chatId, $mensaje);
    }

    // ─── Utilidades internas ──────────────────────────────────

    /**
     * Realizar llamada POST a la API de Telegram.
     */
    private function post(string $method, array $data): bool
    {
        if (!$this->isConfigured()) {
            Log::warning("TelegramService: bot_token no configurado. Método: {$method}");
            return false;
        }

        try {
            $response = Http::post("{$this->baseUrl}/{$method}", $data);

            if ($response->successful()) {
                Log::info("TelegramService [{$method}] OK → chat_id=" . ($data['chat_id'] ?? 'N/A'));
                return true;
            }

            Log::error("TelegramService [{$method}] Error: " . $response->body());
            return false;
        } catch (\Throwable $th) {
            Log::error("TelegramService [{$method}] Exception: " . $th->getMessage());
            return false;
        }
    }
}
