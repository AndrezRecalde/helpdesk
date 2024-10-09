import { Badge, Table } from "@mantine/core";
import { TitlePage } from "../../../../components";
import { useIndicadorStore } from "../../../../hooks";

export const TableIndicadorEficacia = () => {
    const { desempenoForEstados, sumaDiasHabiles } = useIndicadorStore();

    let porcentajeEficacia = (
        (desempenoForEstados[3]?.total_estados /
            30 /
            sumaDiasHabiles[0]?.dias_habiles) *
        100
    ).toFixed(2);

    return (
        <>
            <TitlePage fw={900} mt={20} order={3}>
                C. EFICACIA
            </TitlePage>
            <TitlePage mt={20} order={6}>
                C.1 CASOS DE FINALIZADOS/META(30 X DIA, EN{" "}
                {sumaDiasHabiles[0]?.dias_habiles} DIAS) = <Badge variant="light" color="teal.7" size="lg" radius="sm">{porcentajeEficacia}%</Badge>
            </TitlePage>
            <Table.ScrollContainer>
                <Table
                    striped
                    withTableBorder
                    withColumnBorders
                    verticalSpacing="md"
                    mt={10}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Detalle</Table.Th>
                            <Table.Th>Total</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>META DIARIA DE ATENCION</Table.Td>
                            <Table.Td>30</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>CASOS FINALIZADOS</Table.Td>
                            <Table.Td>
                                {desempenoForEstados[3]?.total_estados}
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>PERIODO(NUMERO DE DIAS)</Table.Td>
                            <Table.Td>
                                {sumaDiasHabiles[0]?.dias_habiles}
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};
