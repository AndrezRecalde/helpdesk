import { Table } from "@mantine/core";
import { TextSection, TitlePage } from "../../..";

export const TableDesempenoEstados = () => {
    return (
        <>
            <TitlePage mt={20} order={4} size="h4">A. EFICIENCIA DE DESEMPEÑO</TitlePage>
            <TextSection fw={700} tt="" fz={16} ta="right">4115 casos corresponden al 100%</TextSection>
            <Table striped withTableBorder withColumnBorders verticalSpacing="md" mt={10} mb={20}>
                <Table.Tr>
                    <Table.Td>A1. Casos finalizados/Casos totales</Table.Td>
                    <Table.Td>415/4115</Table.Td>
                    <Table.Td>41%</Table.Td>

                    <Table.Td>A2. Casos anulados/Casos totales</Table.Td>
                    <Table.Td>1/4115</Table.Td>
                    <Table.Td>0.02%</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>A3. Casos atentidos/Casos totales</Table.Td>
                    <Table.Td>200/4115</Table.Td>
                    <Table.Td>21%</Table.Td>

                    <Table.Td>A4. Casos asignados/Casos totales</Table.Td>
                    <Table.Td>155/4115</Table.Td>
                    <Table.Td>12%</Table.Td>
                </Table.Tr>
            </Table>
        </>
    );
};
