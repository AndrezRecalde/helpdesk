<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Carbon\Carbon;

class ReporteLicenciasExport implements FromCollection, WithHeadings, WithStyles, ShouldAutoSize, WithColumnWidths
{
    protected $instalaciones;

    public function __construct($instalaciones)
    {
        $this->instalaciones = $instalaciones;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return collect($this->instalaciones)->map(function ($row) {
            return [
                'fecha_instalacion' => Carbon::parse($row->fecha_instalacion)->format('Y-m-d'),
                'equipo' => $row->equipo ? $row->equipo->codigo_nuevo : 'N/A',
                'custodio' => ($row->equipo && $row->equipo->usuario) ? $row->equipo->usuario->nmbre_usrio : 'N/A',
                'contrato' => ($row->licencia && $row->licencia->contrato) ? $row->licencia->contrato->codigo_contrato : 'N/A',
                'licencia' => $row->licencia ? $row->licencia->nombre : 'N/A',
                'fecha_vencimiento' => $row->licencia ? Carbon::parse($row->licencia->fecha_vencimiento)->format('Y-m-d') : 'N/A',
                'soporte' => $row->soporte ? $row->soporte->numero_sop : 'N/A',
            ];
        });
    }

    public function headings(): array
    {
        return [
            "Fecha Instalación",
            "Código Equipo",
            "Custodio",
            "Contrato",
            "Tipo Licencia",
            "Vencimiento",
            "No. Soporte"
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Estilo para los headings (negrita y fondo gris)
            1 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'color' => ['rgb' => 'D9D9D9']]],
            // Alineación de las celdas
            'A:G' => ['alignment' => ['horizontal' => 'left', 'vertical' => 'center']],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 18, // Fecha Instalación
            'B' => 18, // Código Equipo
            'C' => 35, // Custodio
            'D' => 20, // Contrato
            'E' => 25, // Tipo Licencia
            'F' => 18, // Vencimiento Licencia
            'G' => 15, // No. Soporte
        ];
    }
}
