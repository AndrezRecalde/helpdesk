<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>GTIC - Indicadores</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        body {
            font-family: Arial, sans-serif;
            color: #333;
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
            font-size: 12px;
            /* Borde para celdas */
        }

        th {
            background-color: #ddd;
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

        .header-logo {
            max-width: 150px;
        }

        .header {
            text-align: center;
        }

        .header h4,
        .header h5 {
            margin: 15px 0;
            /* Reduce márgenes */
        }

        .title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .img-container {
            text-align: center;
        }

        .img-fluid {
            display: block;
            margin: 15 auto;
            width: 170px;
            height: auto;
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

</head>

<body>
    <main>
        <!-- ENCABEZADO -->
        <table>
            <tr>
                <td class="img-container">
                    <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoCompleto.png') }}>
                </td>
                <td colspan="3" class="header">
                    <h4>{{ Str::upper($direccion) }}</h4>
                    <hr>
                    <h4>{{ Str::upper($titulo) }} <br> DEL {{ $fecha_inicio }} al {{ $fecha_fin }} </h4>

                </td>
            </tr>
        </table>
        <!-- FIN ENCABEZADO -->
        <hr>
        <!-- A. EFICIENCIA -->
        <div>
            <p>A. EFICIENCIA DE DESEMPEÑO DE ACTIVIDADES</p>
            <p>{{ $sumaDesempenoForEstados }} casos corresponden al 100%</p>
            <table>
                <thead>
                    <tr>
                        <th>DETALLE DE LOS CASOS</th>
                        <th>TOTAL DE LOS CASOS/ TOTAL DE CASOS FINALIZADOS</th>
                        <th>PORCENTAJE</th>
                    </tr>
                <tbody>
                    <tr>
                        <td>A.1 Casos {{ $desempenoForEstados[3]->estado }}/Casos Totales</td>
                        <td>{{ $desempenoForEstados[3]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                        <td>{{ round(($desempenoForEstados[3]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%
                        </td>
                    </tr>
                    <tr>
                        <td>A.2 Casos Sin Cerrar/Casos Totales</td>
                        <td>{{ $desempenoForEstados[2]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                        <td>{{ round(($desempenoForEstados[2]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%
                        </td>
                    </tr>
                    <tr>
                        <td>A.3 Casos {{ $desempenoForEstados[1]->estado }}/Casos Totales</td>
                        <td>{{ $desempenoForEstados[1]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                        <td>{{ round(($desempenoForEstados[1]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%
                        </td>
                    </tr>
                    <tr>
                        <td>A.4 Casos {{ $desempenoForEstados[4]->estado }}/Casos Totales</td>
                        <td>{{ $desempenoForEstados[4]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                        <td>{{ round(($desempenoForEstados[4]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%
                        </td>
                    </tr>
                    <tr>
                        <td>A.5 Casos {{ $desempenoForEstados[0]->estado }}/Casos Totales</td>
                        <td>{{ $desempenoForEstados[0]->total_estados }}/{{ $sumaDesempenoForEstados }}</td>
                        <td>{{ round(($desempenoForEstados[0]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%
                        </td>
                    </tr>
                </tbody>
                </thead>
            </table>
        </div>
        <div>
            <p>CASOS POR ÁREA</p>
            <table>
                <thead>
                    <tr>
                        <th>AREA</th>
                        <th>CASOS SIN <br> RESOLVER</th>
                        <th>CASOS SIN <br> CERRAR</th>
                        <th>TOTAL <br> FINALIZADOS</th>
                        <th>TOTAL <br> ANULADOS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($desempenoForAreas as $desemparea)
                        <tr>

                            <td>{{ $desemparea->area_tic }}</td>
                            <td>{{ $desemparea->total_asignados }}</td>
                            <td>{{ $desemparea->total_atendidos }}</td>
                            <td>{{ $desemparea->total_finalizados }}</td>
                            <td>{{ $desemparea->total_anuladas }}</td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>
        <div style="text-align: center;">
            <img src="{{ url($chartUrl) }}" alt="Chart" style="width: 50%; max-width: 400px;">
        </div>

        <div>
            <p>CASOS POR TÉCNICO</p>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE DEL TECNICO</th>
                        <th>CASOS SIN <br> RESOLVER</th>
                        <th>CASOS SIN <br> CERRAR</th>
                        <th>TOTAL <br> FINALIZADOS</th>
                        <th>TOTAL <br> ANULADOS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($desempenoForTecnicos as $desemptecnico)
                        <tr>
                            <td>{{ $desemptecnico->tecnico }}</td>
                            <td>{{ $desemptecnico->total_asignados }}</td>
                            <td>{{ $desemptecnico->total_atendidos }}</td>
                            <td>{{ $desemptecnico->total_finalizados }}</td>
                            <td>{{ $desemptecnico->total_anulados }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <!-- A. FIN EFICIENCIA -->
        <div style="text-align: center;">
            <img src="{{ url($chartUrl2) }}" alt="Chart2" style="width: 70%; max-width: 700px;">
        </div>

        <!-- B. EFECTIVIDAD -->
        <div>
            <p>B. CALIDAD DE LA EFECTIVIDAD EN LA ATENCIÓN A USUARIOS</p>
            <p>B1. POR AREAS</p>
            <table>
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
            <p>B2. POR TECNICOS</p>
            <table>
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
            <p>C. EFICACIA</p>
            <p>
                C1. CASOS FINALIZADOS/META(30 X DIA, EN {{ $sumaDiasHabiles[0]->dias_habiles }} DIAS):
                {{ round(($desempenoForEstados[3]->total_estados / 30 / $sumaDiasHabiles[0]->dias_habiles) * 100, 2) }}%
            </p>
            <table>
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
                    <tr>
                        <td>SATISFACCION DE LOS USUARIOS</td>
                        <td>{{ $promedioCalificacion[0]->promedio }} / 5 </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- C. FIN EFICACIA -->
        <table class="firmas">
            <tr>
                <td colspan="2">Generado por:</td>
                <td colspan="2">Aprobado por:</td>
            </tr>
            <tr>
                <td colspan="2"><input type="text" style="height: 50px; width: 100%;"></td>
                <td colspan="2"><input type="text" style="hheight: 50px; width: 100%;"></td>
            </tr>
            <tr>
                <td colspan="2" class="header">
                    {{ $usuarioGenerador->generador }} <br>
                    <strong>{{ $usuarioGenerador->cargo_generador }}</strong>
                </td>
                <td colspan="2" class="header">
                    {{ $usuarioGenerador->director }} <br>
                    <strong>{{ $usuarioGenerador->cargo_director }}</strong>
                </td>
            </tr>
        </table>
    </main>
</body>

</html>
