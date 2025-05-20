import { useMemo } from "react";
import { Badge } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { DetailSolicitudesActualesTable, TableContent, TextSection } from "../../../components";
import { useSoporteStore } from "../../../hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español

export const SoportesUsersTable = () => {
    const { isLoading, soportes } = useSoporteStore();
    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop",
                Cell: ({ cell }) => (
                    <div>
                        <Badge color={cell.row.original.color} variant="dot">
                            {cell.row.original.numero_sop}
                        </Badge>
                        <TextSection fs="italic" fz={12} tt="">
                            — {dayjs(cell.row.original.fecha_ini).fromNow()}
                        </TextSection>
                    </div>
                ),
                header: "No. Soporte",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"), //access nested data with dot notation
                header: "Fecha - Hora",
            },

            {
                accessorFn: (row) =>
                    (row?.tecnico_asignado || "NO ASIGNADO")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "estado",
                header: "Estado",
                Cell: ({ cell }) => (
                    <Badge
                        variant="dot"
                        color={cell.row.original.color}
                    >
                        {cell.row.original.estado}
                    </Badge>
                ),
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
                        ? "#fa6e70"
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null ? "white" : "",
            },
        }),
        renderDetailPanel: ({ row }) => (
            <DetailSolicitudesActualesTable row={row} />
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
