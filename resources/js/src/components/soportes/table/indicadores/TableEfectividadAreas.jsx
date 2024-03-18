import { Table } from "@mantine/core";
import { TitlePage } from "../../../../components";
import { useIndicadorStore } from "../../../../hooks";

export const TableEfectividadAreas = () => {
    const { efectividadForAreas } = useIndicadorStore();
    return (
        <>
            <TitlePage fw={900} mt={20} order={3} size="h3">
                B. CALIDAD DE LA EFECTIVIDAD
            </TitlePage>
            <TitlePage mt={20} order={6} size="h6">
                EFECTIVIDAD POR ÁREA
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
                            <Table.Th>Área</Table.Th>
                            <Table.Th>Total Asistencias</Table.Th>
                            <Table.Th>Total Promedio</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {efectividadForAreas?.map((efecArea) => (
                            <Table.Tr key={efecArea?.id_areas_tic}>
                                <Table.Td>{efecArea?.area_tic}</Table.Td>
                                <Table.Td>{efecArea?.total_asistencia}</Table.Td>
                                <Table.Td>{efecArea?.total_promedio}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};
