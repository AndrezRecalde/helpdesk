import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_VE, TableContent } from "../../../../components";
import { useCallback, useMemo } from "react";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoTable = () => {
    const { isLoading, invEquipos, startShowInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { modalActionEquipo, modalActionViewEquipo, modalActionAssignEquipo, modalActionDeleteEquipo } = useInvUiEquipo();

    const columns = useMemo(
        () => [
            {
                header: "Código",
                accessorFn: (row) =>
                    row.codigo_antiguo + " || " + row.codigo_nuevo, //normal accessorKey
                filterVariant: "autocomplete",
            },
            {
                header: "Equipo",
                accessorFn: (row) => row.nombre_marca + " " + row.modelo,
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
            modalActionEquipo(true);
            startShowInvEquipo(selected);
        },
        [invEquipos]
    );

    const handleShow = useCallback(
        (selected) => {
            console.log(selected);
            modalActionViewEquipo(true);
            startShowInvEquipo(selected);
        },
        [invEquipos]
    );

    const handleAssign = useCallback(
        (selected) => {
            console.log(selected);
            setActivateInvEquipo(selected);
            modalActionAssignEquipo(true);
        },
        [invEquipos]
    );

    const handleDelete = useCallback(
        (selected) => {
            console.log(selected);
            setActivateInvEquipo(selected);
            modalActionDeleteEquipo(true);
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
                handleShow={handleShow}
                handleAssign={handleAssign}
                handleDelete={handleDelete}
            />
        ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.estado_id == 1
                        ? "#08c2a6"
                        : cell.row.original.estado_id == 2
                        ? "#9af5b8"
                        : cell.row.original.estado_id == 3
                        ? "#cf001c" //#fcb281
                        : "",
                color:
                    cell.row.original.estado_id == 1
                        ? "white"
                        : cell.row.original.estado_id == 2
                        ? "black"
                        : cell.row.original.estado_id == 3 &&
                          colorScheme === "dark"
                        ? "white"
                        : cell.row.original.estado_id == 3 &&
                          colorScheme === "light"
                        ? "black"
                        : "",
            },
        }),
        mantineTableProps: {
            withColumnBorders: true,
            striped: true,
            //withTableBorder: colorScheme === "light",
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
