<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SoporteContrato;
use App\Models\SoporteLicencia;
use Carbon\Carbon;

class SoporteContratosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear un contrato activo
        $contrato = SoporteContrato::create([
            'codigo_contrato' => 'CONTRATO-2026-001',
            'activo' => true,
        ]);

        // Crear licencias para este contrato
        SoporteLicencia::create([
            'id_contrato' => $contrato->id_contrato,
            'nombre' => 'Microsoft Office 365',
            'fecha_vencimiento' => Carbon::now()->addYear(),
        ]);

        SoporteLicencia::create([
            'id_contrato' => $contrato->id_contrato,
            'nombre' => 'Antivirus ESET',
            'fecha_vencimiento' => Carbon::now()->addYear(),
        ]);
    }
}
