<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de Actividades Mensual</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 30px;
        }

        body {
            font-family: "DejaVu Sans", Arial, sans-serif;
            background-image: url("http://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .header {
            text-align: center;
        }

        .header h4,
        .header h5 {
            margin: 15px 0;
            /* Reduce márgenes */
        }

        /* .header img{
            width: 100px;
        } */

        .title {
            text-align: center;
            font-weight: bold;
            font-size: 0.87em;
            margin: 12px 0;
        }

        .membrete,
        .content,
        .anexos,
        .signatures {
            margin: 10px 0;
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
            font-size: 13px;
            /* Borde para celdas */
        }

        .no-border,
        .no-border th,
        .no-border td {
            border: none !important;
            font-size: 14px;
        }

        p {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 10px;
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

        .footer {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }

        .signature {
            text-align: center;
            margin-top: 80px;
            /* Centra el texto en cada firma */
        }

        .firmas {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            /* fuerza ancho fijo */
        }

        .firmas td {
            width: 50%;
            /* cada bloque ocupa la mitad */
            text-align: center;
            vertical-align: top;
            padding: 5px;
        }
    </style>
</head>

<body>

    <div class="header">
        @if ($actividades[0]->id_empresa === 2)
            <img class="img-fluid" alt="Logo del GAD Esmeraldas"
                src="{{ public_path('/assets/images/LogoTransparente.png') }}" height="100" width="320">
            <h5>GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS</h5>
        @else
            <img class="img-fluid" alt="logo" src="{{ public_path('/assets/images/logo_unamydesc.png') }}"
                height="100" width="320">
            <h5>UNIDAD DE ASISTENCIA MÉDICA Y DESARROLLO SOCIAL Y CULTURAL</h5>
        @endif
    </div>

    <div class="title">INFORME DE ACTIVIDADES LABORALES</div>

    <table class="no-border">
        <tr>
            <td style="width: 80px;"><strong>DE:</strong></td>
            <td>{{ $actividades[0]->usuario }}</td>
        </tr>
        <tr>
            <td style="width: 80px;"><strong>PARA:</strong></td>
            <td>{{ $actividades[0]->director }}</td>
        </tr>
        <tr>
            <td style="width: 80px;"></td>
            <td>
                @if ($actividades[0]->crgo_id !== 5)

                    @if (strcasecmp($actividades[0]->cargo_director, 'PREFECTO/A') === 0)
                        <sub><i>{{ $actividades[0]->cargo_director . ' PROVINCIAL' }}</i></sub>
                    @else
                        <sub><i>{{ $actividades[0]->cargo_director . ' DE ' . $actividades[0]->departamento }}</i></sub>
                    @endif
                @endif
            </td>
        </tr>

        <tr>
            <td style="width: 80px;"><strong>FECHA:</strong></td>
            <td>{{ $current_fecha }}</td>
        </tr>
        <tr>
            <td style="width: 80px;"><strong>ASUNTO:</strong></td>
            <td>{{ $title }}</td>
        </tr>
    </table>

    <div class="content">
        <p style="text-align: justify;">
            Por medio de este informe, presento un resumen de las actividades realizadas durante el periodo de tiempo
            {{ \Carbon\Carbon::parse($fecha_inicio)->translatedFormat('d \\de F \\de Y') }} hasta
            {{ \Carbon\Carbon::parse($fecha_fin)->translatedFormat('d \\de F \\de Y') }} en el área de
            {{ $actividades[0]->departamento }}.
            Este documento tiene como propósito brindar un registro detallado de las gestiones efectuadas, los logros
            alcanzados y las tareas que contribuyen al cumplimiento de los objetivos institucionales.
        </p>

        <h4>DETALLE DE ACTIVIDADES REALIZADAS</h4>

        <table>
            <tr>
                <th>Fecha</th>
                <th>Descripción de la Actividad</th>
            </tr>
            @foreach ($actividades as $actividad)
                <tr>
                    <td style="width: 80px;">{{ $actividad->current_fecha }}</td>
                    <td style="text-align: justify;">{!! $actividad->actividad !!}</td>
                </tr>
            @endforeach
            <!-- Agregar más filas según sea necesario -->
        </table>
    </div>

    <div class="content">
        <h4>CONCLUSIÓN</h4>
        <p style="text-align: justify;">
            Durante el periodo {{ \Carbon\Carbon::parse($fecha_inicio)->translatedFormat('d \\de F \\de Y') }} hasta
            {{ \Carbon\Carbon::parse($fecha_fin)->translatedFormat('d \\de F \\de Y') }}, se llevaron a cabo las
            actividades
            programadas, contribuyendo significativamente al
            desarrollo de los proyectos en curso y al cumplimiento de los objetivos establecidos por el área. Las
            acciones implementadas han permitido mejorar la eficiencia y fortalecer la colaboración dentro del equipo.
        </p>
    </div>

    <table class="firmas">
        <tr>
            <td colspan="2">Generado por:</td>
            <td colspan="2">Aprobado por:</td>
        </tr>
        <tr>
            <td colspan="2"><input type="text" style="height: 50px; width: 100%;"></td>
            <td colspan="2"><input type="text" style="height: 50px; width: 100%;"></td>
        </tr>
        <tr>
            <td colspan="2" class="header">
                {{ $actividades[0]->usuario }} <br>
                <strong>{{ $actividades[0]->cargo_usuario }}</strong>
            </td>
            <td colspan="2" class="header">
                {{ $actividades[0]->crgo_id === 5 ? 'Benítez Pozo Alba Genoveva' : $actividades[0]->director }}
                <br>
                <strong>{{ $actividades[0]->crgo_id === 5 ? 'DIRECTOR/A' : $actividades[0]->cargo_director }}</strong>
            </td>
        </tr>
    </table>

</body>

</html>
