import { Card, Table } from "@mantine/core";
import { TextSection, TitlePage } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import dayjs from "dayjs";

export const TableMarcacionRelojOnline = () => {
    const { marcaciones } = useMarcacionStore();

    const rows = marcaciones.map((marcacion) => (
        <Table.Tr key={marcacion.ID}>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {marcacion.NAME}
                </TextSection>
            </Table.Td>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {dayjs(marcacion.CHECKTIME).format("YYYY-MM-DD")}
                </TextSection>
            </Table.Td>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {dayjs(marcacion.CHECKTIME).format("HH:mm:ss")}
                </TextSection>
            </Table.Td>
            <Table.Td>
                <TextSection fw={300} fz={16}>
                    {marcacion.SENSORID}
                </TextSection>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card withBorder shadow="sm" radius="md" mt={5}>
            <Card.Section withBorder inheritPadding py="lg">
                <TitlePage order={3}>Marcaciones desde el Biométrico</TitlePage>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Table
                    striped
                    withColumnBorders
                    withRowBorders
                    verticalSpacing="sm"
                    horizontalSpacing="lg"
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: "300px" }}>
                                <TextSection fw={700} fz={18}>
                                    Servidor
                                </TextSection>
                            </Table.Th>
                            <Table.Th>
                                <TextSection fw={700} fz={18}>
                                    Fecha
                                </TextSection>
                            </Table.Th>
                            <Table.Th>
                                <TextSection fw={700} fz={18}>
                                    Hora
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "200px" }}>
                                <TextSection fw={700} fz={18}>
                                    Sensor Reloj
                                </TextSection>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Card.Section>
        </Card>
    );
};
