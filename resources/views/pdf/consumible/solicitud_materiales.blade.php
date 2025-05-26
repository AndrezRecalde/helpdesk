<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Materiales de Bodega</title>
    <style>
        body {
            font-family: Montserrat, Arial, sans-serif;
            font-size: 12px;
        }

        .container {
            width: 100%;
            //border: 1px solid black;
            padding: 5px;
            margin: 0 auto;
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .header {
            text-align: center;
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 10px;
        }

        .info-table,
        .items-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
            /* Asegura que las celdas tengan el mismo ancho */
        }

        .info-table td,
        .items-table th,
        .items-table td {
            font-size: 10px;
            border: 1px solid black;
            padding: 5px;
            //text-align: center;
            width:35%;
            /* Define un ancho uniforme para todas las celdas */
        }

        .items-table th {
            background-color: #ddd;
        }

        .corte {
            margin-top: 20px;
        }

        input[type="text"],
        input[type="date"],
        input[type="time"],
        textarea {
            width: 95%;
            /* Ancho casi completo */
            box-sizing: border-box;
            /* Incluye padding y border en el ancho total */
            font-family: Montserrat, Arial, sans-serif;
            font-size: 10px;
            /* Tamaño de fuente */
            border: none;
            outline: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">SOLICITUD DE MATERIALES DE BODEGA</div>

        <table class="info-table">
            <tr>
                <td><strong>FECHA:</strong> {{ $pdfData['fecha'] }}</td>
                <td><strong>Pedido Nº:</strong> __________</td>
            </tr>
            <tr>
                <td><strong>Para:</strong> {{ $pdfData['usuario_autoriza'] }}, Director Administrativo</td>
                <td><strong>De:</strong> {{ $pdfData['usuario_solicita'] }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Departamento:</strong> {{ $pdfData['departamento'] }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Código Nuevo:</strong> {{ $pdfData['codigo_nuevo'] }}</td>
            </tr>
        </table>

        <p>Agradeceré disponga al Departamento de Bodega el despacho de los repuestos informáticos que serán utilizados
            para mi equipo.</p>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Cantidad Solicitada</th>
                    <th>Cantidad Despachada</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($pdfData['consumibles'] as $index => $consumible)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $consumible['codigo'] }}</td>
                        <td>{{ $consumible['nombre_consumible'] }}</td>
                        <td>{{ $consumible['cantidad_solicitada'] }}</td>
                        <td>________</td>
                    </tr>
                @endforeach
            </tbody>

        </table>

        <table class="info-table">
            <tr>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
            </tr>
            <tr>
                <td><strong>Director Área:</strong> {{ $pdfData['director_area'] }}</td>
                <td><strong>Director TIC:</strong> Ing. {{ $pdfData['director_tic'] }}</td>
                <td><strong>Autorizado por:</strong> {{ $pdfData['usuario_autoriza'] }}</td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
            </tr>
            <tr>
                <td><strong>Solicitado por:</strong> {{ $pdfData['usuario_solicita'] }}</td>
                <td><strong>Entregado por:</strong></td>
            </tr>
        </table>
    </div>
    <hr class="corte" />
    <div class="container">
        <div class="header">SOLICITUD DE MATERIALES DE BODEGA</div>

        <table class="info-table">
            <tr>
                <td><strong>FECHA:</strong> {{ $pdfData['fecha'] }}</td>
                <td><strong>Pedido Nº:</strong> __________</td>
            </tr>
            <tr>
                <td><strong>Para:</strong> {{ $pdfData['usuario_autoriza'] }}, Director Administrativo</td>
                <td><strong>De:</strong> {{ $pdfData['usuario_solicita'] }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Departamento:</strong> {{ $pdfData['departamento'] }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Código Nuevo:</strong> {{ $pdfData['codigo_nuevo'] }}</td>
            </tr>
        </table>

        <p>Agradeceré disponga al Departamento de Bodega el despacho de los repuestos informáticos que serán utilizados
            para mi equipo.</p>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Cantidad Solicitada</th>
                    <th>Cantidad Despachada</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($pdfData['consumibles'] as $index => $consumible)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $consumible['codigo'] }}</td>
                        <td>{{ $consumible['nombre_consumible'] }}</td>
                        <td>{{ $consumible['cantidad_solicitada'] }}</td>
                        <td>________</td>
                    </tr>
                @endforeach
            </tbody>

        </table>

        <table class="info-table">
            <tr>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
            </tr>
            <tr>
                <td><strong>Director Área:</strong> {{ $pdfData['director_area'] }}</td>
                <td><strong>Director TIC:</strong> Ing. {{ $pdfData['director_tic'] }}</td>
                <td><strong>Autorizado por:</strong> {{ $pdfData['usuario_autoriza'] }}</td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
                <td>
                    <input type="text" style="height: 35px; width: 97%;">
                </td>
            </tr>
            <tr>
                <td><strong>Solicitado por:</strong> {{ $pdfData['usuario_solicita'] }}</td>
                <td><strong>Entregado por:</strong></td>
            </tr>
        </table>
    </div>
</body>

</html>
