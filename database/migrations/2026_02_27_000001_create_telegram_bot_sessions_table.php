<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     * Tabla para persistir el estado conversacional del Bot de Telegram (FSM).
     */
    public function up(): void
    {
        Schema::create('telegram_bot_sessions', function (Blueprint $table) {
            $table->id();

            // Identificador único del chat de Telegram
            $table->string('chat_id', 100)->unique()->index();

            // Estado actual de la conversación (FSM)
            // Valores posibles:
            //   idle
            //   awaiting_cedula, awaiting_tecnico, awaiting_incidente  (flujo usuario)
            //   tech_awaiting_tipo_soporte, tech_awaiting_codigo_equipo,
            //   tech_awaiting_seleccion_equipo, tech_awaiting_estado_equipo  (flujo técnico)
            $table->string('state', 60)->default('idle');

            // Contexto serializado (datos acumulados durante la conversación)
            // Ej: { cedula, usuario_id, tecnico_id, tecnico_chat_id, soporte_id, tipo_soporte, equipos[] }
            $table->json('context')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telegram_bot_sessions');
    }
};
