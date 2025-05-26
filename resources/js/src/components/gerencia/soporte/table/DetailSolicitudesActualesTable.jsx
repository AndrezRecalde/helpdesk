import { Badge, Table } from "@mantine/core";
import { TextSection } from "../../../elements/titles/TextSection";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español

export const DetailSolicitudesActualesTable = ({ row }) => {
    return (
        <Table variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th w={250}>
                        <TextSection fw={700} tt="">
                            Estado del Soporte
                        </TextSection>
                    </Table.Th>
                    <Table.Td>
                        <Badge variant="dot" color={row.original.color}>
                            {row.original.estado || "SIN ESTADO"}
                        </Badge>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={250}>
                        <TextSection fw={700} tt="">
                            Tipo de Soporte
                        </TextSection>
                    </Table.Th>
                    <Table.Td>
                        <Badge variant="dot" color={row.original.color}>
                            {row.original.tipo_soporte || "SIN CATEGORIA"}
                        </Badge>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={250}>
                        <TextSection fw={700} tt="">
                            Area TIC
                        </TextSection>
                    </Table.Th>
                    <Table.Td>
                        <Badge variant="dot" color={row.original.color}>
                            {row.original.area_tic || "SIN CATEGORIA"}
                        </Badge>
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={350}>
                        <TextSection fw={700} tt="">
                            Incidencia
                        </TextSection>
                    </Table.Th>
                    <Table.Td w={350}>
                        {row.original.incidente || "SIN INCIDENCIA"} <br />
                        {row.original.fecha_ini
                            ? "- " + dayjs(row.original.fecha_ini).fromNow()
                            : null}{" "}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w={350}>
                        <TextSection fw={700} tt="">
                            Solución
                        </TextSection>
                    </Table.Th>
                    <Table.Td w={350}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: row.original.solucion || "SIN SOLUCIÓN",
                            }}
                        />
                        {row.original.fecha_fin
                            ? "- " + dayjs(row.original.fecha_fin).fromNow()
                            : null}{" "}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
};
