<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Permiso</title>
    <style>
        @page {
            margin: 15px;
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
            overflow: hidden;
            table-layout: fixed;
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 13px;
        }

        .header {
            text-align: center;
        }

        .header h4 {
            margin: 15px 0;
        }

        .img-container {
            text-align: center;
        }

        .img-fluid {
            display: block;
            margin: 15px auto;
            width: 150px;
            height: auto;
        }

        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 1%;
            margin-bottom: 0;
        }

        input[type="text"],
        textarea {
            width: 98%;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            font-size: 12px;
            border: none;
            outline: none;
            background: transparent;
        }

        /* Separador entre copias */
        .page-break {
            margin-bottom: 20px;
        }

        .background-image-1 {
            position: relative;
            background-image: url('{{ public_path('/assets/images/servidor.png') }}');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        .background-image-2 {
            position: relative;
            background-image: url('{{ public_path('/assets/images/recepcion.png') }}');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    </style>
</head>

<body>

    @php
        $nombreServidor = Str::upper($permiso->usuario_pide);
        $nombreJefe = Str::upper($permiso->jefe_inmediato);
        $observacion = $permiso->per_observaciones ?? 'SIN OBSERVACIÓN';
    @endphp

    @for ($copia = 0; $copia < 2; $copia++)
        <table class="{{ $copia === 0 ? 'page-break background-image-1' : 'background-image-2' }}">
            {{-- Encabezado --}}
            <tr>
                <td class="img-container">
                    <img class="img-fluid" alt="logo" src="{{ public_path('/assets/images/LogoCompleto.png') }}">
                </td>
                <td colspan="3" class="header">
                    <h4>{{ Str::upper('Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas') }}</h4>
                    <hr>
                    <h4>CONCESIÓN DE PERMISO HASTA 4 HORAS</h4>
                </td>
            </tr>

            {{-- Datos del permiso --}}
            <tr>
                <td><strong>DEPARTAMENTO:</strong></td>
                <td colspan="3">{{ $permiso->direccion_pide }}</td>
            </tr>
            <tr>
                <td><strong>SERVIDOR:</strong></td>
                <td colspan="3">{{ $nombreServidor }}</td>
            </tr>
            <tr>
                <td><strong>MOTIVO DEL PERMISO:</strong></td>
                <td colspan="3" style="font-size:15px; background-color:#d2d6d9; padding:5px;">
                    {{ $permiso->motivo }}
                </td>
            </tr>
            <tr>
                <td><strong>FECHA DEL PERMISO:</strong></td>
                <td style="font-size:15px; background-color:#d2d6d9; padding:5px;">
                    <strong>{{ $fecha_permiso }}</strong>
                </td>
                <td><strong>FECHA DE CREACIÓN:</strong></td>
                <td style="font-size:15px;">
                    <strong><i>{{ $fecha_creacion }}</i></strong>
                </td>
            </tr>
            <tr>
                <td><strong>HORA DE INICIO:</strong></td>
                <td style="font-size:15px; background-color:#d2d6d9; padding:5px;">
                    <strong>{{ $hora_inicio }}</strong>
                </td>
                <td><strong>HORA DE FINALIZACIÓN:</strong></td>
                <td style="font-size:15px; background-color:#d2d6d9; padding:5px;">
                    <strong>{{ $hora_fin }}</strong>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <textarea style="height: 130px;">{{ $observacion }}</textarea>
                </td>
            </tr>

            {{-- Firmas --}}
            <tr>
                <td><strong style="font-size: 10px">ƒ: JEFE INMEDIATO</strong></td>
                <td><strong style="font-size: 10px">ƒ: SERVIDOR</strong></td>
                <td><strong style="font-size: 10px">ƒ: RECIBIDO POR</strong></td>
                <td style="text-align: center; vertical-align: middle;">
                    <strong style="font-size: 10px">CÓDIGO DE BARRA</strong>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" style="height: 60px; width: 100%;">
                    <strong style="font-size: 11px">{{ $nombreJefe }}</strong>
                </td>
                <td>
                    <input type="text" style="height: 60px; width: 100%;">
                    <strong style="font-size: 11px">{{ $nombreServidor }}</strong>
                </td>
                <td>
                    <input type="text" style="height: 60px; width: 100%;">
                    <strong style="font-size: 11px">PERSONAL TTHH</strong>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                    <img src="data:image/png;base64,{{ DNS1D::getBarcodePNG($permiso->idper_permisos, 'C128', 1, 33, [0, 128, 0]) }}"
                        alt="Codigo de barra"><br>
                    <strong>Nro. {{ $permiso->idper_permisos }}</strong>
                </td>
            </tr>
        </table>
    @endfor

</body>

</html>
