<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Solicitud de Materiales - {{ $solicitud->numero_solicitud }}</title>
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 20px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
        }

        .form-container {
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2026/02/Gemini_Generated_Image_vq6xzavq6xzavq6x-1.png");
            background-size: cover;
            background-position: center;
            opacity: 0.40;
            border: 2px solid #000;
            padding: 8px;
            margin-bottom: 8px;
            page-break-inside: avoid;
            height: 45%;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-bottom: 8px;
        }

        .header h1 {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .header .numero {
            font-size: 11pt;
            font-weight: bold;
            color: #333;
        }

        .copy-label {
            position: static;
            right: 15px;
            top: 15px;
            background: #f0f0f0;
            padding: 3px 8px;
            border: 1px solid #666;
            font-size: 8pt;
            font-weight: bold;
        }

        .info-section {
            margin-bottom: 8px;
        }

        .info-row {
            display: table;
            width: 100%;
            margin-bottom: 3px;
        }

        .info-label {
            display: table-cell;
            width: 25%;
            font-weight: bold;
            padding: 2px 4px;
            background: #e8e8e8;
            border: 1px solid #999;
        }

        .info-value {
            display: table-cell;
            width: 75%;
            padding: 2px 4px;
            border: 1px solid #999;
            border-left: none;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
            font-size: 8pt;
        }

        .items-table th {
            background: #333;
            color: white;
            padding: 4px;
            text-align: left;
            border: 1px solid #000;
            font-weight: bold;
        }

        .items-table td {
            padding: 3px 4px;
            border: 1px solid #999;
        }

        .items-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        .signatures {
            display: table;
            width: 100%;
            margin-top: 10px;
        }

        .signature-box {
            display: table-cell;
            width: 25%;
            text-align: center;
            padding: 0 5px;
        }

        .signature-line {
            border-top: 1px solid #000;
            margin-top: 25px;
            padding-top: 3px;
            font-size: 7pt;
            font-weight: bold;
        }

        .signature-label {
            font-size: 7pt;
            color: #666;
            margin-bottom: 2px;
        }

        .observations {
            margin-top: 6px;
            padding: 4px;
            border: 1px solid #999;
            background: #f9f9f9;
            min-height: 30px;
            font-size: 8pt;
        }

        .observations-label {
            font-weight: bold;
            font-size: 8pt;
            margin-bottom: 2px;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    @php
        $copies = [
            ['label' => 'COPIA USUARIO', 'class' => ''],
            ['label' => 'COPIA BODEGA', 'class' => '']
        ];
    @endphp

    @foreach($copies as $copy)
    <div class="form-container {{ $copy['class'] }}">
        <div class="copy-label">{{ $copy['label'] }}</div>
        
        <div class="header">
            <h1>SOLICITUD DE MATERIALES Y CONSUMIBLES</h1>
            <div class="numero">N° {{ $solicitud->numero_solicitud }}</div>
        </div>

        <div class="info-section">
            <div class="info-row">
                <div class="info-label">FECHA:</div>
                <div class="info-value">{{ \Carbon\Carbon::parse($solicitud->fecha_solicitud)->format('d/m/Y') }}</div>
            </div>

            <div class="info-row">
                <div class="info-label">DEPARTAMENTO:</div>
                <div class="info-value">{{ $solicitud->departamento->nmbre_dprtmnto ?? 'N/A' }}</div>
            </div>

            <div class="info-row">
                <div class="info-label">SOLICITANTE:</div>
                <div class="info-value">{{ $solicitud->usuarioSolicita->nmbre_usrio ?? 'N/A' }}</div>
            </div>

            <div class="info-row">
                <div class="info-label">EQUIPO:</div>
                <div class="info-value">
                    @if($solicitud->consumibles->first() && $solicitud->consumibles->first()->pivot->equipo_id)
                        @php
                            $equipo = \App\Models\InvEquipo::find($solicitud->consumibles->first()->pivot->equipo_id);
                        @endphp
                        {{ $equipo ? ($equipo->codigo_nuevo ?? $equipo->codigo_antiguo) : 'N/A' }}
                    @else
                        N/A
                    @endif
                </div>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 8%">#</th>
                    <th style="width: 20%">CÓDIGO</th>
                    <th style="width: 52%">DESCRIPCIÓN</th>
                    <th style="width: 10%">CANT.</th>
                    <th style="width: 10%">UNIDAD</th>
                </tr>
            </thead>
            <tbody>
                @foreach($solicitud->consumibles as $index => $consumible)
                <tr>
                    <td style="text-align: center">{{ $index + 1 }}</td>
                    <td>{{ $consumible->codigo ?? 'N/A' }}</td>
                    <td>{{ $consumible->nombre_consumible }}</td>
                    <td style="text-align: center">{{ $consumible->pivot->cantidad_solicitada }}</td>
                    <td style="text-align: center">{{ $consumible->unidad ?? 'UND' }}</td>
                </tr>
                @endforeach
                
                @for($i = count($solicitud->consumibles); $i < 5; $i++)
                <tr>
                    <td style="text-align: center">{{ $i + 1 }}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                @endfor
            </tbody>
        </table>

        @if($solicitud->observaciones)
        <div class="observations-label">OBSERVACIONES:</div>
        <div class="observations">
            {{ $solicitud->observaciones }}
        </div>
        @endif

        <div class="signatures">
            <div class="signature-box">
                <div class="signature-label">SOLICITANTE</div>
                <div class="signature-line">
                    {{ $solicitud->usuarioSolicita->nmbre_usrio ?? '' }}
                </div>
            </div>
            
            <div class="signature-box">
                <div class="signature-label">AUTORIZADOR</div>
                <div class="signature-line">
                    {{ $solicitud->usuarioAutoriza->nmbre_usrio ?? '' }}
                </div>
            </div>
            
            <div class="signature-box">
                <div class="signature-label">DIRECTOR ÁREA</div>
                <div class="signature-line">
                    @php
                        $directorArea = \App\Models\User::find($solicitud->director_area);
                    @endphp
                    {{ $directorArea->nmbre_usrio ?? '' }}
                </div>
            </div>
            
            <div class="signature-box">
                <div class="signature-label">DIRECTOR TIC</div>
                <div class="signature-line">
                    @php
                        $directorTic = \App\Models\User::find($solicitud->director_tic);
                    @endphp
                    {{ $directorTic->nmbre_usrio ?? '' }}
                </div>
            </div>
        </div>
    </div>
    @endforeach
</body>
</html>
