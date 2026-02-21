<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Informe de Actividades Laborales</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 10pt;
            color: #111111;
            line-height: 1.5;
            background-image: url({{ public_path('/assets/images/FondoArchivo.png') }});
            background-repeat: no-repeat;
            background-size: cover;
        }

        .page-wrapper {
            padding: 10mm 10mm 10mm 10mm;
        }

        /* ─── ENCABEZADO ─────────────────────────────── */
        .header {
            text-align: center;
            margin-bottom: 16px;
            padding-bottom: 10px;
        }

        .header img {
            max-width: 250px;
            height: auto;
            margin-bottom: 5px;
        }

        .institution-name {
            font-size: 10pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #222;
            margin-bottom: 2px;
        }

        .doc-title {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            color: #111;
            letter-spacing: 0.5px;
            margin-top: 4px;
        }

        /* ─── BLOQUE DE DATOS ────────────────────────── */
        .memo-data {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
            font-size: 9.5pt;
        }

        .memo-data td {
            border: none;
            padding: 3px 0;
            vertical-align: top;
        }

        .memo-label {
            width: 80px;
            font-weight: bold;
            text-transform: uppercase;
            color: #111;
            padding-right: 6px;
        }

        .memo-sep {
            width: 8px;
            font-weight: bold;
        }

        .memo-value {
            color: #111;
        }

        .memo-value em {
            font-size: 8.5pt;
            color: #444;
        }

        /* ─── SEPARADOR ──────────────────────────────── */
        .divider {
            border: none;
            border-top: 1px solid #bbb;
            margin: 8px 0 10px;
        }

        /* ─── CUERPO ─────────────────────────────────── */
        .memo-body {
            font-size: 9.5pt;
            line-height: 1.7;
            text-align: justify;
            margin-bottom: 10px;
        }

        .section-title {
            font-size: 9.5pt;
            font-weight: bold;
            text-transform: uppercase;
            color: #111;
            margin: 12px 0 6px;
            letter-spacing: 0.3px;
        }

        /* ─── TABLA DE ACTIVIDADES ───────────────────── */
        .actividades-table {
            width: 100%;
            border-collapse: collapse;
            margin: 4px 0 14px;
            font-size: 8.5pt;
            table-layout: fixed;
        }

        .actividades-table thead tr {
            background: #888888;
            color: #ffffff;
        }

        .actividades-table th {
            padding: 5px 6px;
            text-align: center;
            font-size: 8pt;
            font-weight: bold;
            border: 1px solid #777;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .actividades-table td {
            padding: 5px 6px;
            font-size: 8.5pt;
            border: 1px solid #aaaaaa;
            vertical-align: top;
            overflow: hidden;
            word-wrap: break-word;
        }

        /* Estilos para contenido HTML dentro de celdas (listas, etc.) */
        .actividades-table td ul,
        .actividades-table td ol {
            margin: 2px 0;
            padding-left: 16px;
        }

        .actividades-table td li {
            margin: 1px 0;
            text-align: left;
        }

        .actividades-table td p {
            margin: 2px 0;
            text-align: justify;
        }

        .actividades-table td strong,
        .actividades-table td b {
            font-weight: bold;
        }

        .actividades-table td em,
        .actividades-table td i {
            font-style: italic;
        }

        .actividades-table tbody tr:nth-child(even) {
            background-color: #eeeeee;
        }

        .actividades-table tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }

        .actividades-table tbody tr:last-child td {
            border-bottom: 2px solid #888;
        }

        .col-fecha {
            width: 12%;
            text-align: center;
            vertical-align: middle;
            font-family: 'Courier New', monospace;
            font-size: 8pt;
        }

        .col-act {
            width: 88%;
            text-align: justify;
        }

        /* ─── CONCLUSIÓN ─────────────────────────────── */
        .conclusion-box {
            //border-left: 3px solid #888888;
            padding: 6px 10px;
            margin: 4px 0 14px;
            font-size: 9pt;
            text-align: justify;
            line-height: 1.6;
        }

        /* ─── RESUMEN ────────────────────────────────── */
        .summary-bar {
            width: 100%;
            background: #888888;
            color: #fff;
            padding: 3px 8px;
            margin-bottom: 8px;
            font-size: 7.5pt;
        }

        /* ─── FIRMAS ─────────────────────────────────── */
        .closing {
            font-size: 9.5pt;
            margin-top: 8px;
            margin-bottom: 6px;
        }

        .firmas-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 40px;
        }

        .firmas-table td {
            width: 50%;
            vertical-align: top;
            text-align: center;
            border: none;
            padding: 0 10px;
        }

        .sig-line {
            border-top: 1px solid #000;
            margin: 0 auto 4px;
            width: 180px;
        }

        .sig-name {
            font-size: 9pt;
            font-weight: bold;
            text-transform: uppercase;
        }

        .sig-cargo {
            font-size: 8pt;
            color: #333;
            text-transform: uppercase;
        }
    </style>
