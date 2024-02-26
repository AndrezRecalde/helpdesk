import { useMemo } from "react";
import { Badge, Card, Group, Table, Text } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../..";

const data = [
    {
        num_soporte: "38976",
        fecha: "24/02/2024",
        usuario_id: "Paz Santos Jenniffer Juliana",
        direccion_id: "GESTIÓN DE TALENTO HUMANO",
        id_usu_tecnico_asig: "Christian Aldredo Apraez Torres",
    },
    {
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "Mauricio Vasco",
    },
    {
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "",
    },
];

export const SoportesTable = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: "num_soporte", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorKey: "fecha", //access nested data with dot notation
                header: "Fecha - Hora",
            },
            {
                accessorKey: "usuario_id", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion_id", //normal accessorKey
                header: "Dirección del usuario",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "id_usu_tecnico_asig", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        /* renderRowActionMenuItems: ({ row }) => (
            menu === 1 ? <MenuSolicitudTable /> : <MenuTable_E/>
        ), */
        /* mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.atendido === 0 ? "#CB3234" : "",
                color: cell.row.original.atendido === 0 ? "white" : "",
            },
        }), */
        renderDetailPanel: ({ row }) => (
            <Table.ScrollContainer  minWidth={800}>
                <Table verticalSpacing="md" withColumnBorders withRowBorders={false}>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Text fz="sm">PROBLEMA CON LA IMPRESORA, AL SCANEAR POR EL ADF SALE CON UNA RAYA</Text>
                                <Text fz="xs" c="dimmed">
                                    Incidencia
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text fz="sm">
                                    SE SOLUCIONA CAMBIANDOLE EL TONER A LA IMPRESORA
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Retrospectiva del técnico
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge radius="sm">Terminado</Badge>
                                <Text fz="xs" c="dimmed">
                                    Estado del soporte
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        ),
    });

    return <TableContent table={table} />;
};
