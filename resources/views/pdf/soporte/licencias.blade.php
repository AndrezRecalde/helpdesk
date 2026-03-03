<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>GTIC — Reporte de Instalación de Licencias</title>
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
            font-size: 9.5pt;
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
            margin-bottom: 14px;
            padding-bottom: 8px;
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
        }

        .institution-sub {
            font-size: 8.5pt;
            color: #444;
            margin-top: 1px;
        }

        .doc-title {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            color: #111;
            letter-spacing: 0.5px;
            margin-top: 4px;
        }

        /* ─── DATOS DEL DOCUMENTO ────────────────────── */
        .doc-meta {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 8.5pt;
        }

        .doc-meta td {
            padding: 2px 0;
            border: none;
            vertical-align: top;
        }

        .meta-label {
            width: 70px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .meta-sep {
            width: 8px;
            font-weight: bold;
        }

        /* ─── SEPARADOR ──────────────────────────────── */
        .divider {
            border: none;
            border-top: 1px solid #bbb;
            margin: 6px 0 10px;
        }

        /* ─── SECCIÓN TITLE ──────────────────────────── */
        .section-title {
            background: #555555;
            color: #ffffff;
            padding: 5px 10px;
            font-size: 9pt;
            font-weight: bold;
            margin: 12px 0 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* ─── TABLAS DE DATOS ────────────────────────── */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
            font-size: 7.5pt;
            table-layout: fixed;
        }

        table.data-table thead tr {
            background: #888888;
            color: #ffffff;
        }

        table.data-table th {
            padding: 5px 6px;
            text-align: center;
            font-size: 7pt;
            font-weight: bold;
            border: 1px solid #777;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        table.data-table th:first-child {
            text-align: left;
        }

        table.data-table td {
            padding: 4px 6px;
            border: 1px solid #aaaaaa;
            font-size: 7.5pt;
            vertical-align: middle;
        }

        table.data-table td:first-child {
            text-align: left;
        }

        table.data-table td:not(:first-child) {
            text-align: center;
        }

        table.data-table tbody tr:nth-child(odd) {
            background-color: #f5f5f5;
        }

        table.data-table tbody tr:nth-child(even) {
            background-color: #ffffff;
        }

        table.data-table tbody tr:last-child td {
            border-bottom: 2px solid #888;
        }

        /* ─── FIRMAS ─────────────────────────────────── */
        .firmas-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 36px;
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
    @endphp

    <div class="page-wrapper">

        {{-- ══ ENCABEZADO ══ --}}
        <div class="header">
            <img src="{{ $logoBase64 }}" alt="Logo Institución" />
            <div class="institution-name">Gobierno Autónomo Descentralizado Provincial de Esmeraldas</div>
            <div class="institution-sub">Gestión de Tecnologías de la Información y Comunicación</div>
            <div class="doc-title">Reporte de Licencias de Software Instaladas</div>
        </div>

        {{-- ══ META ══ --}}
        <table class="doc-meta">
            <tr>
                <td class="meta-label">Generado</td>
                <td class="meta-sep">:</td>
                <td>{{ Str::upper('Esmeraldas, ' . Carbon\Carbon::now()->format('Y-m-d H:i')) }}</td>
            </tr>
            <tr>
                <td class="meta-label">Responsable</td>
                <td class="meta-sep">:</td>
                <td><strong>{{ Str::upper($usuarioGenerador->nmbre_usrio) }}</strong>
                    — <em>{{ $usuarioGenerador->cargo->nombre_cargo ?? 'TÉCNICO DE SOPORTE' }}</em></td>
            </tr>
        </table>

        <hr class="divider">

        <div class="section-title">Detalle de Instalaciones {{ $instalaciones[0]->licencia->nombre }}</div>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width:12%;">Fecha Instal.</th>
                    <th style="width:13%;">Cód. Equipo</th>
                    <th style="width:25%;">Custodio</th>
                    <th style="width:14%;">Contrato</th>
                    <th style="width:16%;">Licencia</th>
                    <th style="width:12%;">Vencimiento</th>
                    <th style="width:8%;">No. Sop.</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($instalaciones as $row)
                    <tr>
                        <td>{{ Carbon\Carbon::parse($row->fecha_instalacion)->format('Y-m-d') }}</td>
                        <td>{{ $row->equipo ? $row->equipo->codigo_nuevo : 'N/A' }}</td>
                        <td>{{ $row->equipo && $row->equipo->usuario ? $row->equipo->usuario->nmbre_usrio : 'N/A' }}
                        </td>
                        <td>{{ $row->licencia && $row->licencia->contrato ? $row->licencia->contrato->codigo_contrato : 'N/A' }}
                        </td>
                        <td>{{ $row->licencia ? $row->licencia->nombre : 'N/A' }}</td>
                        <td>{{ $row->licencia ? Carbon\Carbon::parse($row->licencia->fecha_vencimiento)->format('Y-m-d') : 'N/A' }}
                        </td>
                        <td>{{ $row->soporte ? $row->soporte->numero_sop : 'N/A' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- ══ FIRMAS ══ --}}
        <table class="firmas-table">
            <tr>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $usuarioGenerador->nmbre_usrio }}</div>
                    <div class="sig-cargo">{{ $usuarioGenerador->cargo->nombre_cargo ?? 'TÉCNICO DE SOPORTE' }}</div>
                </td>
                <td>
                    <div style="height: 42px;"></div>
                    <!-- Sin segunda firma, o firma del director en el futuro -->
                </td>
            </tr>
        </table>

    </div>{{-- /page-wrapper --}}

</body>

</html>
