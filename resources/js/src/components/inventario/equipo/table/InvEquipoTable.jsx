import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    ActionReportPDF,
    MenuTable_VE,
    TableContent,
} from "../../../../components";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoTable = () => {
    const {
        isLoading,
        invEquipos,
        startShowInvEquipo,
        setActivateInvEquipo,
        startExportEquipos,
    } = useInvEquipoStore();
    const {
        modalActionEquipo,
        modalActionViewEquipo,
        modalActionDeleteEquipo,
    } = useInvUiEquipo();

    const columns = useMemo(
        () => [
            {
                header: "Código",
                accessorFn: (row) =>
                    (row.codigo_antiguo || "S/C") +
                    " : : : : " +
                    (row.codigo_nuevo || "S/C"), //normal accessorKey
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
                filterVariant: "autocomplete",
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
            //setActivateInvEquipo(selected);
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

    /* const handleAssign = useCallback(
        (selected) => {
            console.log(selected);
            setActivateInvEquipo(selected);
            modalActionAssignEquipo(true);
        },
        [invEquipos]
    ); */

    const handleDelete = useCallback(
        (selected) => {
            console.log(selected);
            setActivateInvEquipo(selected);
            modalActionDeleteEquipo(true);
        },
        [invEquipos]
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        console.log("export");
        startExportEquipos(invEquipos);
    };

    const table = useMantineReactTable({
        columns,
        data: invEquipos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) =>
            invEquipos.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_VE
                row={row}
                handleEdit={handleEditar}
                handleShow={handleShow}
                //handleAssign={handleAssign}
                handleDelete={handleDelete}
            />
        ),
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "nombre_estado"
                    ? {
                          backgroundColor: cell.row.original.color,
                          color: "white",
                      }
                    : {},
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
