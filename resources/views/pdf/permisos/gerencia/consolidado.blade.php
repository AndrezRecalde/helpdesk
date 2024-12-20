<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Consolidado de Permisos</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        body {
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 0.5px solid gray;
            /* Corrige el borde */
            table-layout: auto;
            /* Cambia a 'auto' para ajustar el ancho según el contenido */
            margin-bottom: 25px;
            margin-top: 25px;
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 12px;
            /* Borde para celdas */
        }


        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 45px;
            margin-bottom: 0%;
        }
    </style>
</head>

<body>
    <h3>CONSOLIDADO DE PERMISOS: {{ $motivo_id === 1 ? 'PERSONAL' : 'OFICIAL' }}</h3>
    <p>A continuación se presenta un consolidado de permisos desde {{ $fecha_inicio }} hasta {{ $fecha_fin }} de
        todos los funcionarios del Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas</p>
    <hr />
    <table>
        <tr>
            <th><b>GESTIÓN</b></th>
            <th><b>SERVIDOR</b></th>
            <th><b>T. PERMISOS</b></th>
            <th><b>T. MINUTOS</b></th>
            <th><b>T. TOTAL</b></th>
            <th><b>T. DÍAS</b></th>
        </tr>
        @foreach ($permisos as $permiso)
            @php
                // Convertir tiempo a minutos
                $timeParts = explode(':', $permiso->suma_tiempo); // Divide en [HH, mm, ss]
                $hours = (int) $timeParts[0];
                $minutes = (int) $timeParts[1];
                $seconds = (int) $timeParts[2];

                $totalMinutes = $hours * 60 + $minutes + $seconds / 60; // Total en minutos
                $totalDays = $totalMinutes / (24 * 60); // Total en días
            @endphp
            <tr>
                <td>{{ $permiso->direccion_string }}</td>
                <td>{{ $permiso->usuario_string }}</td>
                <td>{{ $permiso->total_permisos }}</td>
                <td>{{ number_format($totalMinutes, 2) }} minutos</td>
                <td>{{ $permiso->suma_tiempo }}</td>
                <td>{{ number_format($totalDays, 2) }} días</td>
            </tr>
        @endforeach
    </table>
</body>

</html>
