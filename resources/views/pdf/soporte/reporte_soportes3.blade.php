<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <title>Reporte de Soportes</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        body {
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: contain;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            text-align: left;
            padding: 8px;
            font-size: 12px;
        }


        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 45px;
            margin-bottom: 0%;
        }
    </style>
</head>

<body>
    <main>
        <!-- ENCABEZADO -->
        <table style="width:100%">
            <tr>
                <td>
                    <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoTransparente.png') }}
                        height="200" width="200">
                </td>
                <td>
                    <div class="text-center">
                        {{ Str::upper($direccion) }}
                        <hr>
                        {{ Str::upper($titulo) }} <br>
                        del {{ $fecha_inicio }} al {{ $fecha_fin }} <br>
                    </div>
                </td>
            </tr>
        </table>
        <!-- FIN ENCABEZADO -->
        <h6>RESUMEN DE ACTIVIDADES:</h6>
        <div style="text-align: justify;">Durante el periodo del {{ $fecha_inicio }} al {{ $fecha_fin }}, yo {{ $soportes[0]->tecnico }}
            en calidad de funcionario del Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas, en la
            Gestión de Tecnologías de la Información y Comunicación (GTIC), he llevado a cabo las siguientes actividades.
        </div>

        <!-- CUERPO DE ACTIVIDADES -->

        <table class="table table-bordered">
            <tr>
                <th><b>No SOPORTE:</b></th>
                <th><b>FECHA:</b></th>
                <th><b>ACTIVIDAD</b></th>
                <th><b>SOLUCIÓN</b></th>
                <th><b>USUARIO FINAL</b></th>
            </tr>
            @foreach ($soportes as $soporte)
                <tr>
                    <td>{{ $soporte->numero_sop }}</td>
                    <td>{{ $soporte->fecha_ini }}</td>
                    <td style="text-align: justify;">{{ $soporte->incidente }}</td>
                    <td style="text-align: justify;">{!! $soporte->solucion !!}</td>
                    <td>{{ $soporte->usuario_recibe }}</td>
                </tr>
            @endforeach
        </table>
        <!-- FIN CUERPO DE ACTIVIDADES -->

        <!-- FIRMA -->
        <div>
            <table style="width: 100%;">
                <tr>
                    <td>
                        Generado por:
                    </td>
                    <td>
                        Aprobado por:
                    </td>
                </tr>
                <tr>
                    <td>
                        <hr>
                        {{ $soportes[0]->tecnico }} <br>
                        {{ $soportes[0]->cargo_tecnico }}
                    </td>
                    <td>
                        <hr>
                        {{ $jefe_departamento->jefe }} <br>
                        {{ $jefe_departamento->cargo_jefe }}
                    </td>
                </tr>
            </table>
        </div>
        <!-- FIN FIRMA -->
    </main>
</body>

</html>
