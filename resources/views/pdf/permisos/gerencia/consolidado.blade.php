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
            border: 1px solid black;
            table-layout: fixed;
            /* Distribuye equitativamente */
            margin-bottom: 25px;
            margin-top: 25px;
        }

        th,
        td {
            width: 16.66%;
            /* Misma anchura para todas las columnas */
            padding: 6px;
            /* Espacio interno para mejor legibilidad */
            vertical-align: middle;
            border: 1px solid black;
            font-size: 12px;
            text-align: center;
            /* Centra el contenido */
            word-wrap: break-word;
            /* Evita desbordes */
            overflow: hidden;
        }

        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 45px;
            margin-bottom: 0%;
        }

        .full-width-table {
            width: 100%;
        }

        .img-container {
            text-align: center;
        }

        .img-fluid {
            display: block;
            margin: 15 auto;
            width: 180px;
            height: auto;
        }

        .header {
            text-align: center;
        }

        .header h4,
        .header h5 {
            margin: 15px 0;
        }
    </style>
</head>

<body>
    <!-- ENCABEZADO -->
    <table class="full-width-table">
        <tr>
            <td colspan="2" class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="2" class="header">
                <h3>{{ $institucion }}</h3>
                <hr>
                <h4>{{ $titulo }} : {{ $fecha_inicio }} HASTA {{ $fecha_fin }}</h4>
            </td>
        </tr>
    </table>
    <!-- FIN ENCABEZADO -->
    <table class="full-width-table">
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
