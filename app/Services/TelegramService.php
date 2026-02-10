<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TelegramService
{
    private $botToken;

    public function __construct()
    {
        $this->botToken = config('services.telegram.bot_token');
    }

    /**
     * Verificar si Telegram está configurado
     */
    public function isConfigured(): bool
    {
        return !empty($this->botToken);
    }

    /**
     * Enviar mensaje genérico a Telegram
     */
    public function enviarMensaje(string $chatId, string $mensaje, bool $markdown = true): bool
    {
        try {
            if (!$this->isConfigured()) {
                Log::warning('Telegram no está configurado');
                return false;
            }

            $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";

            $data = [
                'chat_id' => $chatId,
                'text' => $mensaje
            ];

            if ($markdown) {
                $data['parse_mode'] = 'Markdown';
            }

            $response = Http::post($url, $data);

            if ($response->successful()) {
                Log::info("Mensaje Telegram enviado exitosamente a chat_id: {$chatId}");
                return true;
            } else {
                Log::error("Error al enviar mensaje Telegram: " . $response->body());
                return false;
            }
        } catch (\Throwable $th) {
            Log::error("Excepción al enviar mensaje Telegram: " . $th->getMessage());
            return false;
        }
    }

    /**
     * Notificar soporte asignado
     */
    public function notificarSoporteAsignado($asignacion): bool
    {
        if (empty($asignacion->telegram_chat_id) || !$asignacion->notificar_telegram) {
            return false;
        }

        $mensaje = "🔔 *NUEVO SOPORTE ASIGNADO*\n\n";
        $mensaje .= "📋 *Ticket:* #{$asignacion->numero_sop}\n";
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
     * Notificar soporte cerrado
     */
    public function notificarSoporteCerrado($soporte): bool
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
     * Notificar mensaje de prueba (configuración inicial)
     */
    public function notificarPrueba(string $chatId, string $nombreUsuario): bool
    {
        $mensaje = "✅ *Telegram configurado correctamente*\n\n";
        $mensaje .= "Hola *{$nombreUsuario}*,\n\n";
        $mensaje .= "A partir de ahora recibirás notificaciones de los soportes asignados en este chat.\n\n";
        $mensaje .= "🔔 Sistema de HelpDesk - TIC";

        return $this->enviarMensaje($chatId, $mensaje);
    }

    /**
     * Notificar soporte reasignado
     */
    public function notificarSoporteReasignado($asignacion): bool
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
}
