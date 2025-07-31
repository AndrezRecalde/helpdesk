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
        Schema::create('nom_vacaciones_descuentos', function (Blueprint $table) {
            $table->id();
            $table->integer('usuario_id');
            $table->unsignedBigInteger('nom_periodo_vacacional_id');
            $table->decimal('dias_descuento', 3, 2);
            $table->string('motivo', 300);
            $table->integer('usuario_tthh');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_vacaciones_descuentos');
    }
};
