import { Table } from "@mantine/core";
import { useIndicadorStore } from "../../../../hooks";

export const TableDesempenoAreas = () => {
    const { desempenoForAreas } = useIndicadorStore();
    return (
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
                        <Table.Th>Soportes Sin Resolver</Table.Th>
                        <Table.Th>Soportes Sin Cerrar</Table.Th>
                        <Table.Th>Total Finalizados</Table.Th>
                        <Table.Th>Total Anulados</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {desempenoForAreas?.map((desempArea) => (
                        <Table.Tr key={desempArea?.id_areas_tic}>
                            <Table.Td>{desempArea?.area_tic}</Table.Td>
                            <Table.Td>{desempArea?.total_asignados}</Table.Td>
                            <Table.Td>{desempArea?.total_atendidos}</Table.Td>
                            <Table.Td>{desempArea?.total_finalizados}</Table.Td>
                            <Table.Td>{desempArea?.total_anuladas}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
