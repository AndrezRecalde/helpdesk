<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Soporte - Tecnico</title>
    <style>
        @page {
            margin: 15;
            /* Elimina márgenes para impresión */
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
            /* Borde para la tabla */
            /* border-radius: 10px; Suaviza los bordes */
            overflow: hidden;
            /* Oculta bordes redondeados */
            table-layout: fixed;
            /* Fija el ancho de las columnas */
            margin-bottom: 30px;
            /* Margen inferior entre tablas */
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 12px;
            /* Borde para celdas */
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
            width: 150px;
            height: auto;
        }

        .qr-code {
            text-align: center;
        }

        .note {
            margin-top: 10px;
            /* Espacio superior */
            font-size: 0.8em;
            color: #555;
        }

        .barcode {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
        }

        input[type="text"],
        input[type="date"],
        input[type="time"],
        textarea {
            width: 98%;
            /* Ancho casi completo */
            box-sizing: border-box;
            /* Incluye padding y border en el ancho total */
            font-family: Arial, sans-serif;
            font-size: 12px;
            /* Tamaño de fuente */
            border: none;
            outline: none;
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
                <h4>{{ Str::upper($institucion) }}</h4>
                <hr>
                <h5>{{ Str::upper($direccion) }} <br>
                    {{ Str::upper($titulo) }}
                </h5>
            </td>
        </tr>
        <tr>
            <td>Departamento:</td>
            <td colspan="3">{{ $soporte->direccion }}</td>
        </tr>
        <tr>
            <td>Forma de solicitud: </td>
            <td>{{ $soporte->tipo_solicitud }}</td>
            <td colspan="2">Escrito N°: {{ $soporte->numero_escrito }}</td>
        </tr>
        <tr>
            <td>Fecha de Inicio: </td>
            <td>{{ $soporte->fecha_ini }}</td>
            <td>Fecha Finalización:</td>
            <td>{{ $soporte->fecha_fin }}</td>
        </tr>
        <tr>
            <td>Tipo de Soporte: </td>
            <td>{{ $soporte->tipo_soporte }}</td>
            <td>Código/Serie Activo: </td>
            <td>{{ $soporte->codigo_equipo }}</td>
        </tr>
        <tr>
            <td colspan="4">Incidente: </td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 60px;">{{ $soporte->incidente }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4">Diagnóstico:</td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $soporte->solucion }}</textarea>
            </td>
        </tr>
        <!-- FIRMA -->
        <tr>
            <td class="header">Técnico:</td>
            <td class="header">Usuario:</td>
            <td colspan="2" class="header">Código QR:</td>
        </tr>
        <tr>
            <td><input type="text" style="height: 50px;"></td>
            <td><input type="text" style="height: 50px;"></td>
            <td colspan="2">
                {!! DNS1D::getBarcodeHTML($soporte->cod_barra, 'C128', 1, 33, 'green') !!}
                <strong>{{ $soporte->numero_sop }}</strong>
            </td>
        </tr>
        <!-- FIN FIRMA -->

    </table>




    <table>
        <tr>
            <td class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="3" class="header">
                <h4>{{ Str::upper($institucion) }}</h4>
                <hr>
                <h5>{{ Str::upper($direccion) }} <br>
                    {{ Str::upper($titulo) }}
                </h5>
            </td>
        </tr>
        <tr>
            <td>Departamento:</td>
            <td colspan="3">{{ $soporte->direccion }}</td>
        </tr>
        <tr>
            <td>Forma de solicitud: </td>
            <td>{{ $soporte->tipo_solicitud }}</td>
            <td colspan="2">Escrito N°: {{ $soporte->numero_escrito }}</td>
        </tr>
        <tr>
            <td>Fecha de Inicio: </td>
            <td>{{ $soporte->fecha_ini }}</td>
            <td>Fecha Finalización:</td>
            <td>{{ $soporte->fecha_fin }}</td>
        </tr>
        <tr>
            <td>Tipo de Soporte: </td>
            <td>{{ $soporte->tipo_soporte }}</td>
            <td>Código/Serie Activo: </td>
            <td>{{ $soporte->codigo_equipo }}</td>
        </tr>
        <tr>
            <td colspan="4">Incidente: </td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 60px;">{{ $soporte->incidente }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4">Diagnóstico:</td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $soporte->solucion }}</textarea>
            </td>
        </tr>
        <!-- FIRMA -->
        <tr>
            <td class="header">Técnico:</td>
            <td class="header">Usuario:</td>
            <td colspan="2" class="header">Código QR:</td>
        </tr>
        <tr>
            <td><input type="text" style="height: 50px;"></td>
            <td><input type="text" style="height: 50px;"></td>
            <td colspan="2">
                {!! DNS1D::getBarcodeHTML($soporte->cod_barra, 'C128', 1, 33, 'green') !!}
                <strong>{{ $soporte->numero_sop }}</strong>
            </td>
        </tr>
        <!-- FIN FIRMA -->

    </table>
</body>

</html>
