import { useMemo } from "react";
import { Badge, Card, Group, Table, Text } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { MenuSolicitudTable, MenuTable_E, TableContent } from "../..";

const data = [
    {
        num_soporte: "38976",
        fecha: "24/02/2024",
        usuario_id: "Paz Santos Jenniffer Juliana",
        direccion_id: "GESTIÓN DE TALENTO HUMANO",
        id_usu_tecnico_asig: "Christian Aldredo Apraez Torres",
        id_estado: 3,
        estado: "Asignado",
        color: "#0CA678",
    },
    {
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "Mauricio Vasco",
        id_estado: 5,
        estado: "Finalizado",
        color: "#1D72FE",
    },
    {
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "",
        id_estado: 1,
        estado: "Pendiente",
        color: "#F59F00",
    },
];

export const SoportesTable = ({ menu, role }) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: "id_estado", //access nested data with dot notation
                header: "Estado",
                Cell: ({ cell }) => (
                    <Badge variant="light" radius="sm" color={cell.row.original.color}>
                        {cell.row.original.estado}
                    </Badge>
                ),
            },
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
        renderRowActionMenuItems: ({ row }) =>
            menu === 1 ? <MenuSolicitudTable /> : <MenuTable_E />,
        /* mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.atendido === 0 ? "#CB3234" : "",
                color: cell.row.original.atendido === 0 ? "white" : "",
            },
        }), */
        renderDetailPanel: ({ row }) => (
            <Table.ScrollContainer minWidth={800}>
                <Table
                    verticalSpacing="md"
                    withColumnBorders
                    withRowBorders={false}
                >
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Text fz="sm">
                                    PROBLEMA CON LA IMPRESORA, AL SCANEAR POR EL
                                    ADF SALE CON UNA RAYA
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Incidencia
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text fz="sm">
                                    SE SOLUCIONA CAMBIANDOLE EL TONER A LA
                                    IMPRESORA
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Retrospectiva del técnico
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge radius="sm">SOPORTE EN SOFTWARE</Badge>
                                <Text fz="xs" c="dimmed">
                                    Tipo soporte
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
