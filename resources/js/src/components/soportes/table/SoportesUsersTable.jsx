import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { Table, Text } from "@mantine/core";
import { TableContent } from "../../../components";
import { useSoporteStore } from "../../../hooks";
import dayjs from "dayjs";

export const SoportesUsersTable = () => {
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
                accessorFn: (row) => row.tecnico_asignado ?? "No asignado", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "estado", //normal accessorKey
                header: "Estado",
                filterVariant: "autocomplete",
            },
        ],
        [soportes]
    );

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.tecnico_asignado === null
                        ? "#CB3234"
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null ? "white" : "",
            },
        }),
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
                                <Text fz="sm">
                                    {row.original.solucion ??
                                        "Aun sin solución"}
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Retrospectiva del técnico
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
