import { Table } from "@mantine/core";
import { TextSection, TitlePage } from "../../..";
import { useIndicadorStore } from "../../../../hooks";

export const TableDesempenoEstados = () => {
    const { desempenoForEstados, sumaDesempenoForEstados } = useIndicadorStore();
    return (
        <>
            <TitlePage fw={900} mt={20} order={3} size="h3">
                A. EFICIENCIA DE DESEMPEÑO
            </TitlePage>
            <TextSection fw={700} tt="" fz={16} ta="left">
                {sumaDesempenoForEstados} casos corresponden al 100%
            </TextSection>
            <Table.ScrollContainer>
                <Table
                    striped
                    withTableBorder
                    withColumnBorders
                    verticalSpacing="md"
                    mt={10}
                    mb={20}
                >
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                A1. Casos {desempenoForEstados[3]?.estado}s/Casos totales
                            </Table.Td>
                            <Table.Td>{desempenoForEstados[3]?.total_estados}/{sumaDesempenoForEstados}</Table.Td>
                            <Table.Td>{((desempenoForEstados[3]?.total_estados / sumaDesempenoForEstados) * 100).toFixed(2)}</Table.Td>

                            <Table.Td>
                                A2. Casos {desempenoForEstados[1]?.estado}/Casos totales
                            </Table.Td>
                            <Table.Td>{desempenoForEstados[1]?.total_estados}/{sumaDesempenoForEstados}</Table.Td>
                            <Table.Td>{((desempenoForEstados[1]?.total_estados / sumaDesempenoForEstados) * 100).toFixed(2)}%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                A3. Casos {desempenoForEstados[2]?.estado}/Casos totales
                            </Table.Td>
                            <Table.Td>{desempenoForEstados[2]?.total_estados}/{sumaDesempenoForEstados}</Table.Td>
                            <Table.Td>{((desempenoForEstados[2]?.total_estados / sumaDesempenoForEstados) * 100).toFixed(2)}%</Table.Td>

                            <Table.Td>
                                A4. Casos {desempenoForEstados[4]?.estado}/Casos totales
                            </Table.Td>
                            <Table.Td>{desempenoForEstados[4]?.total_estados}/{sumaDesempenoForEstados}</Table.Td>
                            <Table.Td>{((desempenoForEstados[4]?.total_estados / sumaDesempenoForEstados) * 100).toFixed(2)}%</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};
