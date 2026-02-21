<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reporte de Equipos</title>
    <style>
        @page {
            size: a4 landscape;
            margin: 12mm 10mm 10mm 10mm;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 8.5pt;
            color: #1a1a2e;
            line-height: 1.3;
        }

        /* ─── HEADER ─────────────────────────────────────── */
        .header-wrapper {
            width: 100%;
            border-bottom: 3px solid #000000;
            padding-bottom: 8px;
            margin-bottom: 10px;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: middle;
            border: none;
            padding: 0;
        }

        .header-logo {
            width: 14%;
            text-align: center;
        }

        .header-logo img {
            max-width: 90px;
            height: auto;
        }

        .header-info {
            width: 72%;
            text-align: center;
            padding: 0 10px;
        }

        .header-info .institution {
            font-size: 9.5pt;
            font-weight: bold;
            color: #222222;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .header-info .report-title {
            font-size: 13pt;
            font-weight: bold;
            color: #1a1a2e;
            margin: 3px 0 2px;
        }

        .header-info .report-subtitle {
            font-size: 8pt;
            color: #555;
        }

        .header-meta {
            width: 14%;
            text-align: right;
        }

        .meta-box {
            border: 1px solid #bbbbbb;
            padding: 5px 8px;
            background: #f2f2f2;
        }

        .meta-box .meta-label {
            font-size: 6.5pt;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .meta-box .meta-value {
            font-size: 8pt;
            font-weight: bold;
            color: #222222;
        }

        /* ─── SUMMARY BAR ────────────────────────────────── */
        .summary-bar {
            width: 100%;
            background: #222222;
            color: #fff;
            padding: 4px 10px;
            margin-bottom: 8px;
        }

        .summary-bar span {
            font-size: 7.5pt;
            margin-right: 16px;
        }

        .summary-bar strong {
            font-size: 9pt;
        }

        /* ─── TABLE ──────────────────────────────────────── */
        .equipos-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
        }

        .equipos-table thead tr {
            background: #222222;
            color: #ffffff;
        }

        .equipos-table th {
            padding: 5px 4px;
            text-align: center;
            font-size: 7.5pt;
            font-weight: bold;
            border: 1px solid #000000;
            letter-spacing: 0.3px;
            text-transform: uppercase;
        }

        .equipos-table td {
            padding: 4px 5px;
            font-size: 7.5pt;
            border: 1px solid #bbbbbb;
            vertical-align: middle;
        }

        .equipos-table tbody tr:nth-child(even) {
            background-color: #eeeeee;
        }

        .equipos-table tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }

        .equipos-table tbody tr:last-child td {
            border-bottom: 2px solid #000000;
        }

        /* Column widths */
        .col-num {
            width: 3%;
            text-align: center;
        }

        .col-codigo {
            width: 10%;
            text-align: center;
        }

        .col-modelo {
            width: 12%;
        }

        .col-marca {
            width: 10%;
            text-align: center;
        }

        .col-serie {
            width: 14%;
        }

        .col-estado {
            width: 9%;
            text-align: center;
        }

        .col-custodio {
            width: 22%;
        }

        .col-dir {
            width: 20%;
        }

        /* ─── STATUS BADGE ───────────────────────────────── */
        .badge {
            display: inline-block;
            padding: 1px 6px;
            font-size: 7pt;
            font-weight: bold;
            color: #fff;
            text-align: center;
        }

        /* ─── EMPTY / NULL TEXT ──────────────────────────── */
        .text-muted {
            color: #aaa;
            font-style: italic;
            font-size: 7pt;
        }

        /* ─── FOOTER ─────────────────────────────────────── */
        .footer {
            width: 100%;
            border-top: 1px solid #c0c0e0;
            padding-top: 5px;
            margin-top: 4px;
        }

        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        .footer-table td {
            border: none;
            font-size: 6.5pt;
            color: #888;
            padding: 0;
        }

        .footer-right {
            text-align: right;
        }
    </style>
