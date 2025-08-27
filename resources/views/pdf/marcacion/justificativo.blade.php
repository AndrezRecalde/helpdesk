<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet"> --}}
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 30px;
        }

        body {
            font-family: "DejaVu Sans", sans-serif;
            font-size: 14px;
            background-image: url("http://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
        }

        .logo {
            width: 100px;
        }

        h3,
        h6 {
            margin: 5px 0;
            /* Reduce la separación entre h3 y h6 */
        }

        h3 {
            font-size: 18px;
            font-weight: bold;
        }

        h6 {
            font-size: 14px;
            font-weight: normal;
        }

        p {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 5px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 13px;
        }

        .table th,
        .table td {
            border: 1px solid black;
            padding: 6px;
            text-align: left;
            font-size: 12px;
        }

        .signature {
            margin-top: 40px;
            text-align: left;
        }

        .signature div {
            display: inline-block;
            width: 90%;
        }

        .small-text {
            font-size: 12px;
        }

        .signature p {
            margin: 2px 0;
            /* Reduce el espacio arriba y abajo */
            line-height: 1.2;
            /* Ajusta la altura de línea si es necesario */
        }

        .info p {
            margin: 2px 0;
            /* Reduce el espacio arriba y abajo */
            line-height: 1.2;
            /* Ajusta la altura de línea si es necesario */
            font-size: 12px;
        }

        .lista-fechas {
            margin: 8px 0 10px 18px;
            font-size: 14px;
        }

        .lista-fechas li {
            margin: 4px 0;
        }
    </style>
    <title>Justificativo</title>
</head>

<body>
    <div class="header">
        <img class="img-fluid" alt="Logo del GAD Esmeraldas" src="{{ public_path('/assets/images/LogoTransparente.png') }}"
            height="100" width="320">
        <h3>MEMORANDO No. {{ $numero_memorando }}
            GADPE-{{ $info_usuario->acronimo }}-{{ \Carbon\Carbon::parse($fecha_actual)->format('Y') }}</h3>
        <h6>Esmeraldas, {{ \Carbon\Carbon::parse($fecha_actual)->translatedFormat('d \\de F \\de Y') }}</h6>
    </div>
    <br>
    <table>
        <tr>
            <td style="width: 80px;"><strong>PARA:</strong></td>
            <td>{{ Str::upper($info_jefe_tthh->jefe) }}</td>
        </tr>
        <tr>
            <td style="width: 80px;"></td>
            <td><strong><i>DIRECTOR/A DE GESTIÓN DE TALENTO HUMANO</i></strong></td>
        </tr>
    </table>
    <table>
        <tr>
            <td style="width: 80px;"><strong>ASUNTO:</strong></td>
            <td>{{ $asunto }}</td>
        </tr>
    </table>

    <p>
        Por medio del presente me permito informar que, debido a inconvenientes presentados con el sistema biométrico
        institucional, no se registraron de manera adecuada mis marcaciones en las siguiente(s)
        fecha(s):
    </p>
    @if (!empty($fechas))
        <ul class="lista-fechas">
            @foreach ($fechas as $item)
                <li>
                    {{ \Carbon\Carbon::parse($item)->translatedFormat('d \\de F \\de Y') }}
                </li>
            @endforeach
        </ul>
    @else
        <p><em>(Detalle las fechas y horarios no registrados.)</em></p>
    @endif
    <p>
        Con el objetivo de respaldar mi permanencia dentro de la institución en los horarios mencionados, me permito
        justificar dichas marcaciones a través de la verificación correspondiente en las cámaras de seguridad instaladas
        en las instalaciones.
    </p>
    <p>
        En la siguiente página se adjuntan los anexos con las evidencias visuales, donde se puede constatar mi presencia
        en los horarios señalados, con el fin de garantizar la transparencia y veracidad de lo expuesto en este informe.
    </p>
    <br>
    <br>
    <div class="signature">
        <div>
            <p>_____________________________</p>
            <p>{{ $info_jefe_departamento->jefe }}</p>
            <p><strong>{{ $info_jefe_departamento->cargo_jefe . ' DE ' . $info_jefe_departamento->nmbre_dprtmnto }}</strong></p>
        </div>
    </div>
</body>

</html>
