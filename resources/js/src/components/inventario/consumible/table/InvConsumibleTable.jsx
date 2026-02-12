import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { MenuTableActions, TableContent } from "../../../../components";
import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";
import { NavLink } from "@mantine/core";
import { IconEditCircle } from "@tabler/icons-react";

export const InvConsumibleTable = () => {
    const { isLoading, consumibles, setActivateInvConsumible } =
        useInvConsumibleStore();
    const { modalActionConsumible, modalActionStockConsumible } =
        useUiInvConsumible();

    const columns = useMemo(
        () => [
            {
                header: "Codigo",
                accessorKey: "codigo",
                filterVariant: "autocomplete",
            },
            {
                header: "Consumible",
                accessorKey: "nombre_consumible",
                filterVariant: "autocomplete",
            },
            {
                header: "Categoría",
                accessorKey: "categoria.nombre_categoria",
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
        [consumibles],
    );

    const handleStock = useCallback(
        (selected) => {
            setActivateInvConsumible(selected);
            modalActionStockConsumible(true);
        },
        [consumibles],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvConsumible(selected);
            modalActionConsumible(true);
        },
        [consumibles],
    );

    const table = useMantineReactTable({
        columns,
        data: consumibles, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEditar,
                    },
                ]}
            />
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
