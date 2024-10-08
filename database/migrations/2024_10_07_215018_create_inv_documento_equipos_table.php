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
        Schema::create('inv_documento_equipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_documento');
            $table->string('documento');
            $table->unsignedBigInteger('equipo_id');

            $table->foreign('equipo_id')->references('id')->on('inv_equipos')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inv_documento_equipos');
    }
};
