<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ficha Vacaciones</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }

        body {
            font-family: Arial, sans-serif;
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 0.5px solid gray;
            /* Corrige el borde */
            table-layout: auto;
            /* Cambia a 'auto' para ajustar el ancho según el contenido */
            margin-bottom: 10px;
            margin-top: 10px;
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 12px;
            /* Borde para celdas */
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
            margin: 10 auto;
            width: 170px;
            height: auto;
        }

        hr {
            border: 0.5px solid gray;
            height: 0.2px;
            margin-top: 1%;
            margin-bottom: 0%;
        }

        .card {
            border: 0.5px solid gray;
            padding: 5px;
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
                <h4>{{ Str::upper($institucion) }}</h4>
                <hr>
                <h4>SOLICITUD DE LICENCIA, PERMISO Y VACACIONES <br> </h4>
            </td>
        </tr>
    </table>
    <div class="card">
        <div class="card-body">
            <table>
                <tr>
                    <td style="text-align: left; width: 25%;"><strong>APELLIDOS Y NOMBRES DEL FUNCIONARIO: </strong>
                    </td>
                    <td style="text-align: left; width: 40%;">{{ Str::upper($vacaciones->solicitante) }}</td>
                    <td style="text-align: left; width: 20%;"><strong>CODIGO DE SOLICITUD:</strong></td>
                    <td
                        style="text-align: left; width: 20%; background-color:#d2d6d9; padding:5px; border-radius:6px;"">
                        {{ $vacaciones->codigo_vacacion }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    @foreach ($motivos as $motivo)
                        <td style="width: 5%; text-align: center; vertical-align: middle;">
                            <input type="radio" id={{ (int) $motivo->id }} name="option"
                                value={{ (int) $motivo->id }} style="transform: scale(1.4);"
                                {{ (int) $motivo->id == (int) $vacaciones->motivo_id ? 'checked' : '' }} />
                        </td>
                        <td style="text-align: left; vertical-align: middle;">
                            <label for={{ (int) $motivo->id }}>{{ $motivo->motivo_vacaciones }}</label>
                        </td>
                        @if ($motivo->id % 3 == 0 && $motivo->id != 12)
                            <!-- Después de cada 3 opciones, crear una nueva fila -->
                </tr>
                <tr>
                    @endif
                    @endforeach
                </tr>
            </table>
            <table>
                <tr>
                    <td style="width: 25%; text-align: center; vertical-align: middle;"><strong>NUMERO DE DIAS QUE
                            SOLICITA:</strong></td>
                    <td
                        style="width: 25%; text-align: center; vertical-align: middle; background-color:#d2d6d9; padding:5px; border-radius:6px;"">
                        {{ $vacaciones->dias_solicitados }}</td>
                    <td style="width: 25%; text-align: center; vertical-align: middle;"><strong>DESDE: </strong></td>
                    <td
                        style="width: 25%; text-align: center; vertical-align: middle; background-color:#d2d6d9; padding:5px; border-radius:6px;"">
                        {{ \Carbon\Carbon::parse($vacaciones->fecha_inicio)->format('Y-m-d') }}
                    </td>
                    <td style="width: 25%; text-align: center; vertical-align: middle;"><strong>HASTA: </strong></td>
                    <td
                        style="width: 25%; text-align: center; vertical-align: middle; background-color:#d2d6d9; padding:5px; border-radius:6px;"">
                        {{ \Carbon\Carbon::parse($vacaciones->fecha_fin)->format('Y-m-d') }}
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><strong>DIA DE INGRESO A SUS LABORES</strong></td>
                    <td colspan="3" style="background-color:#d2d6d9; padding:5px; border-radius:6px;">
                        {{ \Carbon\Carbon::parse($vacaciones->fecha_retorno)->format('Y-m-d') }}</td>
                </tr>
                <tr>
                    <td colspan="3"><strong>ƒ: FIRMA DEL SOLICITANTE</strong></td>
                    <td colspan="3" style="text-align: center; vertical-align: middle;">
                        <strong>FECHA DE EMISION</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <input type="text" style="height: 40px; width: 95%;">
                        <strong style="font-size: 12px">{{ Str::upper($vacaciones->solicitante) }}</strong>
                    </td>
                    <td colspan="3"
                        style="text-align: center; vertical-align: middle; background-color:#d2d6d9; padding:5px; border-radius:6px;"">
                        <input type="text" style="height: 40px; width: 90%; background-color:#d2d6d9;" class="header"
                            value={{ \Carbon\Carbon::parse($vacaciones->fecha_solicitud)->format('Y-m-d') ?? \Carbon\Carbon::now()->format('Y-m-d') }}>
                        {{-- <strong style="font-size: 12px"></strong> --}}
                    </td>
                </tr>
            </table>
            <table border="1" cellspacing="0" cellpadding="5" style="width: 100%;">
                <tr>
                    <td style="width: 25%;">
                        <strong>ƒ: FIRMA JEFE DEPARTAMENTAL</strong>
                    </td>
                    <td colspan="2" style="text-align: center; width: 25%;">
                        <strong>JEFE DEPARTAMENTAL: </strong>
                    </td>
                </tr>
                <tr>
                    <td rowspan="3" style="width: 25%;">
                        <input type="text" style="height: 50px; width: 90%;">
                    </td>
                    <td colspan="2" style="text-align: center; width: 25%;">
                        {{ Str::upper($vacaciones->jefe) ?? '========' }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 25%;">
                        <label for="aceptado_j">ACEPTADO: </label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="aceptado_j" name="option" value="aceptado_j"
                            style="transform: scale(1.4);" />
                    </td>
                </tr>
                <tr>
                    <td style="width: 25%;">
                        <label for="negado_j">NEGADO: </label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="negado_j" name="option" value="negado_j"
                            style="transform: scale(1.4);" />
                    </td>
                </tr>
            </table>
            <table border="1" cellspacing="0" cellpadding="5" style="width: 100%;">
                <tr>
                    <td style="width: 25%;">
                        <strong>ƒ: FIRMA DIRECTOR</strong>
                    </td>
                    <td colspan="2" style="text-align: center; width: 25%;">
                        <strong>JEFE DEPARTAMENTAL: </strong>
                    </td>
                </tr>
                <tr>
                    <td rowspan="3" style="width: 25%;">
                        <input type="text" style="height: 50px; width: 90%;">
                    </td>
                    <td colspan="2" style="text-align: center; width: 25%;">
                        {{ Str::upper($vacaciones->director) ?? '========' }}
                    </td>
                </tr>
                <tr>
                    <td style="width: 25%;">
                        <label for="aceptado_dir">ACEPTADO: </label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="aceptado_dir" name="option" value="aceptado_dir"
                            style="transform: scale(1.4);" />
                    </td>
                </tr>
                <tr>
                    <td style="width: 25%;">
                        <label for="negado_dir">NEGADO: </label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="negado_dir" name="option" value="negado_dir"
                            style="transform: scale(1.4);" />
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td colspan="6"><strong>OBSERVACIONES:</strong></td>
                </tr>
                <tr>
                    <td colspan="6">
                        <textarea style="height: 40px;"></textarea>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td style="text-align: center; width: 30%;"><strong>PERSONA QUE ME REEMPLAZARA:</strong></td>
                    <td style="width: 70%;">
                        <input type="text" style="width: 90%; height: 20px;" value="{{ Str::upper($vacaciones->reemplazo) ?? '' }}" />
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td colspan="4" class="header"><strong>INFORME DE VACACIONES</strong></td>
                </tr>
                <tr>
                    <td style="text-align: center; width: 25%;"><strong>FECHA DE INGRESO: </strong></td>
                    <td style="text-align: center; width: 25%;">
                        <input type="text" style="width: 90%; height: 15px;" />
                    </td>
                    <td style="text-align: center; width: 25%;"><strong>TIENE DERECHO A: </strong></td>
                    <td style="text-align: center; width: 25%;">
                        <input type="text" style="width: 90%; height: 15px;" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center; width: 25%;"><strong>VACACACIONES CORRESPONDEN AL
                            PERIODO DE: </strong></td>
                    <td colspan="2" style="text-align: center; width: 25%;">
                        <input type="text" style="width: 90%; height: 15px;" />
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td colspan="4" style="text-align: center; width: 25%;">
                        <strong style="font-size: 10px">ƒ: DIRECCION DE TALENTO HUMANO</strong>
                    </td>
                    <td colspan="4" style="text-align: center; width: 25%;">
                        <strong style="font-size: 10px">ƒ: PREFECTURA</strong>
                    </td>
                </tr>
                <tr>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="aceptado_d" name="option" value="aceptado_d"
                            style="transform: scale(1.4);" />
                    </td>
                    <td style="text-align: left; vertical-align: middle;">
                        <label for="aceptado_d">ACEPTADO</label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="negado_d" name="option" value="negado_d"
                            style="transform: scale(1.4);" />
                    </td>
                    <td style="text-align: left; vertical-align: middle;">
                        <label for="negado_d">NEGADO</label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="aceptado_p" name="option" value="aceptado_p"
                            style="transform: scale(1.4);" />
                    </td>
                    <td style="text-align: left; vertical-align: middle;">
                        <label for="aceptado_p">ACEPTADO</label>
                    </td>
                    <td style="width: 5%; text-align: center; vertical-align: middle;">
                        <input type="radio" id="negado_p" name="option" value="negado_p"
                            style="transform: scale(1.4);" />
                    </td>
                    <td style="text-align: left; vertical-align: middle;">
                        <label for="negado_p">NEGADO</label>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center; width: 25%;">
                        <input type="text" style="height: 45px; width: 100%;">
                        <strong style="font-size: 12px"></strong>
                    </td>
                    <td colspan="4" style="text-align: center; width: 25%;">
                        <input type="text" style="height: 45px; width: 100%;">
                        <strong style="font-size: 12px"></strong>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>
