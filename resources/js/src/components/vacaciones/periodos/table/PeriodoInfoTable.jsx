import { useMemo } from "react";
import { TableContent } from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";

export const PeriodoInfoTable = ({ data }) => {
    const { original } = data;
    const { periodo_vacacionales } = original;

    const columns = useMemo(
        () => [
            {
                header: "Anio",
                accessorFn: (row) => row.anio,
                size: 80,
            },
            {
                header: "Dias Totales",
                accessorFn: (row) => row.dias_total,
                size: 80,
            },
            {
                header: "Dias Tomados",
                accessorFn: (row) => row.dias_tomados,
                size: 80,
            },
            {
                header: "Dias Disponibles",
                accessorFn: (row) => row.dias_disponibles,
                size: 80,
            },
        ],
        [periodo_vacacionales]
    );

    const table = useMantineReactTable({
        columns,
        data: periodo_vacacionales, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableFilters: false,
        enableColumnDragging: false,
        enableHiding: false,
        enableColumnActions: false,
        enableRowActions: true,
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
