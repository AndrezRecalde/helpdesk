<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <title>Soporte - Tecnico</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        hr {
            border: 0.5px solid gray;
            height: 0.3px;
            margin-top: 1%;
            margin-bottom: 0%;
        }

        tr {
            font-size: 12px;
            margin-bottom: 20px;
        }

        td {
            width: 30px;
            padding: 5px;

        }

        .marginLineaFirma {
            margin-top: 5px;
        }

        .corte {
            width: 100%;
            height: 1px;
            background-color: black;
            border: medium none;
            border-top: 1px dashed white !important;
            margin-top: 3%;
            margin-bottom: 3%;
        }
    </style>
</head>

<body>
    <main class="mb-3">
        <div>
            <!-- ENCABEZADO -->
            <table style="width:100%">
                <tr>
                    <td>
                        <img class="img-fluid" alt="logo"
                            src={{ public_path('/assets/images/LogoTransparente.png') }} height="130" width="130">
                    </td>
                    <td>
                        <div class="text-center">
                            <strong>{{ Str::upper($institucion) }}</strong>
                            <hr>
                            {{ Str::upper($direccion) }} <br>
                            {{ Str::upper($titulo) }}

                        </div>
                    </td>
                </tr>
            </table>
            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL SOPORTE -->
            <table style="width:100% ;border: 1px solid black;">
                <tr>
                    <td>Dirección solicitante: </td>
                    <td>{{ $soporte->direccion }}</td>
                    <td></td>
                    <td>ORDEN N°: {{ $soporte->numero_sop }} <br>
                        {!! DNS1D::getBarcodeHTML($soporte->numero_sop, 'KIX') !!}</td>
                </tr>
                <tr>
                    <td>Forma de solicitud: </td>
                    <td>{{ $soporte->tipo_solicitud }}</td>
                    <td>Escrito N°: {{ $soporte->numero_escrito }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Fecha de Inicio: </td>
                    <td>{{ $soporte->fecha_ini }}</td>
                    <td>Fecha Finalización:</td>
                    <td>{{ $soporte->fecha_fin }}</td>
                </tr>
                <tr>
                    <td>Tipo de Soporte: </td>
                    <td>{{ $soporte->tipo_soporte }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Incidente: </td>
                    <td></td>
                    <td>Código/Serie Activo: </td>
                    <td>{{ $soporte->codigo_equipo }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ $soporte->incidente }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Diagnóstico: </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3">{{ $soporte->solucion }}</td>
                    <td></td>
                </tr>
                <!-- FIRMA -->
                <tr>
                    <td colspan="2">
                        <p style="font-size: 12px">Tecnico:</p>
                    </td>
                    <td colspan="2">
                        <p style="font-size: 12px">Usuario:</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $soporte->tecnico_asignado }}</p>
                    </td>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $soporte->usuario_recibe }}</p>
                    </td>
                </tr>
                <!-- FIN FIRMA -->
            </table>
            <!-- FIN CUERPO DEL SOPORTE -->



        </div>

        <hr class="corte">

        <div>
            <!-- ENCABEZADO -->
            <table style="width:100%">
                <tr>
                    <td>
                        <img class="img-fluid" alt="logo"
                            src={{ public_path('/assets/images/LogoTransparente.png') }} height="150" width="150">
                    </td>
                    <td>
                        <div class="text-center">
                            <strong>{{ Str::upper($institucion) }}</strong>
                            <hr>
                            {{ Str::upper($direccion) }} <br>
                            {{ Str::upper($titulo) }}

                        </div>
                    </td>
                </tr>
            </table>
            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL SOPORTE -->
            <table style="width:100% ;border: 1px solid black;">
                <tr>
                    <td>Dirección solicitante: </td>
                    <td>{{ $soporte->direccion }}</td>
                    <td></td>
                    <td>ORDEN N°: {{ $soporte->numero_sop }} <br>
                        {!! DNS1D::getBarcodeHTML($soporte->numero_sop, 'KIX') !!}</td>  {{-- intentar codigo barra en otra posicion --}}
                </tr>
                <tr>
                    <td>Forma de solicitud: </td>
                    <td>{{ $soporte->tipo_solicitud }}</td>
                    <td>Escrito N°: {{ $soporte->numero_escrito }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Fecha de Inicio: </td>
                    <td>{{ $soporte->fecha_ini }}</td>
                    <td>Fecha Finalización:</td>
                    <td>{{ $soporte->fecha_fin }}</td>
                </tr>
                <tr>
                    <td>Tipo de Soporte: </td>
                    <td>{{ $soporte->tipo_soporte }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Incidente: </td>
                    <td></td>
                    <td>Código/Serie Activo: </td>
                    <td>{{ $soporte->codigo_equipo }}</td>
                </tr>
                <tr>
                    <td colspan="3">{{ $soporte->incidente }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Diagnóstico: </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3">{{ $soporte->solucion }}</td>
                    <td></td>
                </tr>
                <!-- FIRMA -->
                <tr>
                    <td colspan="2">
                        <p style="font-size: 12px">Tecnico:</p>
                    </td>
                    <td colspan="2">
                        <p style="font-size: 12px">Usuario:</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $soporte->tecnico_asignado }}</p>
                    </td>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $soporte->usuario_recibe }}</p>
                    </td>
                </tr>
                <!-- FIN FIRMA -->
            </table>
            <!-- FIN CUERPO DEL SOPORTE -->
        </div>
    </main>

</body>

</html>
