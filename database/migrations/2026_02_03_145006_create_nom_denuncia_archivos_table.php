<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nom_denuncia_archivos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('denuncia_id')->constrained('nom_denuncias')->onDelete('cascade');
            $table->string('nombre_original'); // Original filename
            $table->string('nombre_almacenado'); // Hashed filename in storage
            $table->string('ruta_archivo'); // Full path in storage
            $table->string('tipo_mime', 100); // MIME type (image/jpeg, application/pdf, etc.)
            $table->integer('tamano'); // File size in bytes
            $table->timestamps();

            // Index for faster queries
            $table->index('denuncia_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_denuncia_archivos');
    }
};
