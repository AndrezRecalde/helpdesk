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

        h2, h4 {
            text-align: center;
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
            margin: 20px 0;
        }

        th, td {
            padding: 6px;
            text-align: left;
            border: 1px solid black;
            font-size: 12px;
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
        th:nth-child(1), td:nth-child(1) { width: 10%; } /* Código Nuevo */
        th:nth-child(2), td:nth-child(2) { width: 10%; } /* Modelo */
        th:nth-child(2), td:nth-child(2) { width: 10%; } /* Marca */
        th:nth-child(4), td:nth-child(4) { width: 15%; } /* Número de Serie */
        th:nth-child(5), td:nth-child(5) { width: 10%; } /* Estado */
        th:nth-child(6), td:nth-child(6) { width: 22%; } /* Custodio */
        th:nth-child(7), td:nth-child(7) { width: 23%; } /* Direccion */

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
        <thead>
            <tr>
                <th>Código Nuevo</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Número de Serie</th>
                <th>Estado</th>
                <th>Custodio</th>
                <th>Dirección</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($equipos as $equipo)
                <tr>
                    <td>{{ $equipo['codigo_nuevo'] }}</td>
                    <td>{{ $equipo['modelo'] }}</td>
                    <td>{{ $equipo['nombre_marca'] }}</td>
                    <td>{{ $equipo['numero_serie'] }}</td>
                    <td>{{ $equipo['nombre_estado'] }}</td>
                    <td>{{ $equipo['responsable'] ?? 'Sin Custodio' }}</td>
                    <td>{{ $equipo['direccion'] ?? 'Sin Dirección' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
