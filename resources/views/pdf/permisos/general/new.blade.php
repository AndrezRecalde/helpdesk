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
            margin-bottom: 50px;
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
    </style>
</head>

<body>

    <table>
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
            <td colspan="3">{{ $permisos->usuario_pide }}</td>
        </tr>
        <tr>
            <td><strong>MOTIVO DEL PERMISO:</strong></td>
            <td>{{ $permisos->motivo }}</td>
            <td><strong>FECHA DEL PERMISO:</strong></td>
            <td style="font-size:15px;">{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}</td>
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
                <textarea style="height: 80px;">{{ $permisos->per_observaciones ?? 'SIN OBSERVACIÓN' }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 60px;"></td>
            <td colspan="2"><input type="text" style="height: 60px;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">JEFE INMEDIATO:</td>
            <td colspan="2" class="header">SOLICITANTE:</td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                <input type="text" style="height: 60px;">
                RECIBIDO POR:
            </td>
            <td colspan="2" class="deadcode" style="text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <p> <strong>Nro. {{ $permisos->idper_permisos }}</strong></p>
                </div>
            </td>
        </tr>
    </table>

    <table>
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
            <td colspan="3">{{ $permisos->usuario_pide }}</td>
        </tr>
        <tr>
            <td><strong>MOTIVO DEL PERMISO:</strong></td>
            <td>{{ $permisos->motivo }}</td>
            <td><strong>FECHA DEL PERMISO:</strong></td>
            <td style="font-size:15px;">{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}</td>
        </tr>
        <tr>
            <td><strong>HORA DE INICIO:</strong></td>
            <td style="font-size:15px;">
                <strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}
                </strong></td>
            <td><strong>HORA DE FINALIZACIÓN:</strong></td>
            <td style="font-size:15px;">
                <strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}
                </strong>
            </td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $permisos->per_observaciones ?? 'SIN OBSERVACIÓN' }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 60px;"></td>
            <td colspan="2"><input type="text" style="height: 60px;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">JEFE INMEDIATO:</td>
            <td colspan="2" class="header">SOLICITANTE:</td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                <input type="text" style="height: 60px;">
                RECIBIDO POR:
            </td>
            <td colspan="2" class="deadcode" style="text-align: center; vertical-align: middle;">
                <div class="barcode"
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; margin: 0 auto;">
                            {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}
                        </div>
                    </div>
                    <p> <strong>Nro. {{ $permisos->idper_permisos }}</strong></p>
                </div>
            </td>
        </tr>
    </table>

</body>

</html>
