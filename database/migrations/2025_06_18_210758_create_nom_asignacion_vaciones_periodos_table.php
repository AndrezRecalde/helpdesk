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
        Schema::create('nom_asignacion_vacaciones_periodos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nom_vacacion_id');
            $table->unsignedBigInteger('nom_periodo_vacacional_id');
            $table->integer('dias_usados');
            $table->timestamps();

            $table->foreign('nom_vacacion_id')->references('nom_vacaciones')->on('id')->onDelete('cascade');
            $table->foreign('nom_periodo_vacacional_id')->references('nom_periodo_vacacionales')->on('id')->onDelete('cascade');

            $table->index('nom_vacacion_id');
            $table->index('nom_periodo_vacacional_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_asignacion_vacaciones_periodos');
    }
};
