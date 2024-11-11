<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Soporte - Tecnico</title>
    <style>
        @page {
            margin: 12;
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
            border: 1px solid rgb(214, 210, 210);
            /* Borde para la tabla */
            /* border-radius: 10px; Suaviza los bordes */
            overflow: hidden;
            /* Oculta bordes redondeados */
            table-layout: fixed;
            /* Fija el ancho de las columnas */
            /* margin-bottom: 30px; */
            /* Margen inferior entre tablas */
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 10px;
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

        input[type="text"],
        input[type="date"],
        input[type="time"],
        textarea {
            width: 98%;
            /* Ancho casi completo */
            box-sizing: border-box;
            /* Incluye padding y border en el ancho total */
            font-family: Arial, sans-serif;
            font-size: 10px;
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

        .deadcode {
            text-align: center;
            vertical-align: middle;
        }

        .barcode {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .firma-table {
            width: 100%;
            margin-top: 0px;
            margin-bottom: 30px;
            border-top: none;
            /* Elimina el borde superior */
            border-collapse: collapse;
            /* Asegura que los bordes no se dupliquen */
            /* Espacio entre la tabla principal y la tabla de firma */
        }

        .firma-table tr:first-child td {
            border-top: none;
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
            <td><strong>DEPARTAMENTO: </strong></td>
            <td colspan="3">{{ $soporte->direccion }}</td>
        </tr>
        <tr>
            <td><strong>FORMA DE SOLICITUD: </strong></td>
            <td>{{ $soporte->tipo_solicitud }}</td>
            <td colspan="2"><strong>ESCRITO N°: </strong> {{ $soporte->numero_escrito }}</td>
        </tr>
        <tr>
            <td><strong>FECHA DE INICIO: </strong></td>
            <td>{{ $soporte->fecha_ini }}</td>
            <td><strong>FECHA DE FINALIZACIÓN: </strong></td>
            <td>{{ $soporte->fecha_fin }}</td>
        </tr>
        <tr>
            <td><strong>TIPO DE SOPORTE: </strong></td>
            <td>{{ $soporte->tipo_soporte }}</td>
            <td><strong>CÓDIGO/SERIE ACTIVO: </strong></td>
            <td>{{ $soporte->codigo_equipo }}</td>
        </tr>
        <tr>
            <td colspan="4"><strong>INCIDENTE: </strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 60px;">{{ $soporte->incidente }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4"><strong>DIAGNÓSTICO: </strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $soporte->solucion }}</textarea>
            </td>
        </tr>
    </table>
    <table class="firma-table">
        <tr>
            <td style="width: 35%;">
                <strong style="font-size: 10px">ƒ: TÉCNICO</strong>
            </td>
            <td style="width: 35%;">
                <strong style="font-size: 10px">ƒ: USUARIO</strong>
            </td>
            <td style="width: 30%; text-align: center; vertical-align: middle;">
                <strong style="font-size: 10px">CÓDIGO DE BARRA</strong>
            </td>
            <td></td>
        </tr>
        <tr>
            <td style="width: 35%;">
                <input type="text" style="height: 35px; width: 100%;">
                <strong style="font-size: 11px">{{ $soporte->tecnico_asignado }}</strong>
            </td>
            <td style="width: 35%;">
                <input type="text" style="height: 35px; width: 100%;">
                <strong style="font-size: 11px">{{ $soporte->usuario_recibe }}</strong>
            </td>
            <td style="width: 30%; text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($soporte->cod_barra, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <strong>Nro. {{ $soporte->numero_sop }}</strong>
                </div>
            </td>
            <td></td>
        </tr>
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
            <td><strong>DEPARTAMENTO: </strong></td>
            <td colspan="3">{{ $soporte->direccion }}</td>
        </tr>
        <tr>
            <td><strong>FORMA DE SOLICITUD: </strong></td>
            <td>{{ $soporte->tipo_solicitud }}</td>
            <td colspan="2"><strong>ESCRITO N°: </strong> {{ $soporte->numero_escrito }}</td>
        </tr>
        <tr>
            <td><strong>FECHA DE INICIO: </strong></td>
            <td>{{ $soporte->fecha_ini }}</td>
            <td><strong>FECHA DE FINALIZACIÓN: </strong></td>
            <td>{{ $soporte->fecha_fin }}</td>
        </tr>
        <tr>
            <td><strong>TIPO DE SOPORTE: </strong></td>
            <td>{{ $soporte->tipo_soporte }}</td>
            <td><strong>CÓDIGO/SERIE ACTIVO: </strong></td>
            <td>{{ $soporte->codigo_equipo }}</td>
        </tr>
        <tr>
            <td colspan="4"><strong>INCIDENTE: </strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 60px;">{{ $soporte->incidente }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="4"><strong>DIAGNÓSTICO: </strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $soporte->solucion }}</textarea>
            </td>
        </tr>
    </table>
    <table class="firma-table">
        <tr>
            <td style="width: 35%;">
                <strong style="font-size: 10px">ƒ: TÉCNICO</strong>
            </td>
            <td style="width: 35%;">
                <strong style="font-size: 10px">ƒ: USUARIO</strong>
            </td>
            <td style="width: 30%; text-align: center; vertical-align: middle;">
                <strong style="font-size: 10px">CÓDIGO DE BARRA</strong>
            </td>
            <td></td>
        </tr>
        <tr>
            <td style="width: 35%;">
                <input type="text" style="height: 35px; width: 100%;">
                <strong style="font-size: 11px">{{ $soporte->tecnico_asignado }}</strong>
            </td>
            <td style="width: 35%;">
                <input type="text" style="height: 35px; width: 100%;">
                <strong style="font-size: 11px">{{ $soporte->usuario_recibe }}</strong>
            </td>
            <td style="width: 30%; text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($soporte->cod_barra, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <strong>Nro. {{ $soporte->numero_sop }}</strong>
                </div>
            </td>
            <td></td>
        </tr>
    </table>

</body>

</html>
