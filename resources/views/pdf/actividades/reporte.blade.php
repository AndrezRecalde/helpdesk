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
            font-family: Arial, sans-serif;
            background-image: url("http://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .header {
            text-align: center;
            margin-top: 20px;
        }

        /* .header img{
            width: 100px;
        } */

        .title {
            text-align: center;
            font-weight: bold;
            font-size: 1em;
            margin: 20px 0;
        }

        .membrete,
        .content,
        .anexos,
        .signatures {
            margin: 20px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
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
    </style>
</head>

<body>

    <div class="header">
        @if ($actividades[0]->id_empresa === 2)
            <img class="img-fluid" alt="Logo del GAD Esmeraldas"
                src="{{ public_path('/assets/images/LogoTransparente.png') }}" height="100" width="320">
            <h4>GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS</h4>
        @else
            <img class="img-fluid" alt="logo" src="{{ public_path('/assets/images/logo_unamydesc.png') }}"
                height="100" width="320">
            <h4>UNIDAD DE ASISTENCIA MÉDICA Y DESARROLLO SOCIAL Y CULTURAL</h4>
        @endif
    </div>

    <div class="title">INFORME DE ACTIVIDADES LABORALES</div>

    <div class="membrete">
        <p><strong>DE:</strong> {{ $actividades[0]->usuario }}</p>


        <p>
            <strong>PARA:</strong>
            @if ($actividades[0]->crgo_id !== 5)
                {{ $actividades[0]->director }}

                @if (strcasecmp($actividades[0]->cargo_director, 'PREFECTO/A') === 0)
                    <sub><i>{{ $actividades[0]->cargo_director . ' PROVINCIAL' }}</i></sub>
                @else
                    <sub><i>{{ $actividades[0]->cargo_director . ' DE ' . $actividades[0]->departamento }}</i></sub>
                @endif
            @endif
        </p>
        <p><strong>FECHA:</strong> {{ $current_fecha }}</p>
    </div>

    <div class="content">
        <h3>Asunto: {{ $title }}</h3>
        <p style="text-align: justify;">
            Por medio de este informe, presento un resumen de las actividades realizadas durante el periodo de tiempo
            {{ $fecha_inicio }} hasta {{ $fecha_fin }} en el área de {{ $actividades[0]->departamento }}.
            Este documento tiene como propósito brindar un registro detallado de las gestiones efectuadas, los logros
            alcanzados y las tareas que contribuyen al cumplimiento de los objetivos institucionales.
        </p>

        <h3>Detalle de Actividades Realizadas</h3>

        <table>
            <tr>
                <th>Fecha</th>
                <th>Descripción de la Actividad</th>
            </tr>
            @foreach ($actividades as $actividad)
                <tr>
                    <td>{{ $actividad->current_fecha }}</td>
                    <td style="text-align: justify;">{!! $actividad->actividad !!}</td>
                </tr>
            @endforeach
            <!-- Agregar más filas según sea necesario -->
        </table>
    </div>

    <div class="anexos">
        <h3>Anexos</h3>
        <p>Se adjuntan evidencias fotográficas de las actividades más relevantes realizadas durante el mes:</p>
        <ul>
            @foreach ($actividades as $actividad)
                @foreach ($actividad->imagenes as $imagen)
                    <li><strong>{!! $actividad->actividad !!}</strong><br>
                        <img src="{{ asset('storage/' . $imagen->ruta_imagen) }}"
                             alt="Imagen de {{ $actividad->nombre }}" width="100" height="100">
                    </li>
                @endforeach
            @endforeach
        </ul>
    </div>


    <div class="content">
        <h3>Conclusión</h3>
        <p style="text-align: justify;">
            Durante el periodo {{ $fecha_inicio }} hasta {{ $fecha_fin }}, se llevaron a cabo las actividades
            programadas, contribuyendo significativamente al
            desarrollo de los proyectos en curso y al cumplimiento de los objetivos establecidos por el área. Las
            acciones implementadas han permitido mejorar la eficiencia y fortalecer la colaboración dentro del equipo.
            Estoy disponible para discutir cualquier aspecto de este informe o para proporcionar información adicional
            que sea necesaria.
        </p>
    </div>

    <div class="signatures">
        <div class="footer">
            <div class="signature">
                <p><strong>{{ $actividades[0]->usuario }}</strong><br>
                    {{ $actividades[0]->cargo_usuario }}<br></p>
            </div>

            <div class="signature">
                <p><strong>
                        {{ $actividades[0]->crgo_id === 5 ? 'González Cervantes Mónica Alexandra' : $actividades[0]->director }}
                    </strong><br>
                    {{ $actividades[0]->crgo_id === 5 ? 'DIRECTOR/A' : $actividades[0]->cargo_director }}<br>
                </p>
            </div>
        </div>
    </div>

</body>

</html>
