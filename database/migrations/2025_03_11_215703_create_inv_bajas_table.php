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
        Schema::create('inv_bajas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('equipo_id');
            $table->integer('tecnico_id');
            $table->date('fecha_baja');
            $table->text('motivo');
            $table->string('numero_memorando');
            $table->unsignedBigInteger('estado_id')->default(4);
            $table->timestamps();

            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');
            $table->foreign('tecnico_id')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('estado_id')->references('id')->on('inv_estados')->onDelete('cascade');

            $table->index('equipo_id');
            $table->index('tecnico_id');
            $table->index('estado_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_bajas');
    }
};
