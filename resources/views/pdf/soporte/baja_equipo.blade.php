<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Memorando de Baja de Equipos</title>
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
            margin-bottom: 18px;
            padding-bottom: 10px;
        }

        .header img {
            max-width: 210px;
            height: auto;
            margin-bottom: 6px;
        }

        .institution-name {
            font-size: 10pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #222;
            margin-bottom: 2px;
        }

        .doc-number {
            font-size: 10pt;
            font-weight: bold;
            text-transform: uppercase;
            color: #111;
            letter-spacing: 0.2px;
        }

        /* ─── BLOQUE DE DATOS DEL MEMORANDO ─────────── */
        .memo-data {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 9.5pt;
        }

        .memo-data td {
            border: none;
            padding: 3px 0;
            vertical-align: top;
        }

        .memo-label {
            width: 90px;
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
            margin: 10px 0 12px;
        }

        /* ─── CUERPO DEL MEMORANDO ───────────────────── */
        .memo-body {
            font-size: 9.5pt;
            line-height: 1.7;
            text-align: justify;
            margin-bottom: 10px;
        }

        .memo-body .ref {
            font-style: italic;
            font-weight: bold;
        }

        /* ─── TABLA DE EQUIPOS ───────────────────────── */
        .equipos-table {
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0 14px;
            font-size: 8pt;
        }

        .equipos-table thead tr {
            background: #888888;
            color: #ffffff;
        }

        .equipos-table th {
            padding: 5px 4px;
            text-align: center;
            font-size: 7.5pt;
            font-weight: bold;
            border: 1px solid #777;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .equipos-table td {
            padding: 4px 5px;
            font-size: 7.5pt;
            border: 1px solid #aaaaaa;
            vertical-align: middle;
        }

        .equipos-table tbody tr:nth-child(even) {
            background-color: #eeeeee;
        }

        .equipos-table tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }

        .equipos-table tbody tr:last-child td {
            border-bottom: 2px solid #888;
        }

        .col-num {
            width: 4%;
            text-align: center;
        }

        .col-det {
            width: 16%;
        }

        .col-marca {
            width: 11%;
            text-align: center;
        }

        .col-serie {
            width: 15%;
            font-family: 'Courier New', monospace;
            font-size: 7pt;
        }

        .col-fadq {
            width: 13%;
            text-align: center;
        }

        .col-cant {
            width: 10%;
            text-align: center;
        }

        .col-cant2 {
            width: 10%;
            text-align: center;
        }

        .col-cust {
            width: 21%;
        }

        .years-badge {
            font-size: 6.5pt;
            color: #555;
            font-style: italic;
        }

        /* ─── CIERRE Y FIRMA ─────────────────────────── */
        .closing {
            font-size: 9.5pt;
            margin-top: 8px;
            margin-bottom: 6px;
        }

        .signature-section {
            margin-top: 45px;
        }

        .sig-line {
            width: 200px;
            border-top: 1px solid #000;
            margin-bottom: 2px;
        }

        .sig-name {
            font-size: 9.5pt;
            font-weight: bold;
            text-transform: uppercase;
        }

        .sig-title {
            font-size: 8pt;
            color: #333;
            font-weight: bold;
            text-transform: uppercase;
        }

        /* ─── CC ─────────────────────────────────────── */
        .cc-section {
            margin-top: 20px;
            padding-top: 8px;
            font-size: 7pt;
            color: #333;
        }

        .cc-section strong {
            color: #111;
        }

        .cc-item {
            margin: 2px 0;
            padding-left: 8px;
            font-style: italic;
        }
    </style>
</head>

