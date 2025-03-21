import { useMemo } from "react";
import { TableContent, TitlePage } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";

export const TableMarcacionRelojOnline = () => {
    const { marcaciones } = useMarcacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME", //access nested data with dot notation
                header: "SERVIDOR",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) => dayjs(row.EVENTO_FECHA).format("YYYY-MM-DD"), //access nested data with dot notation
                header: "FECHA DE MARCACION",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.CHECKTYPE !== null
                        ? dayjs(row.CHECKTIME).format("HH:mm:ss")
                        : "SIN MARCACION", //normal accessorKey
                header: "HORA DE MARCACION",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            },
            /* {
                accessorFn: (row) =>
                    row.SENSORID !== null ? row.SENSORID : null,
                header: "SENSOR RELOJ",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            }, */
            /* {
                accessorFn: (row) =>
                    row.STARTSPECDAY !== null
                        ? dayjs(row.STARTSPECDAY).format("YYYY-MM-DD")
                        : null,
                header: "FECHA PERMISO",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            }, */
            /* {
                accessorFn: (row) =>
                    row.STARTSPECDAY !== null
                        ? dayjs(row.STARTSPECDAY).format("HH:mm:ss")
                        : null,
                header: "HORA INICIO PERMISO",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            }, */
           /*  {
                accessorFn: (row) =>
                    row.STARTSPECDAY !== null
                        ? dayjs(row.ENDSPECDAY).format("HH:mm:ss")
                        : null,
                header: "HORA FINAL PERMISO",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            }, */
            {
                accessorFn: (row) =>
                    row.LeaveName !== null ? row.LeaveName : null,
                header: "OBSERVACION",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderTopToolbarCustomActions: ({ table }) => (
            <TitlePage order={3}>Marcaciones desde el Biométrico</TitlePage>
        ),
        initialState: { showColumnFilters: true, showGlobalFilter: true },
        enableFacetedValues: true,
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.LeaveName !== null ? "#448af2" : null,
                color: cell.row.original.LeaveName !== null ? "white" : null,
            },
        }),
        mantineTableProps: {
            highlightOnHover: false,
            withColumnBorders: false,
            withTableBorder: false,
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
