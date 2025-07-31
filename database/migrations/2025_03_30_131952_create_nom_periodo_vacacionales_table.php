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
        Schema::create('nom_periodo_vacacionales', function (Blueprint $table) {
            $table->id();
            $table->integer('cdgo_usrio');
            $table->integer('regimen_laboral_id');
            $table->year('anio');
            $table->unsignedInteger('dias_total')->default(30);
            $table->unsignedInteger('dias_tomados')->default(0);
            $table->unsignedInteger('dias_disponibles')->default(30);
            $table->string('observacion',250);
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodo_vacacionales');
    }
};
