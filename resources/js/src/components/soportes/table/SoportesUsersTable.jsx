import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { Table } from "@mantine/core";
import { TableContent, TextSection } from "../../../components";
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
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={250}>Incidencia</Table.Th>
                        <Table.Td>{row.original.incidente}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th w={250}>Retrospectiva del técnico</Table.Th>
                        <Table.Td>
                            <TextSection tt="">
                                {row.original.solucion ?? "Aun sin solución"}
                            </TextSection>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    return <TableContent table={table} />;
};
