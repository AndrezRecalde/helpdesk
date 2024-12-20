<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Permiso</title>
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
            /* margin-bottom: 50px; */
            /* Margen inferior entre tablas */
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 13px;
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

        .background-wrapper-1 {
            position: relative;
            /* Ajusta el alto */
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2024/11/servidor.png');
            background-size: contain;
            /* Ajusta la imagen al tamaño del contenedor */
            background-position: center;
            /* Centra la imagen */
            background-repeat: no-repeat;
            /* Evita la repetición */
        }

        .background-wrapper-2 {
            position: relative;
            background-image: url('https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2024/11/recepcion.png');
            background-size: contain;
            /* Ajusta la imagen al tamaño del contenedor */
            background-position: center;
            /* Centra la imagen */
            background-repeat: no-repeat;
            /* Evita la repetición */
        }

        .background-wrapper-1 input,
        .background-wrapper-1 textarea {
            position: relative;
            /* Ocupa todo el alto del contenedor */
            background: transparent;
            z-index: 1;
            /* Coloca los elementos encima del fondo */
        }

        .background-wrapper-2 input,
        .background-wrapper-2 textarea {
            position: relative;
            /* Ocupa todo el alto del contenedor */
            background: transparent;
            z-index: 1;
            /* Coloca los elementos encima del fondo */
        }
    </style>
</head>

<body>

    <table class="firma-table background-wrapper-1">
        <tr>
            <td class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="3" class="header">
                <h4>{{ Str::upper('Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas') }}</h4>
                <hr>
                <h4>CONCESIÓN DE PERMISO HASTA 4 HORAS</h4>
            </td>
        </tr>
        <tr>
            <td><strong>DEPARTAMENTO:</strong></td>
            <td colspan="3">{{ $permisos->direccion_pide }}</td>
        </tr>
        <tr>
            <td><strong>SERVIDOR:</strong></td>
            <td colspan="3">{{ \Str::upper($permisos->usuario_pide) }}</td>
        </tr>
        <tr>
            <td><strong>MOTIVO DEL PERMISO:</strong></td>
            <td colspan="3">{{ $permisos->motivo }}</td>
        </tr>
        <tr>
            <td><strong>FECHA DEL PERMISO:</strong></td>
            <td style="font-size:15px;">
                <strong>
                    {{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}
                </strong>
            </td>
            <td><strong>FECHA DE CREACIÓN:</strong></td>
            <td style="font-size:15px;">
                <strong>
                    {{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}
                </strong>
            </td>
        </tr>
        <tr>
            <td><strong>HORA DE INICIO:</strong></td>
            <td style="font-size:15px;"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}
                </strong></td>
            <td><strong>HORA DE FINALIZACIÓN:</strong></td>
            <td style="font-size:15px;">
                <strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}
                </strong>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 130px;">{{ $permisos->per_observaciones ?? 'SIN OBSERVACIÓN' }}</textarea>
            </td>
        </tr>
        <tr>
            <td>
                <strong style="font-size: 10px">ƒ: JEFE INMEDIATO</strong>
            </td>
            <td>
                <strong style="font-size: 10px">ƒ: SERVIDOR</strong>
            </td>
            <td>
                <strong style="font-size: 10px">ƒ: RECIBIDO POR</strong>
            </td>
            <td style="text-align: center; vertical-align: middle;">
                <strong style="font-size: 10px">CÓDIGO DE BARRA</strong>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">{{ $permisos->jefe_inmediato }}</strong>
            </td>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">{{ $permisos->usuario_pide }}</strong>
            </td>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">Personal TTHH</strong>
            </td>
            <td style="text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <strong>Nro. {{ $permisos->idper_permisos }}</strong>
                </div>
            </td>
        </tr>
    </table>

    <table class="firma-table background-wrapper-2">
        <tr>
            <td class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="3" class="header">
                <h4>{{ Str::upper('Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas') }}</h4>
                <hr>
                <h4>CONCESIÓN DE PERMISO HASTA 4 HORAS</h4>
            </td>
        </tr>
        <tr>
            <td><strong>DEPARTAMENTO:</strong></td>
            <td colspan="3">{{ $permisos->direccion_pide }}</td>
        </tr>
        <tr>
            <td><strong>SERVIDOR:</strong></td>
            <td colspan="3">{{ \Str::upper($permisos->usuario_pide) }}</td>
        </tr>
        <tr>
            <td><strong>MOTIVO DEL PERMISO:</strong></td>
            <td colspan="3">{{ $permisos->motivo }}</td>
        </tr>
        <tr>
            <td><strong>FECHA DEL PERMISO:</strong></td>
            <td style="font-size:15px;">
                <strong>
                    {{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}
                </strong>
            </td>
            <td><strong>FECHA DE CREACIÓN:</strong></td>
            <td style="font-size:15px;">
                <strong>
                    {{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}
                </strong>
            </td>
        </tr>
        <tr>
            <td><strong>HORA DE INICIO:</strong></td>
            <td style="font-size:15px;">
                <strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}
                </strong>
            </td>
            <td><strong>HORA DE FINALIZACIÓN:</strong></td>
            <td style="font-size:15px;">
                <strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}
                </strong>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 130px;">{{ $permisos->per_observaciones ?? 'SIN OBSERVACIÓN' }}</textarea>
            </td>
        </tr>
        <tr>
            <td>
                <strong style="font-size: 10px">ƒ: JEFE INMEDIATO</strong>
            </td>
            <td>
                <strong style="font-size: 10px">ƒ: SERVIDOR</strong>
            </td>
            <td>
                <strong style="font-size: 10px">ƒ: RECIBIDO POR</strong>
            </td>
            <td style="text-align: center; vertical-align: middle;">
                <strong style="font-size: 10px">CÓDIGO DE BARRA</strong>
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">{{ $permisos->jefe_inmediato }}</strong>
            </td>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">{{ $permisos->usuario_pide }}</strong>
            </td>
            <td>
                <input type="text" style="height: 60px; width: 100%;">
                <strong style="font-size: 12px">Personal TTHH</strong>
            </td>
            <td style="text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <strong>Nro. {{ $permisos->idper_permisos }}</strong>
                </div>
            </td>
        </tr>
    </table>

</body>

</html>
