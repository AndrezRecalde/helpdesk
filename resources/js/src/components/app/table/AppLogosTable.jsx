import { useCallback, useMemo } from "react";
import { MenuTable_E, TableContent } from "../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { useAppStore, useUiApp } from "../../../hooks";

export const AppLogosTable = () => {
    const { isLoading, imagenes } = useAppStore();
    const { modalActionApplication } = useUiApp();
    const columns = useMemo(
        () => [
            {
                header: "Imagen Login",
                accessorFn: (row) => row.imagen_login,
            },
            {
                header: "Imagen Fondo",
                accessorFn: (row) => row.imagen_fondo,
            },
            {
                header: "Imgen Logo",
                accessorFn: (row) => row.imagen_logo,
            },
        ],
        [imagenes]
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateImagenes(selected);
            modalActionApplication(true);
        },
        [imagenes]
    );

    const table = useMantineReactTable({
        columns,
        data: imagenes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEdit} />
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
