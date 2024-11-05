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
            margin-bottom: 25px;
            /* Margen inferior entre tablas */
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
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
            font-size: 13px;
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
                <h4>Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas</h4>
                <hr>
                <h5>CONCESIÓN DE PERMISO HASTA 4 HORAS</h5>
            </td>
        </tr>
        <tr>
            <td>Departamento:</td>
            <td colspan="3">{{ $permisos->direccion_pide }}</td>
        </tr>
        <tr>
            <td>Servidor:</td>
            <td colspan="3">{{ $permisos->usuario_pide }}</td>
        </tr>
        <tr>
            <td>Motivo del permiso:</td>
            <td>{{ $permisos->motivo }}</td>
            <td>Fecha:</td>
            <td>{{ \Carbon\Carbon::parse($permisos->fecha_ing) }}</td>
        </tr>
        <tr>
            <td>Hora de inicio:</td>
            <td><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}
                </strong></td>
            <td>Hora de finalización:</td>
            <td><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}
                </strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $permisos->per_observaciones ?? 'Sin Observación' }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 40px;"></td>
            <td colspan="2"><input type="text" style="height: 40px;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">Jefe inmediato:</td>
            <td colspan="2" class="header">Solicitante:</td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                <input type="text" style="height: 40px;">
                Recibido por:
            </td>
            <td colspan="2" class="header">
                <div class="barcode">
                    {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C39+', 1.4, 44, 'green') !!}
                    <p>{{ $permisos->idper_permisos }}</p>
                    <div class="barcode">
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="img-container">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
            </td>
            <td colspan="3" class="header">
                <h4>Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas</h4>
                <hr>
                <h5>CONCESIÓN DE PERMISO HASTA 4 HORAS</h5>
            </td>
        </tr>
        <tr>
            <td>Departamento:</td>
            <td colspan="3">{{ $permisos->direccion_pide }}</td>
        </tr>
        <tr>
            <td>Servidor:</td>
            <td colspan="3">{{ $permisos->usuario_pide }}</td>
        </tr>
        <tr>
            <td>Motivo del permiso:</td>
            <td>{{ $permisos->motivo }}</td>
            <td>Fecha:</td>
            <td>{{ \Carbon\Carbon::parse($permisos->fecha_ing) }}</td>
        </tr>
        <tr>
            <td>Hora de inicio:</td>
            <td><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}</strong></td>
            <td>Hora de finalización:</td>
            <td><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}</strong></td>
        </tr>
        <tr>
            <td colspan="4">
                <textarea style="height: 80px;">{{ $permisos->per_observaciones ?? 'Sin Observación' }}</textarea>
            </td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 40px;"></td>
            <td colspan="2"><input type="text" style="height: 40px;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">Jefe inmediato:</td>
            <td colspan="2" class="header">Solicitante:</td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                <input type="text" style="height: 40px;">
                Recibido por:
            </td>
            <td colspan="2" class="header">
                <div class="barcode">
                    {!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C39+', 1.4, 44, 'green') !!}
                    <p>{{ $permisos->idper_permisos }}</p>
                </div>
            </td>
        </tr>
    </table>

</body>

</html>
