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
        Schema::create('nom_denuncias', function (Blueprint $table) {
            $table->id();
            $table->string('numero_denuncia')->unique();
            $table->text('usuario_id_encrypted'); // Encrypted usuario_id
            $table->boolean('mostrar_informacion')->default(false); // Privacy flag
            $table->enum('tipo_denuncia', ['ACOSO', 'ABUSO', 'CORRUPCION', 'OTRO']);
            $table->text('descripcion');
            $table->enum('estado', ['PENDIENTE', 'EN_PROCESO', 'RESUELTO', 'RECHAZADO'])->default('PENDIENTE');
            $table->text('respuesta')->nullable();
            $table->timestamp('fecha_respuesta')->nullable();
            $table->integer('respondido_por')->nullable();
            $table->timestamps();

            // Foreign key for respondido_por
            $table->foreign('respondido_por')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('set null');

            // Indices for performance
            $table->index('estado');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nom_denuncias');
    }
};
