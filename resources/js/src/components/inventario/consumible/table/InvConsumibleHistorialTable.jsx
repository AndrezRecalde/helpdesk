import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_Imprimir, TableContent } from "../../../../components";
import { useInvConsumibleStore } from "../../../../hooks";

export const InvConsumibleHistorialTable = () => {

    const { isLoading, historial } = useInvConsumibleStore();

     const columns = useMemo(
            () => [
                {
                    header: "Cantidad",
                    accessorKey: "cantidad_solicitada",
                    size: 80
                    //filterVariant: "autocomplete",
                },
                {
                    header: "Departamento",
                    accessorKey: "direccion",
                    filterVariant: "autocomplete",
                },
                {
                    header: "Solicitante",
                    accessorKey: "solicitante",
                    filterVariant: "autocomplete",
                },
            ],
            [historial]
        );

    const handleImprimir = useCallback(
        (selected) => {
            //console.log("editar");
        },
        [historial]
    );

    const table = useMantineReactTable({
        columns,
        data: historial, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableDensityToggle: false,
        enableColumnFilterModes: false,
        enableFullScreenToggle: false,
        enableColumnFilters: true,
        enableColumnFilterModes: false,
        enableGlobalFilter: false,
        enableRowActions: true,
        enableColumnActions: false,
        enableRowActions: false,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Imprimir
                row={row}
                handleImprimir={handleImprimir}
            />
        ),
        /* renderTopToolbarCustomActions: ({ table }) =>
            consumibles.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null, */
        /* mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "nombre_estado"
                    ? {
                          backgroundColor: cell.row.original.color,
                          color: "white",
                      }
                    : {},
        }), */
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
