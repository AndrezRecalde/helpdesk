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
            $table->string('codigo_vacacion', 100);
            $table->integer('cdgo_usrio');
            $table->integer('direccion_id');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->date('fecha_retorno');
            $table->date('fecha_emision');
            $table->unsignedInteger('dias_solicitados');
            $table->unsignedInteger('motivo_id');
            $table->integer('reemplazo_id')->nullable();
            $table->integer('jefe_id')->nullable();
            $table->integer('director_id')->nullable();
            $table->integer('estado_id');
            $table->integer('usuario_creador');
            $table->integer('usuario_tthh');
            $table->string('observaciones', 250)->nullable();
            $table->unsignedBigInteger('periodo_vacacional_id');
            $table->string('observaciones_anulado', 250)->nullable();
            $table->date('fecha_anulado')->nullable();
            $table->timestamps();

            $table->foreign('cdgo_usrio')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('direccion_id')->references('cdgo_dprtmnto')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('motivo_id')->references('id')->on('nom_motivo_vacaciones')->onDelete('cascade');
            $table->foreign('reemplazo_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('jefe_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('director_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('estado_id')->references('idper_estado_permiso')->on('per_estado_permiso')->onDelete('cascade');
            $table->foreign('usuario_creador')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('usuario_tthh')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('periodo_vacacional_id')->references('id')->on('nom_periodo_vacacionales')->onDelete('cascade');


            $table->index('cdgo_usrio');
            $table->index('direccion_id');
            $table->index('motivo_id');
            $table->index('reemplazo_id');
            $table->index('jefe_id');
            $table->index('director_id');
            $table->index('estado_id');
            $table->index('usuario_creador');
            $table->index('usuario_tthh');
            $table->index('periodo_vacacional_id');



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
