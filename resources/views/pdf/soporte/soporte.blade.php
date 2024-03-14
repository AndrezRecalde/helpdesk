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
            height: 1.5px;
            background-color: black;
            margin-top: 1%;
            margin-bottom: 0%;
        }

        p {
            font-size: 14px;
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

        .corte {
            width: 100%;
            height: 0;
            background-color: black;
            border: medium none;
            border-top: 1px dashed white !important;
            margin-top: 2%;
            margin-bottom: 2%;

        }
    </style>
</head>

<body>
    <main class="mb-5">
        <div>
            <!-- ENCABEZADO -->
            <table style="width:100%">
                <tr class="border">
                    <td class="mt-0">
                        <img class="img-fluid" alt="logo"
                            src={{ public_path('/assets/images/LogoTransparente.png') }} height="150" width="150">
                    </td>
                    <td class="mt-0">
                        <div class="text-center">
                            <p>{{ Str::upper($institucion) }}</p>
                            <hr>
                            <p>{{ Str::upper($direccion) }}</p>
                            <p>{{ Str::upper($titulo) }}</p>

                        </div>
                    </td>
                </tr>
            </table>

            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL SOPORTE -->
            <table style="width:100%; border: 1px solid black;">
                <tr>
                    <td>Dirección solicitante: </td>
                    <td>GESTIÓN DE FISCALIZACIÓN</td>
                    <td>ORDEN N°: 3456</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Forma de solicitud: </td>
                    <td>VERBAL</td>
                    <td>Escrito N°: MEMO No 456 HAP-GTIC-SA</td>
                    <td>BARRA DE CODIGO</td>
                </tr>
                <tr>
                    <td>Fecha de Inicio: </td>
                    <td> 13/03/2024 11:05:00</td>
                    <td>Fecha Finalización:</td>
                    <td> 13/03/2024 14:13:00</td>
                </tr>
                <tr>
                    <td>Tipo de Soporte: </td>
                    <td>SOPORTE A USUARIOS</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Incidente: </td>
                    <td></td>
                    <td>Código/Serie Activo: </td>
                    <td>007-001-003</td>
                </tr>
                <tr>
                    <td colspan="2">SE ME APAGO EL MONITOR Y CPU SE ME APAGO EL MONITOR Y CPU SE ME APAGO EL MONITOR
                        Y
                        CPU SE ME APAGO EL MONITOR Y CPU</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Diagnóstico: </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">SE PROCEDIÓ A SECAR EL COMPUTADOR CON UN VENTILADOR Y LUEGO SE CAMBIO EL MONITOR
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>

                </tr>
                <tr>
                    <td class="text-center" colspan="2">Recalde Solano Cristhian Andres</td>
                    <td class="text-center" colspan="2">Quiñonmez Tenorio Erika Lissette</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tecnico</td>
                    <td></td>
                    <td>Usuario</td>
                </tr>
            </table>
            <!-- FIN CUERPO DEL SOPORTE -->
        </div>

        <hr class="corte">

        <div>
            <!-- ENCABEZADO -->
            <table style="width:100%">
                <tr class="border">
                    <td class="mt-0">
                        <img class="img-fluid" alt="logo"
                            src={{ public_path('/assets/images/LogoTransparente.png') }} height="150" width="150">
                    </td>
                    <td class="mt-0">
                        <div class="text-center">
                            <p>{{ Str::upper($institucion) }}</p>
                            <hr>
                            <p>{{ Str::upper($direccion) }}</p>
                            <p>{{ Str::upper($titulo) }}</p>

                        </div>
                    </td>
                </tr>
            </table>

            <!-- FIN ENCABEZADO -->

            <!-- CUERPO DEL SOPORTE -->
            <table style="width:100%; border: 1px solid black;">
                <tr>
                    <td>Dirección solicitante: </td>
                    <td>GESTIÓN DE FISCALIZACIÓN</td>
                    <td>ORDEN N°: 3456</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Forma de solicitud: </td>
                    <td>VERBAL</td>
                    <td>Escrito N°: MEMO No 456 HAP-GTIC-SA</td>
                    <td>BARRA DE CODIGO</td>
                </tr>
                <tr>
                    <td>Fecha de Inicio: </td>
                    <td> 13/03/2024 11:05:00</td>
                    <td>Fecha Finalización:</td>
                    <td> 13/03/2024 14:13:00</td>
                </tr>
                <tr>
                    <td>Tipo de Soporte: </td>
                    <td>SOPORTE A USUARIOS</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Incidente: </td>
                    <td></td>
                    <td>Código/Serie Activo: </td>
                    <td>007-001-003</td>
                </tr>
                <tr>
                    <td colspan="2">SE ME APAGO EL MONITOR Y CPU SE ME APAGO EL MONITOR Y CPU SE ME APAGO EL MONITOR
                        Y
                        CPU SE ME APAGO EL MONITOR Y CPU</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Diagnóstico: </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">SE PROCEDIÓ A SECAR EL COMPUTADOR CON UN VENTILADOR Y LUEGO SE CAMBIO EL MONITOR
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>
                    <td>.</td>

                </tr>
                <tr>
                    <td class="text-center" colspan="2">Recalde Solano Cristhian Andres</td>
                    <td class="text-center" colspan="2">Quiñonmez Tenorio Erika Lissette</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tecnico</td>
                    <td></td>
                    <td>Usuario</td>
                </tr>
            </table>
            <!-- FIN CUERPO DEL SOPORTE -->
        </div>
    </main>

</body>

</html>
