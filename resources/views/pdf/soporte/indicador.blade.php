<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>GTIC — Reporte de Indicadores</title>
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

        .subsection-title {
            background-color: #dddddd;
            color: #111111;
            padding: 4px 10px;
            font-size: 8.5pt;
            font-weight: bold;
            margin: 8px 0 4px;
            border-left: 3px solid #555555;
        }

        /* ─── METRIC BOX ─────────────────────────────── */
        .metric-box {
            background: #eeeeee;
            border-left: 4px solid #555555;
            padding: 8px 12px;
            margin: 6px 0;
            font-size: 9pt;
        }

        .metric-value {
            font-weight: bold;
            font-size: 12pt;
            color: #111;
        }

        .metric-label {
            color: #444;
        }

        /* ─── TABLAS DE DATOS ────────────────────────── */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
            font-size: 8pt;
            table-layout: fixed;
        }

        table.data-table thead tr {
            background: #888888;
            color: #ffffff;
        }

        table.data-table th {
            padding: 5px 6px;
            text-align: center;
            font-size: 7.5pt;
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
            font-size: 8pt;
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

        .percentage-value {
            font-weight: bold;
            color: #111;
        }

        .font-bold {
            font-weight: bold;
        }

        /* ─── RESUMEN BAR ────────────────────────────── */
        .summary-bar {
            width: 100%;
            background: #888888;
            color: #fff;
            padding: 3px 8px;
            margin-bottom: 6px;
            font-size: 7.5pt;
        }

        /* ─── GRÁFICOS ───────────────────────────────── */
        .chart-container {
            text-align: center;
            margin: 10px 0;
        }

        .chart-container img {
            max-width: 100%;
            height: auto;
            border: 1px solid #cccccc;
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
        $diasHabiles = $sumaDiasHabiles[0]->dias_habiles ?? 0;
        $promCalif = $promedioCalificacion[0]->promedio ?? 0;
        $casosFinalizados = $desempenoForEstados[3]->total_estados ?? 0;
        $cumplimientoMeta = $diasHabiles > 0 ? round(($casosFinalizados / 30 / $diasHabiles) * 100, 2) : 0;
    @endphp

    <div class="page-wrapper">

        {{-- ══ ENCABEZADO ══ --}}
        <div class="header">
            <img src="{{ $logoBase64 }}" alt="Logo Institución" />
            <div class="institution-name">Gobierno Autónomo Descentralizado Provincial de Esmeraldas</div>
            <div class="institution-sub">Gestión de Tecnologías de la Información y Comunicación</div>
            <div class="doc-title">Reporte General de Indicadores</div>
        </div>

        {{-- ══ META ══ --}}
        <table class="doc-meta">
            <tr>
                <td class="meta-label">Período</td>
                <td class="meta-sep">:</td>
                <td>{{ Str::upper($periodo) }}</td>
            </tr>
            <tr>
                <td class="meta-label">Generado</td>
                <td class="meta-sep">:</td>
                <td>{{ Str::upper('Esmeraldas, ' . $current_fecha) }}</td>
            </tr>
            <tr>
                <td class="meta-label">Responsable</td>
                <td class="meta-sep">:</td>
                <td><strong>{{ Str::upper($usuarioGenerador->generador) }}</strong>
                    — <em>{{ $usuarioGenerador->cargo_generador }}</em></td>
            </tr>
        </table>

        <hr class="divider">

        {{-- ══ A. EFICIENCIA ══ --}}
        <div class="section-title">A. Eficiencia de Desempeño de Actividades</div>

        <div class="metric-box">
            <span class="metric-value">{{ $sumaDesempenoForEstados }}</span>
            <span class="metric-label"> casos totales registrados en el período analizado</span>
        </div>

        <div class="summary-bar">Distribución por estado de casos</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width:55%;">Detalle de los Casos</th>
                    <th style="width:22%;">Total</th>
                    <th style="width:23%;">Porcentaje</th>
                </tr>
            </thead>
            <tbody>
                @foreach ([3, 2, 1, 4, 0] as $i)
                    @if (isset($desempenoForEstados[$i]))
                        <tr>
                            <td>
                                @if ($i === 2)
                                    Casos Sin Cerrar
                                @else
                                    Casos {{ $desempenoForEstados[$i]->estado }}
                                @endif
                            </td>
                            <td>{{ $desempenoForEstados[$i]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                            <td class="percentage-value">
                                {{ $sumaDesempenoForEstados > 0
                                    ? round(($desempenoForEstados[$i]->total_estados / $sumaDesempenoForEstados) * 100, 2)
                                    : 0 }}%
                            </td>
                        </tr>
                    @endif
                @endforeach
            </tbody>
        </table>

        <div class="subsection-title">Distribución de Casos por Área</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Área</th>
                    <th>Sin Resolver</th>
                    <th>Sin Cerrar</th>
                    <th>Finalizados</th>
                    <th>Anulados</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($desempenoForAreas as $da)
                    <tr>
                        <td>{{ $da->area_tic }}</td>
                        <td>{{ $da->total_asignados }}</td>
                        <td>{{ $da->total_atendidos }}</td>
                        <td>{{ $da->total_finalizados }}</td>
                        <td>{{ $da->total_anuladas }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="subsection-title">Distribución de Casos por Técnico</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Técnico</th>
                    <th>Sin Resolver</th>
                    <th>Sin Cerrar</th>
                    <th>Finalizados</th>
                    <th>Anulados</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($desempenoForTecnicos as $dt)
                    <tr>
                        <td>{{ $dt->tecnico }}</td>
                        <td>{{ $dt->total_asignados }}</td>
                        <td>{{ $dt->total_atendidos }}</td>
                        <td>{{ $dt->total_finalizados }}</td>
                        <td>{{ $dt->total_anulados }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- ══ B. EFECTIVIDAD ══ --}}
        <div class="section-title">B. Calidad de la Efectividad en la Atención</div>

        <div class="subsection-title">Efectividad por Áreas</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Área</th>
                    <th>Total Asistencia</th>
                    <th>Promedio</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($efectividadForAreas as $ea)
                    <tr>
                        <td>{{ $ea->area_tic }}</td>
                        <td>{{ $ea->total_asistencia }}</td>
                        <td class="percentage-value">{{ $ea->total_promedio }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="subsection-title">Efectividad por Técnicos</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Técnico</th>
                    <th>Total Asistencia</th>
                    <th>Promedio</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($efectividadForTecnicos as $et)
                    <tr>
                        <td>{{ $et->tecnico }}</td>
                        <td>{{ $et->total_asistencia }}</td>
                        <td class="percentage-value">{{ $et->total_promedio }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- ══ C. EFICACIA ══ --}}
        <div class="section-title">C. Eficacia en el Cumplimiento de Metas</div>

        <div class="metric-box">
            <span class="metric-label">Cumplimiento de Meta: </span>
            <span class="metric-value">{{ $cumplimientoMeta }}%</span>
            <span class="metric-label"> (Meta: 30 casos/día · {{ $diasHabiles }} días hábiles)</span>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width:65%;">Indicador</th>
                    <th style="width:35%;">Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Meta Diaria de Atención</td>
                    <td class="font-bold">30 casos</td>
                </tr>
                <tr>
                    <td>Casos Finalizados en el Período</td>
                    <td class="font-bold">{{ $casosFinalizados }}</td>
                </tr>
                <tr>
                    <td>Días Hábiles Evaluados</td>
                    <td class="font-bold">{{ $diasHabiles }} días</td>
                </tr>
                <tr>
                    <td>Satisfacción de Usuarios (calificación promedio)</td>
                    <td class="font-bold percentage-value">{{ $promCalif }} / 5.0</td>
                </tr>
            </tbody>
        </table>

        {{-- ══ FIRMAS ══ --}}
        <table class="firmas-table">
            <tr>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $usuarioGenerador->generador }}</div>
                    <div class="sig-cargo">{{ $usuarioGenerador->cargo_generador }}</div>
                </td>
                <td>
                    <div style="height: 42px;"></div>
                    <div class="sig-line"></div>
                    <div class="sig-name">{{ $usuarioGenerador->director }}</div>
                    <div class="sig-cargo">{{ $usuarioGenerador->cargo_director }}</div>
                </td>
            </tr>
        </table>

    </div>{{-- /page-wrapper --}}

    {{-- ══ GRÁFICOS (páginas separadas) ══ --}}
    @if (!empty($chartTecnicosImage))
        <div style="page-break-before: always;">
            <div class="page-wrapper">
                <div class="section-title">Gráfico: Desempeño por Técnicos</div>
                <div class="chart-container">
                    <img src="{{ $chartTecnicosImage }}" alt="Gráfico Técnicos">
                </div>
            </div>
        </div>
    @endif

    @if (!empty($chartAreasImage))
        <div style="page-break-before: always;">
            <div class="page-wrapper">
                <div class="section-title">Gráfico: Desempeño por Áreas Técnicas</div>
                <div class="chart-container">
                    <img src="{{ $chartAreasImage }}" alt="Gráfico Áreas">
                </div>
            </div>
        </div>
    @endif

</body>

</html>
