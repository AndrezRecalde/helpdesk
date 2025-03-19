<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: 21cm 29.7cm;
            margin: 30px;
        }

        body {
            font-family: Poppins, Arial, sans-serif;
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
        }

        .signature {
            margin-top: 40px;
            text-align: left;
        }

        .signature div {
            display: inline-block;
            width: 40%;
        }

        .small-text {
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <img class="img-fluid" alt="Logo del GAD Esmeraldas" src="{{ public_path('/assets/images/LogoTransparente.png') }}"
            height="100" width="320">
        <h3>MEMORANDO No. {{ $numero_memorando }} GADPE-HAP-GTIC-{{ $anio }}</h3>
        <h6>Esmeraldas, {{ $fecha }}</h6>
    </div>

    <p><strong>PARA:</strong> {{ strtoupper($directores[0]->jefe->nmbre_usrio) }}
        <sub><strong><i>DIRECTOR ADMINISTRATIVO</i></strong></sub>
    </p>
    <p><strong>ASUNTO:</strong> EQUIPO(S) INFORMÁTICOS EN MAL ESTADO</p>

    <p>Por medio de la presente, informo que los siguientes equipos han sido dados de baja debido a:
        <strong>{{ $motivo }}</strong>.
    </p>

    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Marca</th>
                <th>Serie</th>
                <th>Fecha Adquisición</th>
                <th>Código Antiguo</th>
                <th>Código Nuevo</th>
                <th>Custodio</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($equipos as $index => $equipo)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $equipo->nombre_marca }}</td>
                    <td>{{ $equipo->numero_serie }}</td>
                    <td>{{ $equipo->fecha_adquisicion }}</td>
                    <td>{{ $equipo->codigo_antiguo ?? 'Sin Código' }}</td>
                    <td>{{ $equipo->codigo_nuevo }}</td>
                    <td>{{ $equipo->custodio }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p>Adjunto la ficha No. <mark>{{ $numero_sop }}</mark> de soporte técnico que indican el detalle del daño del equipo.
        Particular que pongo en su consideración para los fines pertinentes.</p>

    <p>Atentamente,</p>
    <br>
    <br>
    <br>

    <div class="signature">
        <div>
            <p>_____________________________</p>
            <p>Ing. {{ $directores[1]->jefe->nmbre_usrio }}</p>
            <p><strong>DIRECTOR DE TECNOLOGÍAS DE INFORMACIÓN Y COMUNICACIÓN</strong></p>
        </div>
    </div>
    <br>

    <p class="small-text"><strong>cc: </strong>Ing. {{ $equipos[0]->custodio }},</p>
    <p><sub><strong><i>{{ $direccion_solicitante }}</i></strong></sub></p>
    <p class="small-text">BODEGA</p>
    <p class="small-text">Archivo/PC</p>

    {{-- <p class="small-text">Fecha y hora de emisión: {{ $fecha }} - {{ $hora }}</p> --}}
</body>

</html>