</head>

<body>

    @php
        $logoPath = public_path('/assets/images/LogoTransparente.png');
        $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
        $total = count($equipos);
        $fechaGen = date('d/m/Y', strtotime($current_fecha));
    @endphp

    {{-- ══ ENCABEZADO ══ --}}
    <div class="header-wrapper">
        <table class="header-table">
            <tr>
                <td class="header-logo">
                    <img src="{{ $logoBase64 }}" alt="Logo Institución" />
                </td>
                <td class="header-info">
                    <div class="institution">Gobierno Autónomo Descentralizado Provincial</div>
                    <div class="report-title">{{ $title }}</div>
                    <div class="report-subtitle">Departamento de Tecnologías de la Información y Comunicación</div>
                </td>
                <td class="header-meta">
                    <div class="meta-box">
                        <div class="meta-label">Fecha de emisión</div>
                        <div class="meta-value">{{ $fechaGen }}</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    {{-- ══ BARRA DE RESUMEN ══ --}}
    <div class="summary-bar">
        <span>Total de equipos: <strong>{{ $total }}</strong></span>
    </div>

    {{-- ══ TABLA DE EQUIPOS ══ --}}
    <table class="equipos-table">
        <thead>
            <tr>
                <th class="col-num">#</th>
                <th class="col-codigo">Código</th>
                <th class="col-modelo">Modelo</th>
                <th class="col-marca">Marca</th>
                <th class="col-serie">N° de Serie</th>
                <th class="col-estado">Estado</th>
                <th class="col-custodio">Custodio</th>
                <th class="col-dir">Dirección</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($equipos as $index => $equipo)
                @php
                    $color = !empty($equipo['color']) ? $equipo['color'] : '#6c757d';
                    $codNuevo = $equipo['codigo_nuevo'] ?? '—';
                    $codAntiguo = $equipo['codigo_antiguo'] ?? '';
                    $codigoLabel = $codNuevo !== '—' ? $codNuevo : ($codAntiguo ?: '—');
                @endphp
                <tr>
                    <td class="col-num" style="color:#999; font-size:6.5pt;">{{ $index + 1 }}</td>
                    <td class="col-codigo">
                        {{ $codigoLabel }}
                        @if ($codAntiguo && $codNuevo !== '—' && $codAntiguo !== $codNuevo)
                            <br><span style="font-size:6pt; color:#aaa;">{{ $codAntiguo }}</span>
                        @endif
                    </td>
                    <td class="col-modelo">{{ $equipo['modelo'] ?? '—' }}</td>
                    <td class="col-marca">{{ $equipo['nombre_marca'] ?? '—' }}</td>
                    <td class="col-serie" style="font-size:7pt; font-family: 'Courier New', monospace;">
                        {{ $equipo['numero_serie'] ?? '—' }}
                    </td>
                    <td class="col-estado">
                        <span class="badge" style="background-color: {{ $color }};">
                            {{ $equipo['nombre_estado'] ?? '—' }}
                        </span>
                    </td>
                    <td class="col-custodio">
                        @if (!empty($equipo['responsable']))
                            {{ Str::upper($equipo['responsable']) }}
                        @else
                            <span class="text-muted">SIN CUSTODIO</span>
                        @endif
                    </td>
                    <td class="col-dir">
                        @if (!empty($equipo['direccion']))
                            {{ $equipo['direccion'] }}
                        @else
                            <span class="text-muted">SIN DIRECCIÓN</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- ══ PIE DE PÁGINA ══ --}}
    <div class="footer">
        <table class="footer-table">
            <tr>
                <td>Sistema de Help Desk &mdash; Reporte generado automáticamente</td>
                <td class="footer-right">{{ $fechaGen }} &mdash; Total registros: {{ $total }}</td>
            </tr>
        </table>
    </div>

</body>

</html>
