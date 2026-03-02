<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use App\Services\TelegramBotService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

/**
 * TelegramWebhookController
 *
 * Controlador delgado que recibe los updates entrantes de Telegram
 * y delega toda la lógica al TelegramBotService.
 *
 * Seguridad:
 *   - Verifica el header X-Telegram-Bot-Api-Secret-Token
 *     contra la variable TELEGRAM_WEBHOOK_SECRET del .env
 *   - Si el token es inválido, retorna 403
 */
class TelegramWebhookController extends Controller
{
    public function __construct(
        private readonly TelegramBotService $botService
    ) {
    }

    /**
     * Recibir y procesar un update de Telegram.
     *
     * Registrar el webhook en Telegram:
     *   GET https://api.telegram.org/bot{TOKEN}/setWebhook
     *     ?url=https://tu-dominio.com/telegram/webhook
     *     &secret_token=TELEGRAM_WEBHOOK_SECRET
     */
    public function handle(Request $request): Response
    {
        // ── Validar Secret Token ───────────────────────────────
        $secretToken = config('services.telegram.webhook_secret', '');

        if (!empty($secretToken)) {
            $headerToken = $request->header('X-Telegram-Bot-Api-Secret-Token', '');

            if (!hash_equals($secretToken, $headerToken)) {
                Log::warning('[TelegramWebhook] Token de seguridad inválido.', [
                    'ip' => $request->ip(),
                ]);
                // Telegram espera siempre 200. Retornamos 403 solo a peticiones no legítimas.
                abort(403, 'Forbidden');
            }
        }

        // ── Obtener el body del update ─────────────────────────
        $update = $request->json()->all();

        if (empty($update)) {
            Log::warning('[TelegramWebhook] Update vacío recibido.');
            return response('OK', 200);
        }

        Log::info('[TelegramWebhook] Update recibido:', [
            'update_id' => $update['update_id'] ?? null,
            'type' => array_key_exists('message', $update) ? 'message' : 'callback_query',
        ]);

        // ── Procesar en el servicio FSM ────────────────────────
        $this->botService->handle($update);

        // Telegram requiere respuesta 200 rápida
        return response('OK', 200);
    }
}
