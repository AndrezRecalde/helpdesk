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
        Schema::create('solicitudes_consumibles', function (Blueprint $table) {
            $table->id();
            $table->string('numero_solicitud')->unique();
            $table->integer('departamento_id');
            $table->integer('usuario_autoriza');
            $table->integer('usuario_solicita');
            $table->text('observaciones')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('departamento_id')->references('cdgo_dprtmnto')->on('dprtmntos')->onDelete('cascade');
            $table->foreign('usuario_autoriza')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');
            $table->foreign('usuario_solicita')->references('cdgo_usrio')->on('usrios_sstma')->onDelete('cascade');

            // Indexes
            $table->index('departamento_id');
            $table->index('usuario_autoriza');
            $table->index('usuario_solicita');
            $table->index('numero_solicitud');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_consumibles');
    }
};
