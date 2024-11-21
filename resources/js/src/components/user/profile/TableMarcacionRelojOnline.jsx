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
                accessorFn: (row) => dayjs(row.CHECKTIME).format("YYYY-MM-DD"), //access nested data with dot notation
                header: "FECHA",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => dayjs(row.CHECKTIME).format("HH:mm:ss"), //normal accessorKey
                header: "HORA",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            },
            {
                accessorKey: "SENSORID", //normal accessorKey
                header: "SENSOR RELOJ",
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
