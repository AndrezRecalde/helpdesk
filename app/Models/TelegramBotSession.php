<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramBotSession extends Model
{
    protected $table = 'telegram_bot_sessions';

    protected $fillable = [
        'chat_id',
        'state',
        'context',
    ];

    protected $casts = [
        'context' => 'array',
    ];

    // ─── Estados FSM ──────────────────────────────────────────

    /** No hay conversación activa */
    const STATE_IDLE = 'idle';

    // Flujo Usuario
    const STATE_AWAITING_CEDULA = 'awaiting_cedula';
    const STATE_AWAITING_TECNICO = 'awaiting_tecnico';
    const STATE_AWAITING_INCIDENTE = 'awaiting_incidente';

    // Flujo Técnico
    const STATE_TECH_AWAITING_CONFIRM_DIAG = 'tech_awaiting_confirm_diag';
    const STATE_TECH_AWAITING_TIPO_SOPORTE = 'tech_awaiting_tipo_soporte';
    const STATE_TECH_AWAITING_CODIGO_EQUIPO = 'tech_awaiting_codigo_equipo';
    const STATE_TECH_AWAITING_SELECCION_EQUIPO = 'tech_awaiting_seleccion_equipo';
    const STATE_TECH_AWAITING_ESTADO_EQUIPO = 'tech_awaiting_estado_equipo';
    const STATE_TECH_AWAITING_DIAGNOSTICO = 'tech_awaiting_diagnostico';

    // ─── Helpers ──────────────────────────────────────────────

    /**
     * Obtener o crear sesión para un chat_id.
     */
    public static function obtenerOCrear(string $chatId): static
    {
        return static::firstOrCreate(
            ['chat_id' => $chatId],
            ['state' => self::STATE_IDLE, 'context' => []]
        );
    }

    /**
     * Cambiar estado y guardar.
     */
    public function cambiarEstado(string $nuevoEstado): void
    {
        $this->state = $nuevoEstado;
        $this->save();
    }

    /**
     * Actualizar un valor del contexto sin perder los otros.
     */
    public function actualizarContexto(array $datos): void
    {
        $this->context = array_merge($this->context ?? [], $datos);
        $this->save();
    }

    /**
     * Reiniciar la sesión a idle.
     */
    public function reiniciar(): void
    {
        $this->state = self::STATE_IDLE;
        $this->context = [];
        $this->save();
    }

    /**
     * Obtener un valor del contexto con valor por defecto.
     */
    public function getContexto(string $clave, mixed $default = null): mixed
    {
        return $this->context[$clave] ?? $default;
    }
}
