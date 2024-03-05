import { useMemo } from "react";
import { Badge, Table, Text } from "@mantine/core";
import { TableContent } from "../..";
import { useMantineReactTable } from "mantine-react-table";
import { useSoporteStore } from "../../../hooks";
import dayjs from "dayjs";

export const SolicitudesAnuladasTable = () => {
    const { isLoading, soportes } = useSoporteStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"), //access nested data with dot notation
                header: "Fecha - Hora",
            },
            {
                accessorKey: "usuario_recibe", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion", //normal accessorKey
                header: "Departamento del usuario",
                filterVariant: "autocomplete",
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
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
                                <Text fz="sm">{row.original.incidente}</Text>
                                <Text fz="xs" c="dimmed">
                                    Incidencia
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text fz="sm">{row.original.obs_anulado}</Text>
                                <Text fz="xs" c="dimmed">
                                    Observación de anulación
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge radius="sm" color="red">
                                    {row.original.estado}
                                </Badge>
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
