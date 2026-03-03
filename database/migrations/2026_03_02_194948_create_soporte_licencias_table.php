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
        Schema::create('sop_licencias', function (Blueprint $table) {
            $table->id('id_licencia');
            $table->unsignedBigInteger('id_contrato');
            $table->foreign('id_contrato')->references('id_contrato')->on('sop_contratos')->onDelete('cascade');
            $table->string('nombre');
            $table->date('fecha_vencimiento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sop_licencias');
    }
};
