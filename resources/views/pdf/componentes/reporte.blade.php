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
            margin-bottom: 20px;
        }

        .header img {
            max-width: 150px;
        }

        h2 {
            text-align: center;
            margin-top: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 0.5px solid gray;
            /* Corrige el borde */
            table-layout: auto;
            /* Cambia a 'auto' para ajustar el ancho según el contenido */
            margin-bottom: 25px;
            margin-top: 25px;
        }

        th,
        td {
            padding: 3px;
            vertical-align: top;
            border: 1px solid black;
            font-size: 12px;
            /* Borde para celdas */
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>

<body>

    <div class="header">
        <img src={{ public_path('/assets/images/LogoTransparente.png') }} height="50" width="180"
            alt="Logo de la Institución"> <!-- Cambia 'logo.png' por la ruta de tu imagen -->
    </div>

    <h2>{{ $title }}</h2>
    <h6>{{ $current_fecha }}</h6>
    {{-- <p style="text-align: justify;">Este reporte presenta un resumen de los equipos inventariados en la institución,
        clasificados según sus
        características técnicas y estado actual. Los datos incluyen información clave para la identificación y el
        seguimiento de cada equipo, como el modelo, la marca, el número de serie, los códigos de inventario, la
        categoría y el estado de uso. Este análisis tiene como objetivo facilitar el control y la optimización de los
        recursos tecnológicos en la institución.</p> --}}

    <table>
        <tr>
            <th>Componente</th>
            <th>Marca</th>
            <th>Número de Serie</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Equipo</th>
        </tr>
        @foreach ($componentes as $componente)
            <tr>
                <td>{{ $componente['nombre_periferico'] }}</td>
                <td>{{ $componente['nombre_marca'] }}</td>
                <td>{{ $componente['numero_serie'] }}</td>
                <td>{{ $componente['nombre_categoria'] }}</td>
                <td>{{ $componente['nombre_estado'] }}</td>
                <td>{{ $componente['equipo']['codigo_nuevo'] ?? 'No pertenece a ningún equipo' }}</td>
            </tr>
        @endforeach
    </table>

</body>

</html>
