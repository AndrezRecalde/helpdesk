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
            $table->foreignId('nom_vacacion_id')
                ->constrained('nom_vacaciones')
                ->onDelete('cascade');
            $table->foreignId('nom_periodo_vacacional_id')
                ->constrained('nom_periodo_vacacionales')
                ->onDelete('cascade');
            $table->integer(column: 'dias_usados');
            $table->timestamps();
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
