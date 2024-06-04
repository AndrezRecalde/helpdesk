import { Table } from "@mantine/core";
import { useIndicadorStore } from "../../../../hooks";

export const TableDesempenoEstados = () => {
    const { desempenoForEstados, sumaDesempenoForEstados } =
        useIndicadorStore();
    return (
        <Table.ScrollContainer>
            <Table
                striped
                withTableBorder
                withColumnBorders
                verticalSpacing="md"
                mt={10}
                mb={20}
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Detalle de los casos</Table.Th>
                        <Table.Th>
                            Total de casos / Total de casos finalizados
                        </Table.Th>
                        <Table.Th>Porcentaje</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>

                    <Table.Tr>
                        <Table.Td>
                            A1. Casos {desempenoForEstados[3]?.estado}s/Casos totales
                        </Table.Td>
                        <Table.Td>
                            {desempenoForEstados[3]?.total_estados}/
                            {sumaDesempenoForEstados}
                        </Table.Td>
                        <Table.Td>
                            {(
                                (desempenoForEstados[3]?.total_estados /
                                    sumaDesempenoForEstados) *
                                100
                            ).toFixed(2)}
                            %
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td>
                            A2. Casos Sin Cerrar/Casos totales
                        </Table.Td>
                        <Table.Td>
                            {desempenoForEstados[2]?.total_estados}/
                            {sumaDesempenoForEstados}
                        </Table.Td>
                        <Table.Td>
                            {(
                                (desempenoForEstados[2]?.total_estados /
                                    sumaDesempenoForEstados) *
                                100
                            ).toFixed(2)}
                            %
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td>
                            A3. Casos {desempenoForEstados[1]?.estado}
                            /Casos totales
                        </Table.Td>
                        <Table.Td>
                            {desempenoForEstados[1]?.total_estados}/
                            {sumaDesempenoForEstados}
                        </Table.Td>
                        <Table.Td>
                            {(
                                (desempenoForEstados[1]?.total_estados /
                                    sumaDesempenoForEstados) *
                                100
                            ).toFixed(2)}
                            %
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td>
                            A4. Casos {desempenoForEstados[4]?.estado}
                            /Casos totales
                        </Table.Td>
                        <Table.Td>
                            {desempenoForEstados[4]?.total_estados}/
                            {sumaDesempenoForEstados}
                        </Table.Td>
                        <Table.Td>
                            {(
                                (desempenoForEstados[4]?.total_estados /
                                    sumaDesempenoForEstados) *
                                100
                            ).toFixed(2)}
                            %
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td>
                            A5. Casos {desempenoForEstados[0]?.estado}
                            /Casos totales
                        </Table.Td>
                        <Table.Td>
                            {desempenoForEstados[0]?.total_estados}/
                            {sumaDesempenoForEstados}
                        </Table.Td>
                        <Table.Td>
                            {(
                                (desempenoForEstados[0]?.total_estados /
                                    sumaDesempenoForEstados) *
                                100
                            ).toFixed(2)}
                            %
                        </Table.Td>
                    </Table.Tr>

                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
