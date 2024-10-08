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
        Schema::create('sw_soportes', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('tecnico_id'); //usuario_id
            $table->unsignedInteger('area_id');
            $table->text('retrospectiva');
            $table->unsignedInteger('estado_id');
            $table->unsignedInteger('tipo_soporte_id');
            $table->unsignedInteger('solicitud_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sw_soportes');
    }
};
