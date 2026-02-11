<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>GTIC - Indicadores</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 15mm;
        }

        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            color: #1a1a1a;
            line-height: 1.6;
            font-size: 10pt;
            margin: 0;
            padding: 0;
        }

        /* HEADER STYLES */
        .document-header {
            width: 100%;
            border: 2px solid #000000;
            border-collapse: collapse;
            //margin-bottom: 10px;
            background-color: #ffffff;
        }

        .document-header td {
            padding: 12px;
            vertical-align: middle;
            border: none;
        }

        .logo-cell {
            width: 20%;
            text-align: center;
            border-right: 1px solid #cccccc;
        }

        .logo-img {
            max-width: 100px;
            height: auto;
        }

        .header-info-cell {
            width: 80%;
            padding-left: 15px;
        }

        .header-title {
            font-size: 10pt;
            font-weight: 600;
            color: #333333;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .header-subtitle {
            font-size: 12pt;
            font-weight: 700;
            color: #000000;
            margin: 5px 0;
            line-height: 1.2;
        }

        .header-period {
            font-size: 8pt;
            color: #666666;
            margin-top: 5px;
            font-weight: 500;
        }

        .header-period strong {
            color: #1a1a1a;
        }

        /* SECTION STYLES */
        .section {
            margin-bottom: 10px;
            //page-break-inside: avoid;
        }

        .section-title {
            background: linear-gradient(135deg, #333333 0%, #1a1a1a 100%);
            color: #ffffff;
            padding: 12px 18px;
            font-size: 11pt;
            font-weight: 700;
            margin-bottom: 15px;
            border-radius: 5px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subsection-title {
            background-color: #e8e8e8;
            color: #1a1a1a;
            padding: 10px 15px;
            font-size: 10pt;
            font-weight: 700;
            margin: 20px 0 12px 0;
            border-left: 4px solid #333333;
            border-radius: 3px;
        }

        /* TABLE STYLES */
        table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border: 1px solid #cccccc;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        table.data-table thead {
            background-color: #e0e0e0;
        }

        table.data-table th {
            color: #000000;
            padding: 12px 10px;
            text-align: center;
            font-size: 9pt;
            font-weight: 700;
            border: 1px solid #cccccc;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        table.data-table th:first-child {
            text-align: left;
            padding-left: 15px;
        }

        table.data-table td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 9pt;
            vertical-align: middle;
        }

        table.data-table td:first-child {
            font-weight: 500;
            color: #1a1a1a;
            padding-left: 15px;
        }

        table.data-table td:not(:first-child) {
            text-align: center;
            color: #4a4a4a;
        }

        table.data-table tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
        }

        table.data-table tbody tr:nth-child(even) {
            background-color: #ffffff;
        }

        table.data-table tbody tr:hover {
            background-color: #f0f0f0;
        }

        table.data-table tbody tr:last-child td {
            border-bottom: none;
        }

        /* METRIC BOX */
        .metric-box {
            background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
            border-left: 5px solid #000000;
            padding: 15px 20px;
            margin: 15px 0;
            font-size: 10pt;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .metric-box .metric-value {
            font-weight: 700;
            color: #000000;
            font-size: 13pt;
        }

        .metric-box .metric-label {
            color: #4a4a4a;
            font-weight: 400;
        }

        /* SIGNATURE SECTION */
        .signature-table {
            width: 100%;
            margin-top: 40px;
            border-collapse: collapse;
            border-top: 2px solid #000000;
            padding-top: 20px;
        }

        .signature-table td {
            width: 50%;
            padding: 20px 30px;
            text-align: center;
            vertical-align: top;
        }

        .signature-label {
            font-size: 9pt;
            font-weight: 600;
            color: #333333;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }

        .signature-space {
            height: 60px;
            border-bottom: 2px solid #1a1a1a;
            margin: 15px 20px;
        }

        .signature-name {
            font-weight: 700;
            color: #000000;
            font-size: 10pt;
            margin-top: 10px;
        }

        .signature-position {
            color: #666666;
            font-size: 9pt;
            font-weight: 400;
            margin-top: 5px;
        }

        /* UTILITY CLASSES */
        .font-bold {
            font-weight: 700;
        }

        .percentage-value {
            font-weight: 600;
            color: #000000;
        }
    </style>
</head>

<body>
    <!-- HEADER -->
    <table class="document-header">
        <tr>
            <td class="logo-cell">
                <img class="logo-img" alt="Logo GTIC" src="{{ public_path('/assets/images/LogoCompleto.png') }}">
            </td>
            <td class="header-info-cell">
                <div class="header-title">{{ Str::upper($direccion) }}</div>
                <div class="header-subtitle">{{ Str::upper($titulo) }}</div>
                <div class="header-period"><strong>Período:</strong> {{ $fecha_inicio }} al {{ $fecha_fin }}</div>
            </td>
        </tr>
    </table>

    <!-- A. EFICIENCIA -->
    <div class="section">
        <div class="section-title">A. Eficiencia de Desempeño de Actividades</div>
        
        <div class="metric-box">
            <span class="metric-value">{{ $sumaDesempenoForEstados }}</span>
            <span class="metric-label"> casos totales registrados en el período analizado</span>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Detalle de los Casos</th>
                    <th style="width: 25%;">Total de Casos</th>
                    <th style="width: 25%;">Porcentaje</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Casos {{ $desempenoForEstados[3]->estado }}</td>
                    <td>{{ $desempenoForEstados[3]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                    <td class="percentage-value">{{ round(($desempenoForEstados[3]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
                <tr>
                    <td>Casos Sin Cerrar</td>
                    <td>{{ $desempenoForEstados[2]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                    <td class="percentage-value">{{ round(($desempenoForEstados[2]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
                <tr>
                    <td>Casos {{ $desempenoForEstados[1]->estado }}</td>
                    <td>{{ $desempenoForEstados[1]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                    <td class="percentage-value">{{ round(($desempenoForEstados[1]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
                <tr>
                    <td>Casos {{ $desempenoForEstados[4]->estado }}</td>
                    <td>{{ $desempenoForEstados[4]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                    <td class="percentage-value">{{ round(($desempenoForEstados[4]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
                <tr>
                    <td>Casos {{ $desempenoForEstados[0]->estado }}</td>
                    <td>{{ $desempenoForEstados[0]->total_estados }} / {{ $sumaDesempenoForEstados }}</td>
                    <td class="percentage-value">{{ round(($desempenoForEstados[0]->total_estados / $sumaDesempenoForEstados) * 100, 2) }}%</td>
                </tr>
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
                @foreach ($desempenoForAreas as $desemparea)
                <tr>
                    <td>{{ $desemparea->area_tic }}</td>
                    <td>{{ $desemparea->total_asignados }}</td>
                    <td>{{ $desemparea->total_atendidos }}</td>
                    <td>{{ $desemparea->total_finalizados }}</td>
                    <td>{{ $desemparea->total_anuladas }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="subsection-title">Distribución de Casos por Técnico</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nombre del Técnico</th>
                    <th>Sin Resolver</th>
                    <th>Sin Cerrar</th>
                    <th>Finalizados</th>
                    <th>Anulados</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($desempenoForTecnicos as $desemptecnico)
                <tr>
                    <td>{{ $desemptecnico->tecnico }}</td>
                    <td>{{ $desemptecnico->total_asignados }}</td>
                    <td>{{ $desemptecnico->total_atendidos }}</td>
                    <td>{{ $desemptecnico->total_finalizados }}</td>
                    <td>{{ $desemptecnico->total_anulados }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- B. EFECTIVIDAD -->
    <div class="section">
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
                @foreach ($efectividadForAreas as $efectividadarea)
                <tr>
                    <td>{{ $efectividadarea->area_tic }}</td>
                    <td>{{ $efectividadarea->total_asistencia }}</td>
                    <td class="percentage-value">{{ $efectividadarea->total_promedio }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="subsection-title">Efectividad por Técnicos</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nombre del Técnico</th>
                    <th>Total Asistencia</th>
                    <th>Promedio</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($efectividadForTecnicos as $efectividadtenico)
                <tr>
                    <td>{{ $efectividadtenico->tecnico }}</td>
                    <td>{{ $efectividadtenico->total_asistencia }}</td>
                    <td class="percentage-value">{{ $efectividadtenico->total_promedio }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- C. EFICACIA -->
    <div class="section">
        <div class="section-title">C. Eficacia en el Cumplimiento de Metas</div>

        <div class="metric-box">
            <span class="metric-label">Cumplimiento de Meta: </span>
            <span class="metric-value">{{ round(($desempenoForEstados[3]->total_estados / 30 / $sumaDiasHabiles[0]->dias_habiles) * 100, 2) }}%</span>
            <span class="metric-label"> (Meta: 30 casos por día en {{ $sumaDiasHabiles[0]->dias_habiles }} días hábiles)</span>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th style="width: 60%;">Indicador</th>
                    <th style="width: 40%;">Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Meta Diaria de Atención</td>
                    <td class="font-bold">30 casos</td>
                </tr>
                <tr>
                    <td>Casos Finalizados</td>
                    <td class="font-bold">{{ $desempenoForEstados[3]->total_estados }}</td>
                </tr>
                <tr>
                    <td>Período Evaluado</td>
                    <td class="font-bold">{{ $sumaDiasHabiles[0]->dias_habiles }} días</td>
                </tr>
                <tr>
                    <td>Satisfacción de Usuarios</td>
                    <td class="font-bold percentage-value">{{ $promedioCalificacion[0]->promedio }} / 5.0</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- FIRMAS -->
    <table class="signature-table">
        <tr>
            <td>
                <div class="signature-label">Generado por</div>
                <div class="signature-space"></div>
                <div class="signature-name">{{ $usuarioGenerador->generador }}</div>
                <div class="signature-position">{{ $usuarioGenerador->cargo_generador }}</div>
            </td>
            <td>
                <div class="signature-label">Aprobado por</div>
                <div class="signature-space"></div>
                <div class="signature-name">{{ $usuarioGenerador->director }}</div>
                <div class="signature-position">{{ $usuarioGenerador->cargo_director }}</div>
            </td>
        </tr>
    </table>

    {{-- GRÁFICOS DE DESEMPEÑO --}}
    @if(isset($chartTecnicosImage) && $chartTecnicosImage)
    <div style="page-break-before: always;"></div>
    <div class="section-title">GRÁFICO: DESEMPEÑO POR TÉCNICOS</div>
    <div style="text-align: center; margin: 20px 0;">
        <img src="{{ $chartTecnicosImage }}" style="max-width: 100%; height: auto; border: 1px solid #e0e0e0; border-radius: 4px;" alt="Gráfico de Desempeño por Técnicos">
    </div>
    @endif

    @if(isset($chartAreasImage) && $chartAreasImage)
    <div style="page-break-before: always;"></div>
    <div class="section-title">GRÁFICO: DESEMPEÑO POR ÁREAS TÉCNICAS</div>
    <div style="text-align: center; margin: 20px 0;">
        <img src="{{ $chartAreasImage }}" style="max-width: 100%; height: auto; border: 1px solid #e0e0e0; border-radius: 4px;" alt="Gráfico de Desempeño por Áreas">
    </div>
    @endif

</body>

</html>
