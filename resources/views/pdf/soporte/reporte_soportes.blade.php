<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporte de Soportes</title>

    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        body {
            font-family: Arial, sans-serif;
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

        input {
            width: 98%;
            /* Ancho casi completo */
            box-sizing: border-box;
            /* Incluye padding y border en el ancho total */
            font-size: 14px;
            /* Tamaño de fuente */
            border: none;
            outline: none;
        }

        .header {
            text-align: center;
        }

        .header h4,
        .header h5 {
            margin: 15px 0;
            /* Reduce márgenes */
        }

        .img-container {
            text-align: center;
        }

        .img-fluid {
            display: block;
            margin: 15 auto;
            width: 170px;
            height: auto;
        }

        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 1%;
            margin-bottom: 0%;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="3" class="header">
                <h4>{{ Str::upper($direccion) }}</h4>
                <hr>
                <h4>{{ Str::upper($titulo) }} <br> DEL {{ $fecha_inicio }} al {{ $fecha_fin }} </h4>

            </td>
        </tr>
    </table>
    <h4>RESUMEN DE ACTIVIDADES:</h4>
    <div style="text-align: justify;">
        Durante el periodo comprendido entre el {{ $fecha_inicio }} al {{ $fecha_fin }}, en mi rol de funcionario del
        Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas, en la Gestión de Tecnologías de la Información
        y Comunicación (GTIC), yo, <strong>{{ $soportes[0]->tecnico }}</strong>, he llevado a cabo las siguientes
        actividades.
    </div>
    <table>
        <tr>
            <th style="width: 80px;"><b>No SOPORTE</b></th>
            <th><b>FECHA</b></th>
            <th><b>ACTIVIDAD</b></th>
            <th><b>SOLUCIÓN</b></th>
            <th><b>USUARIO FINAL</b></th>
        </tr>
        @foreach ($soportes as $soporte)
            <tr>
                <td style="width: 80px;">{{ $soporte->numero_sop }}</td>
                <td>{{ $soporte->fecha_ini }}</td>
                <td>{{ $soporte->incidente }}</td>
                <td>{!! $soporte->solucion !!}</td>
                <td>{{ $soporte->usuario_recibe }}</td>
            </tr>
        @endforeach
    </table>
    <table>
        <tr>
            <td colspan="2">Generado por:</td>
            <td colspan="2">Aprobado por:</td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 50px;"></td>
            <td colspan="2"><input type="text" style="height: 50px;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                {{ $soportes[0]->tecnico }} <br>
                <strong>{{ $soportes[0]->cargo_tecnico }}</strong>
            </td>
            <td colspan="2" class="header">
                {{ $jefe_departamento->jefe }} <br>
                <strong>{{ $jefe_departamento->cargo_jefe }}</strong>
            </td>
        </tr>
    </table>
</body>

</html>
