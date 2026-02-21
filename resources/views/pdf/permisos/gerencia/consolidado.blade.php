<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Consolidado de Permisos</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 10px;
        }

        * {
            margin: 5px 5px 5px 5px;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
        }

        .form-container {
            background-image: url('{{ public_path('/assets/images/fondo_tthh_consolidado.png') }}');
            background-size: cover;
            background-position: center;
            opacity: 0.40;
            border: 2px solid #000;
            padding: 8px;
            margin-bottom: 8px;
            //page-break-inside: avoid;
            height: 98%;
            /* Full height for the report */
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-bottom: 8px;
        }

        .header h1 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .header .numero {
            font-size: 11pt;
            font-weight: bold;
            color: #333;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 0 8px 0;
            font-size: 8pt;
        }

        .items-table th {
            background: #333;
            color: white;
            padding: 4px;
            text-align: center;
            border: 1px solid #000;
            font-weight: bold;
        }

        .items-table td {
            padding: 3px 4px;
            border: 1px solid #999;
            text-align: center;
        }

        .items-table tr:nth-child(even) {
            background: #f9f9f9;
        }
    </style>
</head>

<body>
    <div class="form-container">
        <div class="header">
            <h1>{{ $institucion ?? 'INSTITUCIÓN' }}</h1>
            <div class="numero">{{ $titulo }} : {{ $fecha_inicio }} HASTA {{ $fecha_fin }}</div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 20%">GESTIÓN</th>
                    <th style="width: 25%">SERVIDOR</th>
                    <th style="width: 10%">T. PERMISOS</th>
                    <th style="width: 15%">T. MINUTOS</th>
                    <th style="width: 15%">T. TOTAL</th>
                    <th style="width: 15%">T. DÍAS</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($permisos as $permiso)
                    @php
                        // Convertir tiempo a minutos
                        $timeParts = explode(':', $permiso->suma_tiempo); // Divide en [HH, mm, ss]
                        $hours = (int) $timeParts[0];
                        $minutes = (int) $timeParts[1];
                        $seconds = (int) $timeParts[2];

                        $totalMinutes = $hours * 60 + $minutes + $seconds / 60; // Total en minutos
                        $totalDays = $totalMinutes / (24 * 60); // Total en días (asumiendo 24h) - adjust if needed for 8h workday
                    @endphp
                    <tr>
                        <td style="text-align: left">{{ $permiso->direccion_string }}</td>
                        <td style="text-align: left">{{ Str::upper($permiso->usuario_string) }}</td>
                        <td>{{ $permiso->total_permisos }}</td>
                        <td>{{ number_format($totalMinutes, 2) }}</td>
                        <td>{{ $permiso->suma_tiempo }}</td>
                        <td>{{ number_format($totalDays, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
