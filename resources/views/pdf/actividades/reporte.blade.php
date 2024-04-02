<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 30px;
        }

        body {
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .margines {
            margin-top: 30px;
        }

        .marginFooter {
            position: static;
            bottom: -80px;
            left: 0px;
            right: 0px;
            height: 400px;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            /* border: 1px solid #dddddd; */
            /* width: 30px; */
            text-align: left;
            padding: 8px;
        }

        .firma {
            width: 50px;
        }

        /* tr:nth-child(even) {
            background-color: #dddddd;
        } */
        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 30px;
            margin-bottom: 0%;
        }
    </style>

    <title>{{ $title }}</title>
</head>

<body>

    {{-- <footer>
        <div style="line-height: normal;">
            <p style="font-size: 14px;">Dirección: 10 de Agosto entre Bolívar y Pedro Vicente Maldonado</p>
            <p style="font-size: 14px;">Telefono: 06-2721433</p>
        </div>
    </footer> --}}


    <main class="mb-5">
        <div class="text-center mb-3">
            @if ($actividades[0]->id_empresa === 2)
                <div class="text-center mb-3">
                    <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoTransparente.png') }}
                        height="380" width="320">
                </div>
                <div class="text-center mb-5">
                    <b>GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS</b>
                </div>
            @else
                <div class="text-center mb-3">
                    <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/logo_unamydesc.png') }}
                        height="380" width="320">
                </div>
                <div class="text-center mb-5">
                    <b>UNIDAD DE ASISTENCIA MÉDICA Y DESARROLLO SOCIAL Y CULTURAL</b>
                </div>
            @endif
        </div>
        <table style="width:100%">
            <tr>
                <td width="80px"><b>DE:</b></td>
                <td>{{ $actividades[0]->usuario }}</td>
            </tr>

            @if ($actividades[0]->crgo_id !== 5)
                <tr>
                    <td width="80px"><b>PARA:</b></td>
                    <td>
                        {{ $actividades[0]->director }}
                        <sub><i>{{ $actividades[0]->cargo_director . ' DE ' . $actividades[0]->departamento }}</i></sub>
                    </td>

                </tr>
            @endif
            <tr>
                <td width="80px"><b>ASUNTO:</b></td>
                <td>{{ $title }}</td>
            </tr>
            <tr>
                <td width="80px"><b>FECHA:</b></td>
                <td>{{ $current_fecha }}</td>
            </tr>
        </table>

        <p class="mt-3" style="text-align: justify;">El presente informe redacta un detalle de las actividades
            realizadas durante el período {{ $fecha_inicio }} hasta {{ $fecha_fin }}.
            Estas actividades, en las cuales me desempeñé en el marco de mis responsabilidades laborales, están
            alineadas con los objetivos establecidos del departamento de {{ $actividades[0]->departamento }}.
        </p>
        <p>A continuación, detallo las siguientes actividades realizadas: </p>
        <div class="mt-3 mb-3">
            <table style="width:100%;">
                <tr>
                    <th><b>FECHA:</b></th>
                    <th><b>ACTIVIDAD</b></th>
                </tr>
                @foreach ($actividades as $actividad)
                    <tr>
                        <td width="150px">{{ $actividad->current_fecha }}</td>
                        <td style="text-align: justify;">{!! $actividad->actividad !!}</td>
                    </tr>
                @endforeach
            </table>
        </div>
    </main>

    <div class="marginFooter">
        <table>
            <tr>
                <td class="firma">
                    <p class="mb-5" style="font-size: 12px">Generado por:</p>
                </td>
                <td class="firma">
                    <p class="mb-5" style="font-size: 12px">Aprobado por:</p>
                </td>
            </tr>
            <tr>
                <td class="firma">
                    <hr>
                </td>
                <td class="firma">
                    <hr>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="font-size: 14px">{{ $actividades[0]->usuario }}</p>
                    <p style="font-size: 14px; margin-top: 5px">{{ $actividades[0]->cargo_usuario }}</p>
                </td>
                <td>
                    <p style="font-size: 14px">
                        {{ $actividades[0]->crgo_id === 5 ? 'González Cervantes Mónica Alexandra' : $actividades[0]->director }}
                    </p>
                    <p style="font-size: 14px; margin-top: 5px">
                        {{ $actividades[0]->crgo_id === 5 ? 'DIRECTOR/A' : $actividades[0]->cargo_director }}
                    </p>
                </td>
            </tr>
        </table>
    </div>



</body>

</html>
