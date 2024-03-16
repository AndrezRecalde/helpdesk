import { Table } from "@mantine/core";
import { TitlePage } from "../../..";

export const TableDesempenoTecnicos = () => {
    return (
        <>
            <TitlePage mt={20} order={4} size="h4">
                CASOS POR TÉCNICOS
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
                        <Table.Th>Técnico</Table.Th>
                        <Table.Th>Total Pendientes</Table.Th>
                        <Table.Th>Total Atendidos</Table.Th>
                        <Table.Th>Total Finalizados</Table.Th>
                        <Table.Th>Total Anulados</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>Loor Valderrama Jean Manuel</Table.Td>
                        <Table.Td>5</Table.Td>
                        <Table.Td>3</Table.Td>
                        <Table.Td>494</Table.Td>
                        <Table.Td>0</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Mendoza Dueñas Darwin Elias</Table.Td>
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
