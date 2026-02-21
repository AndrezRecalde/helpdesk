<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Informe de Actividades por Servidor</title>
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
            max-width: 210px;
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

        /* ─── TABLA DE SOPORTES ──────────────────────── */
        .soportes-table {
            width: 100%;
            border-collapse: collapse;
            margin: 4px 0 14px;
            font-size: 8pt;
            table-layout: fixed;
        }

        .soportes-table thead tr {
            background: #888888;
            color: #ffffff;
        }

        .soportes-table th {
            padding: 5px 6px;
            text-align: center;
            font-size: 7.5pt;
            font-weight: bold;
            border: 1px solid #777;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .soportes-table td {
            padding: 5px 6px;
            font-size: 8pt;
            border: 1px solid #aaaaaa;
            vertical-align: top;
            overflow: hidden;
            word-wrap: break-word;
        }

        /* Estilos para contenido HTML dentro de celdas */
        .soportes-table td ul,
        .soportes-table td ol {
            margin: 2px 0;
            padding-left: 14px;
        }

        .soportes-table td li {
            margin: 1px 0;
            text-align: left;
        }

        .soportes-table td p {
            margin: 2px 0;
        }

        .soportes-table tbody tr:nth-child(even) {
            background-color: #eeeeee;
        }

        .soportes-table tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }

        .soportes-table tbody tr:last-child td {
            border-bottom: 2px solid #888;
        }

        .col-num {
            width: 8%;
            text-align: center;
            vertical-align: middle;
        }

        .col-fecha {
            width: 11%;
            text-align: center;
            vertical-align: middle;
            font-family: 'Courier New', monospace;
            font-size: 7.5pt;
        }

        .col-inc {
            width: 28%;
        }

        .col-sol {
            width: 34%;
        }

        .col-usr {
            width: 19%;
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
        $primero = $soportes->first();
    @endphp

    <div class="page-wrapper">

        {{-- ══ ENCABEZADO ══ --}}
        <div class="header">
            <img src="{{ $logoBase64 }}" alt="Logo Institución" />
            <div class="institution-name">Gobierno Autónomo Descentralizado Provincial de Esmeraldas</div>
            <div class="institution-name" style="font-size:8.5pt; font-weight:normal;">
                Gestión de Tecnologías de la Información y Comunicación
            </div>
            <div class="doc-title">Informe de Actividades por Servidor</div>
            <div class="institution-name" style="font-size:8.5pt; font-weight:normal;">{{ Str::upper($periodo) }}</div>
        </div>

        <hr class="divider">

        {{-- ══ INTRODUCCIÓN ══ --}}
        <p class="memo-body">
            Durante el período <strong>{{ Str::upper($periodo) }}</strong>, en mi rol de funcionario del
            Gobierno Autónomo Descentralizado de la Provincia de Esmeraldas, en la Gestión de Tecnologías
            de la Información y Comunicación (GTIC), yo, <strong>{{ $primero->tecnico }}</strong>,
            he llevado a cabo las siguientes actividades de soporte técnico.
        </p>

        {{-- ══ TABLA DE SOPORTES ══ --}}
        <div class="section-title">Detalle de actividades realizadas</div>

        <div class="summary-bar">
            Total de soportes registrados en el período: <strong>{{ $total }}</strong>
        </div>

        <table class="soportes-table">
            <thead>
                <tr>
                    <th class="col-num">N° Soporte</th>
                    <th class="col-fecha">Fecha</th>
                    <th class="col-inc">Actividad / Incidente</th>
                    <th class="col-sol">Solución</th>
                    <th class="col-usr">Usuario Final</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($soportes as $soporte)
                    <tr>
                        <td class="col-num" style="text-align:center;">{{ $soporte->numero_sop }}</td>
                        <td class="col-fecha">
                            {{ \Carbon\Carbon::parse($soporte->fecha_ini)->format('Y-m-d') }}
                        </td>
                        <td class="col-inc">{{ $soporte->incidente }}</td>
                        <td class="col-sol">{!! $soporte->solucion !!}</td>
                        <td class="col-usr">{{ Str::upper($soporte->usuario_recibe ?? '—') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <p class="closing">Atentamente,</p>

        {{-- ══ FIRMAS ══ --}}
        <table class="firmas-table">
            <tr>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $primero->tecnico }}</div>
                    <div class="sig-cargo">{{ $primero->cargo_tecnico }}</div>
                </td>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $jefe_departamento->jefe }}</div>
                    <div class="sig-cargo">{{ $jefe_departamento->cargo_jefe }}</div>
                </td>
            </tr>
        </table>

    </div>{{-- /page-wrapper --}}

</body>

</html>
