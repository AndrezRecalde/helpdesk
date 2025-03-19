import { useCallback, useMemo } from "react";
import { MenuTable_Consumible, MenuTable_E, TableContent } from "../../..";
import { useMantineReactTable } from "mantine-react-table";
import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";
import { NavLink } from "@mantine/core";

export const InvConsumibleTable = () => {
    const { isLoading, consumibles, setActivateInvConsumible } =
        useInvConsumibleStore();
    const {
        modalActionConsumible,
        modalActionStockConsumible,
        modalActionHistorialConsumible,
    } = useUiInvConsumible();

    const columns = useMemo(
        () => [
            {
                header: "Consumible",
                accessorKey: "nombre_consumible",
                filterVariant: "autocomplete",
            },
            {
                header: "Categoría",
                accessorKey: "nombre_categoria",
                filterVariant: "autocomplete",
            },
            {
                header: "Stock",
                accessorKey: "stock",
                Cell: ({ cell }) => (
                    <NavLink
                        onClick={() => handleStock(cell.row.original)}
                        label={cell.getValue()}
                    />
                ),
            },
            {
                header: "Estado",
                accessorFn: (row) => (row.activo === 1 ? "Activo" : "Inactivo"),
                filterVariant: "autocomplete",
            },
        ],
        [consumibles]
    );

    const handleStock = useCallback(
        (selected) => {
            setActivateInvConsumible(selected);
            modalActionStockConsumible(true);
        },
        [consumibles]
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvConsumible(selected);
            modalActionConsumible(true);
        },
        [consumibles]
    );

    const handleHistorial = useCallback(
        (selected) => {
            setActivateInvConsumible(selected);
            modalActionHistorialConsumible(true);
        },
        [consumibles]
    );

    const table = useMantineReactTable({
        columns,
        data: consumibles, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Consumible
                row={row}
                handleEdit={handleEditar}
                handleHistorial={handleHistorial}
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
