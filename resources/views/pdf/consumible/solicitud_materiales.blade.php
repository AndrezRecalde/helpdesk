<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Materiales de Bodega</title>
    <style>
        @page {
            margin: 10mm;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        body {
            font-family: Montserrat, Arial, sans-serif;
            font-size: 13px;
            padding: 8px;
        }

        .container {
            width: 100%;
            padding: 5px;
            margin: 0;
            //background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
           // background-repeat: no-repeat;
            //background-size: cover;
        }

        .header {
            text-align: center;
            font-weight: bold;
            font-size: 15px;
            margin-bottom: 8px;
            margin-top: 0;
            padding: 6px 0;
        }

        .info-table,
        .items-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
            margin-bottom: 8px;
        }

        .info-table td,
        .items-table th,
        .items-table td {
            font-size: 11px;
            border: 1px solid black;
            padding: 6px;
            width: 35%;
        }

        .items-table th {
            background-color: #ddd;
        }

        .corte {
            margin-top: 15px;
            margin-bottom: 15px;
            border: none;
            border-top: 3px dashed #333;
            height: 3px;
        }

        p {
            margin: 8px 0;
        }

        /* Highlight para Código Nuevo */
        .highlight-codigo {
            background-color: #fff9c4;
            font-weight: bold;
        }

        /* Fondo BODEGA para el primer formulario */
        .fondo-bodega {
            position: relative;
        }

        .fondo-bodega::before {
            content: "BODEGA";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.05);
            z-index: 1;
            pointer-events: none;
        }

        /* Fondo USUARIO para el segundo formulario */
        . fondo-usuario {
            position: relative;
        }

        .fondo-usuario:: before {
            content: "USUARIO";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.05);
            z-index: 1;
            pointer-events: none;
        }

        .container>* {
            position: relative;
            z-index: 2;
        }

        input[type="text"],
        input[type="date"],
        input[type="time"],
        textarea {
            width: 95%;
            box-sizing: border-box;
            font-family: Montserrat, Arial, sans-serif;
            font-size: 11px;
            border: none;
            outline: none;
            height: 40px;
        }
    </style>
</head>

<body>
    <div class="container fondo-bodega">
        <div class="header">SOLICITUD DE MATERIALES DE BODEGA</div>

        <table class="info-table">
            <tr>
                <td><strong>FECHA: </strong> {{ $pdfData['fecha'] }}</td>
                <td><strong>Pedido Nº:</strong> __________</td>
            </tr>
            <tr>
                <td><strong>Para:</strong> {{ $pdfData['usuario_autoriza'] }}, Director Administrativo</td>
                <td><strong>De: </strong> {{ $pdfData['usuario_solicita'] }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Departamento: </strong> {{ $pdfData['departamento'] }}</td>
            </tr>
            <tr>
                <td colspan="2" class="highlight-codigo"><strong>Código Nuevo:</strong>
                    {{ $pdfData['codigo_nuevo'] }}</td>
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
                    <input type="text">
                </td>
                <td>
                    <input type="text">
                </td>
                <td>
                    <input type="text">
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
                    <input type="text">
                </td>
                <td>
                    <input type="text">
                </td>
            </tr>
            <tr>
                <td><strong>Solicitado por:</strong> {{ $pdfData['usuario_solicita'] }}</td>
                <td><strong>Entregado por: </strong></td>
            </tr>
        </table>
    </div>

    <hr class="corte" />

    <div class="container fondo-usuario">
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
                <td colspan="2" class="highlight-codigo"><strong>Código Nuevo: </strong>
                    {{ $pdfData['codigo_nuevo'] }}</td>
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
                    <input type="text">
                </td>
                <td>
                    <input type="text">
                </td>
                <td>
                    <input type="text">
                </td>
            </tr>
            <tr>
                <td><strong>Director Área:</strong> {{ $pdfData['director_area'] }}</td>
                <td><strong>Director TIC:</strong> Ing. {{ $pdfData['director_tic'] }}</td>
                <td><strong>Autorizado por: </strong> {{ $pdfData['usuario_autoriza'] }}</td>
            </tr>
        </table>

        <table class="info-table">
            <tr>
                <td>
                    <input type="text">
                </td>
                <td>
                    <input type="text">
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