<body>

    @php
        $logoPath = public_path('/assets/images/LogoTransparente.png');
        $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
        $total = count($equipos);
    @endphp

    <div class="page-wrapper">

        {{-- ══ ENCABEZADO ══ --}}
        <div class="header">
            <img src="{{ $logoBase64 }}" alt="Logo Institución" />
            <div class="institution-name">Gobierno Autónomo Descentralizado Provincial de Esmeraldas</div>
            <div class="doc-number">
                Memorando No. {{ $numero_memorando }}-GADPE-HAP-GTIC-{{ $anio }}
            </div>
        </div>

        {{-- ══ DATOS DEL MEMORANDO ══ --}}
        <table class="memo-data">
            <tr>
                <td class="memo-label">Para</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">
                    <strong>{{ Str::upper($directores[0]->jefe->nmbre_usrio) }}</strong>
                    <br><em>DIRECTOR DE LA GESTIÓN ADMINISTRATIVA</em>
                </td>
            </tr>
            <tr>
                <td class="memo-label">Asunto</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">
                    <strong>BIEN INFORMÁTICO EN MAL ESTADO &mdash; INFORME TÉCNICO</strong>
                </td>
            </tr>
            <tr>
                <td class="memo-label">Fecha</td>
                <td class="memo-sep">:</td>
                <td class="memo-value">{{ $fecha }}</td>
            </tr>
        </table>

        {{-- ══ CUERPO DEL MEMORANDO ══ --}}
        <p class="memo-body">
            Por medio del presente informe, se comunica que los bienes informáticos detallados a continuación
            presentan fallas que afectan su operatividad, conforme al análisis técnico realizado por el
            <strong>Ing. {{ $tecnico }}</strong>. Dicho informe señala que los equipos presentan:
            <em>{{ $motivo }}</em>.
        </p>

        <p class="memo-body">
            En cumplimiento del principio de vigencia tecnológica, según lo dispuesto en la Resolución No.
            <span class="ref">RE-SERCOP-2016-000657, Capítulo III</span>, Artículo 6 &mdash; Vida Útil de
            Equipos Informáticos y Proyectores, se procede con la entrega de los bienes informáticos,
            cuya vida útil de cada equipo se detalla en la siguiente tabla ({{ $total }}
            {{ $total === 1 ? 'equipo' : 'equipos' }} en total):
        </p>

        {{-- ══ TABLA DE EQUIPOS ══ --}}
        <table class="equipos-table">
            <thead>
                <tr>
                    <th class="col-num">#</th>
                    <th class="col-det">Detalle / Modelo</th>
                    <th class="col-marca">Marca</th>
                    <th class="col-serie">N° de Serie</th>
                    <th class="col-fadq">Fecha Adquisición</th>
                    <th class="col-cant">Cód. Antiguo</th>
                    <th class="col-cant2">Cód. Nuevo</th>
                    <th class="col-cust">Custodio</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($equipos as $index => $equipo)
                    @php
                        $fechaAdq = \Carbon\Carbon::parse($equipo->fecha_adquisicion);
                        $aniosUso = $fechaAdq->diffInYears(now());
                    @endphp
                    <tr>
                        <td class="col-num" style="color: #888; font-size: 6.5pt;">{{ $index + 1 }}</td>
                        <td class="col-det">{{ $equipo->modelo }}</td>
                        <td class="col-marca">{{ $equipo->nombre_marca }}</td>
                        <td class="col-serie">{{ $equipo->numero_serie ?? 'SIN SERIE' }}</td>
                        <td class="col-fadq" style="text-align: center;">
                            {{ $fechaAdq->format('d/m/Y') }}
                            <br><span class="years-badge">{{ $aniosUso }} {{ $aniosUso === 1 ? 'año' : 'años' }}
                                de
                                uso</span>
                        </td>
                        <td class="col-cant">{{ $equipo->codigo_antiguo ?? '—' }}</td>
                        <td class="col-cant2">{{ $equipo->codigo_nuevo ?? '—' }}</td>
                        <td class="col-cust">{{ Str::upper($equipo->custodio ?? 'SIN CUSTODIO') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        {{-- ══ CIERRE ══ --}}
        <p class="memo-body">
            Se adjunta la ficha N° <strong>{{ $numero_sop }}</strong> de soporte técnico que registra el detalle
            del daño de cada equipo. Particular que pongo en su consideración para los fines pertinentes.
        </p>

        <p class="closing">Atentamente,</p>

        {{-- ══ FIRMA ══ --}}
        <div class="signature-section">
            <div class="sig-line"></div>
            <div class="sig-name">Ing. {{ $directores[1]->jefe->nmbre_usrio }}</div>
            <div class="sig-title">Director de Tecnologías de Información y Comunicación</div>
        </div>

        {{-- ══ CC ══ --}}
        <div class="cc-section">
            <div class="cc-item"><strong>cc:</strong> Ing. {{ Str::upper($equipos[0]->custodio) }} &mdash;
                <em>{{ $direccion_solicitante }}</em>
            </div>
            <div class="cc-item">Bodega</div>
            <div class="cc-item">Archivo / PC</div>
        </div>

    </div>{{-- /page-wrapper --}}

</body>

</html>
