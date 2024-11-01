import { Card, Table } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { TextSection } from "../../../components";

const elements = [
    { id: randomId(), marcacion: "31/10/2024 07:44:25", sensor: "1" },
    { id: randomId(), marcacion: "31/10/2024 12:14:25", sensor: "1" },
    { id: randomId(), marcacion: "31/10/2024 17:24:25", sensor: "1" },
    { id: randomId(), marcacion: "31/10/2024 07:54:25", sensor: "2" },
    { id: randomId(), marcacion: "31/10/2024 17:24:25", sensor: "2" },
];

export const TableMarcacionRelojOnline = () => {
    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {element.marcacion}
                </TextSection>
            </Table.Td>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {element.sensor}
                </TextSection>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card withBorder shadow="sm" radius="md" mt={5}>
            <Table  withColumnBorders highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <TextSection fw={700} fz={18}>
                                Marcacion Fecha - Hora
                            </TextSection>
                        </Table.Th>
                        <Table.Th>
                            <TextSection fw={700} fz={18}>
                                Sensor Reloj
                            </TextSection>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Card>
    );
};
