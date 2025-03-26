<?php

namespace App\Exports;

use App\Models\InvEquipo;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class InvEquiposExport implements FromCollection, WithHeadings, WithStyles, ShouldAutoSize, WithColumnWidths
{
    protected $campo;
    protected $valor;

    public function __construct($campo, $valor)
    {
        $this->campo = $campo;
        $this->valor = $valor;
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Mismo mapa de campos de tu función
        $mapaCampos = [
            'direccion'     => 'inve.direccion_id',
            'usuario'       => 'inve.user_id',
            'codigo'        => ['inve.codigo_nuevo', 'inve.codigo_antiguo'],
            'categoria'     => 'inve.categoria_id',
            'numero_serie'  => 'inve.numero_serie',
            'estado'        => 'inve.estado_id',
        ];

        if (!array_key_exists($this->campo, $mapaCampos)) {
            return collect([]); // Devuelve una colección vacía si el campo no es válido
        }

        $query = InvEquipo::from('inv_equipos as inve')
            ->select(
                'invm.nombre_marca',
                'inve.modelo',
                'inve.numero_serie',
                'inve.codigo_antiguo',
                'inve.codigo_nuevo',
                'invc.nombre_categoria',
                'inves.nombre_estado',
                'us.nmbre_usrio as responsable',
                'd.nmbre_dprtmnto as direccion'
            )
            ->join('inv_categorias as invc', 'invc.id', '=', 'inve.categoria_id')
            ->join('inv_estados as inves', 'inves.id', '=', 'inve.estado_id')
            ->join('inv_marcas as invm', 'invm.id', '=', 'inve.marca_id')
            ->leftJoin('usrios_sstma as us', 'inve.user_id', '=', 'us.cdgo_usrio')
            ->leftJoin('dprtmntos as d', 'inve.direccion_id', '=', 'd.cdgo_dprtmnto');

        // Aplicar filtros si el valor no está vacío
        if (!empty($this->valor)) {
            if (is_array($mapaCampos[$this->campo])) {
                $query->where(function ($q) use ($mapaCampos) { // <-- Aquí pasamos la variable con `use`
                    foreach ($mapaCampos[$this->campo] as $columna) {
                        $q->orWhere($columna, 'LIKE', "%{$this->valor}%");
                    }
                });
            } else {
                $query->where($mapaCampos[$this->campo], 'LIKE', "%{$this->valor}%");
            }
        }

        return $query->orderBy('inve.id', 'DESC')->get();
    }

    public function headings(): array
    {
        return [
            "Marca",
            "Modelo",
            "Numero Serie",
            "Codigo Antiguo",
            "Codigo Nuevo",
            "Categoria",
            "Estado",
            "Custorio",
            "Direccion"
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Estilo para los headings (negrita y fondo gris)
            1 => ['font' => ['bold' => true], 'fill' => ['fillType' => 'solid', 'color' => ['rgb' => 'D9D9D9']]],

            // Alineación de las celdas
            'A:Z' => ['alignment' => ['horizontal' => 'left', 'vertical' => 'left']],

            // Bordes para todas las celdas
            'A1:G1000' => ['borders' => ['allBorders' => ['borderStyle' => 'thin', 'color' => ['rgb' => '000000']]]]
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 25, // Marca
            'B' => 25, // Modelo
            'C' => 25, // Numero Serie
            'D' => 25, // Codigo Antiguo
            'E' => 25, // Codigo Nuevo
            'F' => 30, // Categoria
            'G' => 25, // Estado
            'H' => 30, //Custorio
            'I' => 30, //Custorio
        ];
    }
}
