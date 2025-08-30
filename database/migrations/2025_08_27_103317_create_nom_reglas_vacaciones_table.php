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
        Schema::create('nom_reglas_vacaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('regimen_laboral_id');
            $table->integer('desde_periodo');
            $table->integer('hasta_periodo');
            $table->integer('dias_otorgados');
            $table->integer('incremento_por_periodo')->default(0);
            $table->integer('maximo_dias');
            $table->timestamps();

            $table->foreign('regimen_laboral_id')->references('id')->on('nom_regimen_laboral')->onDelete('cascade');

            $table->index('regimen_laboral_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_reglas_vacaciones');
    }
};
