import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuTableActions, TableContent } from "../../../../components";
import { useDirectorStore, useUiDirector } from "../../../../hooks";
import { IconEditCircle } from "@tabler/icons-react";

export const DireccionesTable = () => {
    const { isLoading, directores, setActivateDirectores } = useDirectorStore();
    const { modalActionDirector } = useUiDirector();

    const handleEdit = useCallback(
        (selected) => {
            setActivateDirectores(selected);
            modalActionDirector(1);
        },
        [directores],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: "nmbre_dprtmnto", //access nested data with dot notation
                header: "Dirección",
            },
            {
                accessorKey: "jefe", //access nested data with dot notation
                header: "Director del área",
                //filterVariant: 'autocomplete',
            },
            {
                accessorKey: "encargado", //normal accessorKey
                header: "Jefe encargado",
            },
        ],
        [directores],
    );

    const table = useMantineReactTable({
        columns,
        data: directores, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEdit,
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
