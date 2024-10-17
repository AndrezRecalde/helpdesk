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
        Schema::create('inv_perifericos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_periferico'); // Puede ser 'mouse', 'teclado', 'auriculares', etc.
            $table->unsignedBigInteger('marca_id')->nullable();
            $table->string('modelo')->nullable();
            $table->string('numero_serie')->nullable();
            $table->date('fecha_adquisicion')->nullable();
            $table->boolean('es_adquirido')->default(false);
            $table->boolean('es_donado')->default(false);
            $table->boolean('es_usado')->default(false);
            $table->unsignedBigInteger('equipo_id')->nullable(); // Relación con inv_equipos

            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_perifericos');
    }
};
