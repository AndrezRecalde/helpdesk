<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <title>GTIC - Indicadores</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        hr {
            height: 1.5px;
            background-color: black;
            margin-top: 1%;
            margin-bottom: 0%;
        }


        /* p {
            font-size: 14px;
            margin-bottom: 0%;

        } */

        tr {
            font-size: 12px;
            margin-bottom: 20px;
        }

        td {
            width: 30px;
            padding: 5px;

        }
        .marginFooter {
            position: static;
            bottom: -80px;
            left: 0px;
            right: 0px;
            height: 400px;
        }
        .marginTop {
            margin-top: 20px;
        }

        .marginBottom {
            margin-bottom: 10px;
        }

        .firma {
            width: 50px;
        }
        .marginLineaFirma {
            margin-top: 80px;
        }
    </style>
</head>

<body>
    <main class="mb-5">
        <!-- ENCABEZADO -->
        <table style="width:100%">
            <tr class="border">
                <td class="mt-0">
                    <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoTransparente.png') }}
                        height="200" width="200">
                </td>
                <td class="mt-0">
                    <div class="text-center">
                        <p>{{ Str::upper($direccion) }}</p>
                        <hr>
                        <p>{{ Str::upper($titulo) }}</p>
                        <p>del {{ $fecha_inicio }} al {{ $fecha_fin }}</p>

                    </div>
                </td>
            </tr>
        </table>
        <!-- FIN ENCABEZADO -->
        <hr>

        <!-- A. EFICIENCIA -->
        <div>
            <p class="text-left marginTop marginBottom">A. EFICIENCIA DE DESEMPEÑO DE ACTIVIDADES</p>
            <p class="text-left marginBottom">{{ $sumaDesempenoForEstados }} casos corresponden al 100%</p>
            <table class="table table-bordered">
                <tr>
                    <td>A.1 Casos {{ $desempenoForEstados[3]->estado }}/Casos Totales</td>
                    <td>{{ $desempenoForEstados[3]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                    <td>{{ round(($desempenoForEstados[3]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>

                    <td>A.2 Casos {{ $desempenoForEstados[1]->estado }}/Casos Totales</td>
                    <td>{{ $desempenoForEstados[1]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                    <td>{{ round(($desempenoForEstados[1]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
                <tr>
                    <td>A.3 Casos {{ $desempenoForEstados[0]->estado }}/Casos Totales</td>
                    <td>{{ $desempenoForEstados[0]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                    <td>{{ round(($desempenoForEstados[0]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>

                    <td>A.4 Casos {{ $desempenoForEstados[2]->estado }}/Casos Totales</td>
                    <td>{{ $desempenoForEstados[2]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                    <td>{{ round(($desempenoForEstados[2]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
            </table>
        </div>

        <div>
            <p class="text-left marginBottom">CASOS POR ÁREA</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>AREA</th>
                        <th>TOTAL PENDIENTES</th>
                        <th>TOTAL ATENDIDOS</th>
                        <th>TOTAL FINALIZADOS</th>
                        <th>TOTAL ANULADOS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($desempenoForAreas as $desemparea)
                        <tr>

                            <td>{{ $desemparea->area_tic }}</td>
                            <td>{{ $desemparea->total_pendientes }}</td>
                            <td>{{ $desemparea->total_atendidos }}</td>
                            <td>{{ $desemparea->total_finalizados }}</td>
                            <td>{{ $desemparea->total_anuladas }}</td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>

        <div>
            <p class="text-left marginBottom">CASOS POR TÉCNICO</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>NOMBRE DEL TECNICO</th>
                        <th>TOTAL PENDIENTES</th>
                        <th>TOTAL ATENDIDOS</th>
                        <th>TOTAL FINALIZADOS</th>
                        <th>TOTAL ANULADOS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($desempenoForTecnicos as $desemptecnico)
                        <tr>
                            <td>{{ $desemptecnico->tecnico }}</td>
                            <td>{{ $desemptecnico->total_pendientes }}</td>
                            <td>{{ $desemptecnico->total_atendidos }}</td>
                            <td>{{ $desemptecnico->total_finalizados }}</td>
                            <td>{{ $desemptecnico->total_anulados }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <!-- A. FIN EFICIENCIA -->

        <!-- B. EFECTIVIDAD -->
        <div>
            <p class="text-left marginTop marginBottom">B. CALIDAD DE LA EFECTIVIDAD EN LA ATENCIÓN A USUARIOS</p>
            <p class="text-left marginTop marginBottom">B1. POR AREAS</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>AREA</th>
                        <th>TOTAL ASISTENCIA</th>
                        <th>TOTAL PROMEDIO</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($efectividadForAreas as $efectividadarea)
                        <tr>
                            <td>{{ $efectividadarea->area_tic }}</td>
                            <td>{{ $efectividadarea->total_asistencia }}</td>
                            <td>{{ $efectividadarea->total_promedio }}</td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>
        <div>
            <p class="text-left marginTop marginBottom">B2. POR TECNICOS</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>NOMBRE DE TECNICOS</th>
                        <th>TOTAL ASISTENCIA</th>
                        <th>TOTAL PROMEDIO</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($efectividadForTecnicos as $efectividadtenico)
                        <tr>
                            <td>{{ $efectividadtenico->tecnico }}</td>
                            <td>{{ $efectividadtenico->total_asistencia }}</td>
                            <td>{{ $efectividadtenico->total_promedio }}</td>
                        </tr>
                    @endforeach


                </tbody>
            </table>
        </div>
        <!-- B. FIN EFECTIVIDAD -->

        <!-- C. EFICACIA -->
        <div>
            <p class="text-left marginTop marginBottom">C. EFICACIA</p>
            <p class="text-left marginTop marginBottom">
                C1. CASOS FINALIZADOS/META(30 X DIA, EN 261 DIAS):
                {{ round(($desempenoForEstados[3]->total_estados / 30 / $sumaDiasHabiles[0]->dias_habiles) * 100, 2) }}%
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>DETALLE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>META DIARIA DE ATENCION</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>CASOS FINALIZADOS</td>
                        <td>{{ $desempenoForEstados[3]->total_estados }}</td>
                    </tr>
                    <tr>
                        <td>PERIODO(NUMERO DE DIAS)</td>
                        <td>{{ $sumaDiasHabiles[0]->dias_habiles }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- C. FIN EFICACIA -->


        <div>
            <table class="table table-bordered">
                <tr>
                    <td class="firma">
                        Generado por:
                    </td>
                    <td class="firma">
                        Aprobado por:
                    </td>
                </tr>
                <tr>
                    <td>
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $usuarioGenerador->generador }}</p>
                        <p style="font-size: 14px; margin-top: 5px">{{ $usuarioGenerador->cargo_generador }}</p>
                    </td>
                    <td>
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $usuarioGenerador->director }}</p>
                        <p style="font-size: 14px; margin-top: 5px">{{ $usuarioGenerador->cargo_director }}</p>
                    </td>
                </tr>
            </table>
        </div>



    </main>
</body>

</html>