</head>

<body>

    @php
        $logoPath = public_path('/assets/images/LogoTransparente.png');
        $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
        $primera = $actividades->first();
        $esGAD = $primera->id_empresa === 2;
    @endphp

    <div class="page-wrapper">

        {{-- ══ ENCABEZADO ══ --}}
        <div class="header">
            <img src="{{ $logoBase64 }}" alt="Logo Institución" />
            <div class="institution-name">
                @if ($esGAD)
                    Gobierno Autónomo Descentralizado Provincial de Esmeraldas
                @else
                    Unidad de Asistencia Médica y Desarrollo Social y Cultural
                @endif
            </div>
            <div class="doc-title">Informe de Actividades Laborales</div>
        </div>

        {{-- ══ DATOS ══ --}}
        <table class="memo-data">
            <tr>
                <td class="memo-label">De</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">
                    <strong>{{ Str::upper($primera->usuario) }}</strong>
                </td>
            </tr>
            <tr>
                <td class="memo-label">Para</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">
                    <strong>{{ Str::upper($primera->director) }}</strong>
                    <br>
                    @if ($primera->crgo_id !== 5)
                        @if (strcasecmp($primera->cargo_director, 'PREFECTO/A') === 0)
                            <em>{{ $primera->cargo_director }} PROVINCIAL</em>
                        @else
                            <em>{{ $primera->cargo_director }} DE {{ $primera->departamento }}</em>
                        @endif
                    @endif
                </td>
            </tr>
            <tr>
                <td class="memo-label">Período</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">{{ Str::upper($periodo) }}</td>
            </tr>
            <tr>
                <td class="memo-label">Asunto</td>
                <td class="memo-sep">:</td>
                <td class="memo-value"><strong>INFORME DE ACTIVIDADES LABORALES</strong></td>
            </tr>
            <tr>
                <td class="memo-label">Fecha</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">{{ Str::upper('Esmeraldas, ' . $current_fecha) }}</td>
            </tr>
        </table>

        <hr class="divider">

        {{-- ══ INTRODUCCIÓN ══ --}}
        <p class="memo-body">
            Por medio del presente informe, presento un resumen de las actividades realizadas durante el período
            <strong>{{ Str::upper($periodo) }}</strong> en el área de <strong>{{ $primera->departamento }}</strong>.
            Este documento tiene como propósito brindar un registro detallado de las actividades efectuadas,
            los logros alcanzados y las tareas que contribuyen al cumplimiento de los objetivos institucionales.
        </p>

        {{-- ══ TABLA DE ACTIVIDADES ══ --}}
        <div class="section-title">Detalle de actividades realizadas</div>

        <div class="summary-bar">
            Total de actividades registradas: <strong>{{ $total }}</strong>
        </div>

        <table class="actividades-table">
            <thead>
                <tr>
                    <th class="col-fecha">Fecha</th>
                    <th class="col-act">Descripción de la Actividad</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($actividades as $index => $actividad)
                    <tr>
                        <td class="col-fecha">{{ $actividad->current_fecha }}</td>
                        <td class="col-act">{!! $actividad->actividad !!}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- ══ CONCLUSIÓN ══ --}}
        <div class="section-title">Conclusión</div>
        <div class="conclusion-box">
            Durante el período <strong>{{ Str::upper($periodo) }}</strong>, se llevaron a cabo las actividades
            programadas, contribuyendo significativamente al desarrollo de los proyectos en curso y al
            cumplimiento de los objetivos establecidos por el área de <strong>{{ $primera->departamento }}</strong>.
            Las acciones implementadas han permitido mejorar la eficiencia y fortalecer la colaboración dentro
            del equipo.
        </div>

        <p class="closing">Atentamente,</p>

        {{-- ══ FIRMAS ══ --}}
        <table class="firmas-table">
            <tr>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $primera->usuario }}</div>
                    <div class="sig-cargo">{{ $primera->cargo_usuario }}</div>
                </td>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">
                        {{ $primera->crgo_id === 5 ? 'Sampietro Fernandez Gigliola Antonella' : $primera->director }}
                    </div>
                    <div class="sig-cargo">
                        {{ $primera->crgo_id === 5 ? 'DIRECTOR/A' : $primera->cargo_director }}
                    </div>
                </td>
            </tr>
        </table>

    </div>{{-- /page-wrapper --}}

</body>

</html>
