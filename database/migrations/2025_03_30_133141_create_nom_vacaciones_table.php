<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nom_vacaciones', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_vacacion');
            $table->integer('cdgo_usrio');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->date('fecha_retorno');
            $table->date('fecha_emision');
            $table->unsignedInteger('dias_solicitados');
            $table->unsignedInteger('motivo_id');
            $table->integer('jefe_id')->nullable();
            $table->integer('director_id')->nullable();
            $table->integer('estado_id');
            $table->integer('usuario_creador');
            $table->integer('usuario_tthh');
            $table->string('observaciones')->nullable();
            $table->unsignedBigInteger('periodo_vacacional_id');
            $table->string('observaciones_anulado')->nullable();
            $table->date('fecha_anulado')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_vacaciones');
    }
};
