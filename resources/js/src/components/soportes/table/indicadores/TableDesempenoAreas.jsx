import { Table } from "@mantine/core";
import { TitlePage } from "../../../../components";

export const TableDesempenoAreas = () => {
    return (
        <>
            <TitlePage mt={20} order={4} size="h4">
                CASOS POR ÁREA
            </TitlePage>
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
                        <Table.Th>Total Pendientes</Table.Th>
                        <Table.Th>Total Atendidos</Table.Th>
                        <Table.Th>Total Finalizados</Table.Th>
                        <Table.Th>Total Anulados</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>SISTEMAS Y APLICACIONES</Table.Td>
                        <Table.Td>5</Table.Td>
                        <Table.Td>3</Table.Td>
                        <Table.Td>494</Table.Td>
                        <Table.Td>0</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>SOPORTE TÉCNICO</Table.Td>
                        <Table.Td>2</Table.Td>
                        <Table.Td>3</Table.Td>
                        <Table.Td>794</Table.Td>
                        <Table.Td>0</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );
};
