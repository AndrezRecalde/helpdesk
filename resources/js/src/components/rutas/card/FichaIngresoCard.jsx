import { Badge, Card, Group, Table } from "@mantine/core";
import { TextSection } from "../../elements/titles/TextSection";
import { useRutaStore } from "../../../hooks";
import dayjs from "dayjs";

export const FichaIngresoCard = () => {
    const { ingreso } = useRutaStore();
    console.log("ficha ingreso");
    return (
        <Card withBorder shadow="sm" radius="sm">
            <Card.Section withBorder inheritPadding py="xs" shadow="md">
                <Group justify="space-between" align="center">
                    <TextSection fz={18} fw={700}>
                        Ficha de Ingreso
                    </TextSection>

                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Table variant="vertical" layout="fixed" withTableBorder>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th w={160}>No. TRAMITE: </Table.Th>
                            <Table.Td>{ingreso.cnsctvo_rta}</Table.Td>
                            <Table.Th w={160}>ESTADO: </Table.Th>
                            <Table.Td>
                                <Badge
                                    size="md"
                                    radius="sm"
                                    variant="dot"
                                    color={ingreso.color}
                                >
                                    {ingreso.detalle_largo}
                                </Badge>
                            </Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>No. MEMO/OFICIO: </Table.Th>
                            <Table.Td colSpan={3}>
                                {ingreso.nmro_ofcio}
                            </Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>FECHA ELABORACION: </Table.Th>
                            <Table.Td>
                                {dayjs(ingreso.fcha_elbrcion).isValid()
                                    ? dayjs(ingreso.fcha_elbrcion).format(
                                          "YYYY-MM-DD HH:mm"
                                      )
                                    : null}
                            </Table.Td>
                            <Table.Th>FECHA RECEPCION: </Table.Th>
                            <Table.Td>
                                {dayjs(ingreso.fcha_rcpcion).isValid()
                                    ? dayjs(ingreso.fcha_rcpcion).format(
                                          "YYYY-MM-DD HH:mm"
                                      )
                                    : null}
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>REMITENTE: </Table.Th>
                            <Table.Td colSpan={3}>{ingreso.remitente}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>DESTINATARIO: </Table.Th>
                            <Table.Td colSpan={3}>
                                {ingreso.destinatario}
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>ASUNTO: </Table.Th>
                            <Table.Td colSpan={3}>{ingreso.asnto}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>TIPO: </Table.Th>
                            <Table.Td colSpan={3}>
                                {ingreso.ruta_tipo_documento}
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card.Section>
        </Card>
    );
};
