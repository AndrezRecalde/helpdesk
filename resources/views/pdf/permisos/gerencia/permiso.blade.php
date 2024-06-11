<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <title>Permiso 4 horas</title>
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
            margin-top: 10px;
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
    <main class="mb-5">
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
                            {{ Str::upper($titulo) }}

                        </div>
                    </td>
                </tr>
            </table>
            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL PERMISO -->
            <table style="width:100% ;border: 1px solid black;">
                <tr>
                    <td>SOLICITUD No:</td>
                    <td>{{ $permisos->idper_permisos }}</td>
                    <td>FECHA DE PERMISO:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}</strong></td>
                    <td>{!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}</td>
                </tr>
                <tr>
                    <td>SERVIDOR:</td>
                    <td colspan="4">{{ $permisos->usuario_pide }}</td>
                </tr>
                <tr>
                    <td>DIRECCIÓN:</td>
                    <td colspan="4">{{ $permisos->direccion_pide }}</td>
                </tr>
                <tr>
                    <td>MOTIVO:</td>
                    <td>{{ $permisos->motivo }}</td>
                    <td></td>
                    <td>FECHA DE CREACIÓN:</td>
                    <td>{{ \Carbon\Carbon::parse($permisos->fecha_ing) }}</td>
                </tr>
                <tr>
                    <td>HORA SALIDA:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}</strong></td>
                    <td></td>
                    <td>HORA ENTRADA:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}</strong></td>
                </tr>
                <tr>
                    <td colspan="5">OBSERVACION: </td>
                </tr>
                <tr>
                    <td colspan="5" style="font-size: 11px">{{ $permisos->per_observaciones }}</td>
                </tr>
                <!-- FIRMA -->
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr class="marginLineaFirma">
                    <td colspan="2">
                        <p style="font-size: 12px">JEFE INMEDIATO:</p>
                    </td>
                    <td></td>
                    <td colspan="2">
                        <p style="font-size: 12px">SERVIDOR:</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $permisos->jefe_inmediato }}</p>
                    </td>
                    <td></td>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $permisos->usuario_pide }}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="1"></td>
                    <td colspan="2" style="text-align: center;">
                        <hr class="marginLineaFirma">

                        RECIBIDO POR:
                    </td>
                    <td colspan="2"></td>

                </tr>
                <!-- FIN FIRMA -->
            </table>
            <!-- FIN CUERPO DEL PERMISO -->
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
                            {{ Str::upper($titulo) }}

                        </div>
                    </td>
                </tr>
            </table>
            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL PERMISO -->
            <table style="width:100% ;border: 1px solid black;">
                <tr>
                    <td>SOLICITUD No:</td>
                    <td>{{ $permisos->idper_permisos }}</td>
                    <td>FECHA DE PERMISO:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->format('Y-m-d') }}</strong></td>
                    <td>{!! DNS1D::getBarcodeHTML($permisos->idper_permisos, 'C128', 1, 33, 'green') !!}</td>
                </tr>
                <tr>
                    <td>SERVIDOR:</td>
                    <td colspan="4">{{ $permisos->usuario_pide }}</td>
                </tr>
                <tr>
                    <td>DIRECCIÓN:</td>
                    <td colspan="4">{{ $permisos->direccion_pide }}</td>
                </tr>
                <tr>
                    <td>MOTIVO:</td>
                    <td>{{ $permisos->motivo }}</td>
                    <td></td>
                    <td>FECHA DE CREACIÓN:</td>
                    <td>{{ \Carbon\Carbon::parse($permisos->fecha_ing) }}</td>
                </tr>
                <tr>
                    <td>HORA SALIDA:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_salida)->toTimeString() }}</strong></td>
                    <td></td>
                    <td>HORA ENTRADA:</td>
                    <td style="font-size: 16px"><strong>{{ \Carbon\Carbon::parse($permisos->per_fecha_llegada)->toTimeString() }}</strong></td>
                </tr>
                <tr>
                    <td colspan="5">OBSERVACION: </td>
                </tr>
                <tr>
                    <td colspan="5" style="font-size: 11px">{{ $permisos->per_observaciones }}</td>
                </tr>
                <!-- FIRMA -->
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr class="marginLineaFirma">
                    <td colspan="2">
                        <p style="font-size: 12px">JEFE INMEDIATO:</p>
                    </td>
                    <td></td>
                    <td colspan="2">
                        <p style="font-size: 12px">SERVIDOR:</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $permisos->jefe_inmediato }}</p>
                    </td>
                    <td></td>
                    <td colspan="2">
                        <hr class="marginLineaFirma">
                        <p style="font-size: 14px">{{ $permisos->usuario_pide }}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                </tr>
                <tr>
                    <td colspan="1"></td>
                    <td colspan="2" style="text-align: center;">
                        <hr class="marginLineaFirma">

                        RECIBIDO POR:
                    </td>
                    <td colspan="2"></td>

                </tr>
                <!-- FIN FIRMA -->
            </table>
            <!-- FIN CUERPO DEL PERMISO -->
        </div>

    </main>
</body>

</html>
