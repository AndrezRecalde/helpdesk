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
        Schema::create('sw_solicitudes', function (Blueprint $table) {
            $table->id();
            $table->string('solicitud');
            $table->string('num_solicitud')->unique();
            $table->date('fecha_solicitud');
            $table->unsignedInteger('usuario_id');
            $table->unsignedInteger('departamento_id');
            $table->boolean('leido')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sw_solicitudes');
    }
};
