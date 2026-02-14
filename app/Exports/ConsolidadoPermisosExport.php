<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class ConsolidadoPermisosExport implements FromCollection, WithHeadings, WithStyles, ShouldAutoSize, WithColumnWidths
{
    protected $permisos;

    public function __construct($permisos)
    {
        $this->permisos = $permisos;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return collect($this->permisos)->map(function ($permiso) {
            // Convertir tiempo a minutos
            $timeParts = explode(':', $permiso->suma_tiempo); // Divide en [HH, mm, ss]
            $hours = (int) $timeParts[0];
            $minutes = (int) $timeParts[1];
            $seconds = (int) $timeParts[2];

            $totalMinutes = $hours * 60 + $minutes + $seconds / 60; // Total en minutos
            $totalDays = $totalMinutes / (24 * 60); // Total en días (asumiendo 8h laborales)

            return [
                'usuario' => $permiso->usuario_string,
                'direccion' => $permiso->direccion_string,
                'motivo' => $permiso->motivo_string,
                'total_permisos' => $permiso->total_permisos,
                'total_minutos' => number_format($totalMinutes, 2),
                'tiempo_total' => $permiso->suma_tiempo,
                'total_dias' => number_format($totalDays, 2),
            ];
        });
    }

    public function headings(): array
    {
        return [
            "Usuario",
            "Dirección",
            "Motivo",
            "T. Permisos",
            "T. Minutos",
            "Tiempo Total",
            "T. Días"
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Estilo para los headings (negrita y fondo gris)
            1 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'color' => ['rgb' => 'D9D9D9']]],

            // Alineación de las celdas
            'A:G' => ['alignment' => ['horizontal' => 'left', 'vertical' => 'center']],

            // Bordes para todas las celdas
            'A1:G' . (count($this->permisos) + 1) => ['borders' => ['allBorders' => ['borderStyle' => 'thin', 'color' => ['rgb' => '000000']]]]
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 35, // Usuario
            'B' => 40, // Dirección
            'C' => 30, // Motivo
            'D' => 15, // Total Permisos
            'E' => 15, // Total Minutos
            'F' => 15, // Tiempo Total
            'G' => 15, // Total Días
        ];
    }
}
