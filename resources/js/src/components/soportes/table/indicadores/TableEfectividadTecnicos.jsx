import { Table } from "@mantine/core";
import { TitlePage } from "../../../../components";
import { useIndicadorStore } from "../../../../hooks";

export const TableEfectividadTecnicos = () => {
    const { efectividadForTecnicos } = useIndicadorStore();
    return (
        <>
            <TitlePage mt={20} order={6}>
                EFECTIVIDAD POR TÉCNICOS
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
                            <Table.Th>Total Asistencias</Table.Th>
                            <Table.Th>Total Promedio</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {efectividadForTecnicos?.map((efecTecnico) => (
                            <Table.Tr key={efecTecnico?.cdgo_usrio}>
                                <Table.Td>{efecTecnico?.tecnico}</Table.Td>
                                <Table.Td>{efecTecnico?.total_asistencia}</Table.Td>
                                <Table.Td>{efecTecnico?.total_promedio}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};
