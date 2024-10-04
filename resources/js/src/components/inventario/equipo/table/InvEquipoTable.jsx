import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_VE, TableContent } from "../../../../components";
import { useCallback, useMemo } from "react";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoTable = () => {
    const { isLoading, invEquipos, setActivateInvEquipo } = useInvEquipoStore();
    const { modalActionViewEquipo } = useInvUiEquipo();

    const columns = useMemo(
        () => [
            {
                header: "Equipo",
                accessorKey: "nombre_equipo",
                filterVariant: "autocomplete",
            },
            {
                header: "Código",
                accessorFn: (row) =>
                    row.codigo_antiguo + " " + row.codigo_nuevo, //normal accessorKey
                filterVariant: "autocomplete",
            },
            {
                header: "Número de serie",
                accessorKey: "numero_serie",
            },
            {
                header: "Categoría",
                accessorKey: "nombre_categoria",
            },
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
        ],
        [invEquipos]
    );

    const handleEditar = useCallback(
        (selected) => {
            console.log("editar");
        },
        [invEquipos]
    );

    const handleView = useCallback(
        (selected) => {
            console.log("editar");
            modalActionViewEquipo(true);
        },
        [invEquipos]
    );

    const table = useMantineReactTable({
        columns,
        data: invEquipos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_VE
                row={row}
                handleEdit={handleEditar}
                handleView={handleView}
            />
        ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.estado_id == 3
                        ? "#71c7f5"
                        : cell.row.original.estado_id == 4
                        ? "#9af5b8"
                        : cell.row.original.estado_id == 5
                        ? "#cf001c" //#fcb281
                        : "",
                color:
                    cell.row.original.estado_id == 3
                        ? "white"
                        : cell.row.original.estado_id == 4
                        ? "black"
                        : cell.row.original.estado_id == 5 &&
                          colorScheme === "dark"
                        ? "white"
                        : cell.row.original.estado_id == 5 &&
                          colorScheme === "light"
                        ? "black"
                        : "",
            },
        }),
    });

    return <TableContent table={table} />;
};
