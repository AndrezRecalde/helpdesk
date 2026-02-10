<?php

namespace App\Http\Controllers\General;

use App\Enums\MsgStatus;
use App\Http\Controllers\Controller;
use App\Services\TelegramService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TelegramController extends Controller
{
    protected $telegramService;

    public function __construct(TelegramService $telegramService)
    {
        $this->telegramService = $telegramService;
    }

    /**
     * Configurar Telegram para el usuario autenticado
     */
    public function configurarTelegram(Request $request): JsonResponse
    {
        $request->validate([
            'telegram_chat_id' => 'required|string|max:100',
            'notificar_telegram' => 'required|boolean'
        ]);

        try {
            $user = auth()->user();

            $user->update([
                'telegram_chat_id' => $request->telegram_chat_id,
                'notificar_telegram' => $request->notificar_telegram
            ]);

            // Enviar mensaje de prueba
            $this->telegramService->notificarPrueba(
                $user->telegram_chat_id,
                $user->nmbre_usrio
            );

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Configuración de Telegram guardada exitosamente. Revisa tu chat de Telegram.'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener configuración de Telegram del usuario
     */
    public function getConfiguracion(): JsonResponse
    {
        try {
            $user = auth()->user();

            return response()->json([
                'status' => MsgStatus::Success,
                'telegram_chat_id' => $user->telegram_chat_id,
                'notificar_telegram' => $user->notificar_telegram
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Desactivar notificaciones de Telegram
     */
    public function desactivarNotificaciones(): JsonResponse
    {
        try {
            $user = auth()->user();

            $user->update(['notificar_telegram' => false]);

            return response()->json([
                'status' => MsgStatus::Success,
                'msg' => 'Notificaciones de Telegram desactivadas'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => MsgStatus::Error,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
