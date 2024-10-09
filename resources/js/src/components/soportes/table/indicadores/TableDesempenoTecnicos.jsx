import { Table } from "@mantine/core";
import { TitlePage } from "../../..";
import { useIndicadorStore } from "../../../../hooks";

export const TableDesempenoTecnicos = () => {
    const { desempenoForTecnicos } = useIndicadorStore();
    return (
        <>
            <TitlePage mt={20} order={6}>
                CASOS POR TÉCNICOS
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
                            <Table.Th>Técnico</Table.Th>
                            <Table.Th>Casos Sin resolver</Table.Th>
                            <Table.Th>Casos Sin Cerrar</Table.Th>
                            <Table.Th>Total Finalizados</Table.Th>
                            <Table.Th>Total Anulados</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {desempenoForTecnicos?.map((desempTecnico) => (
                            <Table.Tr key={desempTecnico?.cdgo_usrio}>
                                <Table.Td>{desempTecnico?.tecnico}</Table.Td>
                                <Table.Td>{desempTecnico?.total_asignados}</Table.Td>
                                <Table.Td>{desempTecnico?.total_atendidos}</Table.Td>
                                <Table.Td>{desempTecnico?.total_finalizados}</Table.Td>
                                <Table.Td>{desempTecnico?.total_anulados}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};
