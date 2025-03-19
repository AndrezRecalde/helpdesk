<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Equipos</title>
    <style>
        body {
            background-image: url("http://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
            font-family: Arial, sans-serif;
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
        }

        .logo {
            max-width: 180px;
            height: auto;
        }

        h2,
        h4 {
            text-align: center;
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
            margin: 20px 0;
            table-layout: fixed; /* Fuerza que todas las columnas tengan el mismo ancho */
        }

        th,
        td {
            padding: 6px;
            text-align: left;
            border: 1px solid black;
            font-size: 12px;
            word-wrap: break-word; /* Evita que el texto desborde */
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: center;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
         /* Definir anchos proporcionales */
        th:nth-child(1), td:nth-child(1) { width: 12%; } /* Nombre Categoria */
        th:nth-child(2), td:nth-child(2) { width: 10%; } /* Marca */
        th:nth-child(3), td:nth-child(3) { width: 12%; } /* Componente */
        th:nth-child(4), td:nth-child(4) { width: 12%; } /* Número de Serie */
        th:nth-child(5), td:nth-child(5) { width: 10%; } /* Estado */
        th:nth-child(6), td:nth-child(6) { width: 15%; } /* Custodio */
        th:nth-child(7), td:nth-child(7) { width: 19%; } /* Direccion */
        th:nth-child(8), td:nth-child(8) { width: 10%; }  /* Equipo */

        .right {
            text-align: right;
        }
    </style>
</head>

<body>

    <div class="header">
        @php
            $logoPath = public_path('/assets/images/LogoTransparente.png');
            $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
        @endphp
        <img src="{{ $logoBase64 }}" class="logo" alt="Logo de la Institución" />
    </div>

    <h2>{{ $title }}</h2>
    <h4>Fecha de Generación: {{ date('d-m-Y', strtotime($current_fecha)) }}</h4>

    <table>
        <tr>
            <th>Categoría</th>
            <th>Marca</th>
            <th>Componente</th>
            <th>Número de Serie</th>
            <th>Estado</th>
            <th>Custodio</th>
            <th>Dirección</th>
            <th>Equipo</th>
        </tr>
        @foreach ($componentes as $componente)
            <tr>
                <td>{{ $componente['nombre_categoria'] }}</td>
                <td>{{ $componente['nombre_marca'] }}</td>
                <td>{{ $componente['nombre_periferico'] }}</td>
                <td>{{ $componente['numero_serie'] }}</td>
                <td>{{ $componente['nombre_estado'] }}</td>
                <td>{{ $componente['responsable'] ?? 'Sin Custodio' }}</td>
                <td>{{ $componente['direccion'] ?? 'Sin Dirección' }}</td>
                <td>{{ $componente['equipo']['codigo_nuevo'] ?? 'No pertenece a ningún equipo' }}</td>
            </tr>
        @endforeach
    </table>

</body>

</html>
