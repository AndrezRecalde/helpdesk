import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    MenuTable_E,
    TableContent,
    ActionReportPDF,
    MenuTable_Periferico,
} from "../../../../components";
import {
    useInvPerifericoStore,
    useInvUiPeriferico,
    useStorageField,
} from "../../../../hooks";
import Swal from "sweetalert2";

export const InvPerifericoTable = () => {
    const {
        isLoading,
        invPerifericos,
        setActivateInvPeriferico,
        startExportComponentes,
        startClearEquipo,
    } = useInvPerifericoStore();
    const { modalActionPeriferico, modalActionAsignarEquipo } =
        useInvUiPeriferico();
    const { storageFields } = useStorageField();

    const columns = useMemo(
        () => [
            {
                header: "Periférico",
                accessorKey: "nombre_periferico",
                filterVariant: "autocomplete",
            },
            {
                header: "Marca",
                accessorKey: "nombre_marca",
                filterVariant: "autocomplete",
            },
            {
                header: "Nro. serie",
                accessorKey: "numero_serie",
                filterVariant: "autocomplete",
            },
            {
                header: "Equipo al que pertenece",
                accessorFn: (row) =>
                    row?.equipo?.codigo_nuevo || "No pertenece a ningún equipo",
            },
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
        ],
        [invPerifericos]
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvPeriferico(selected);
            modalActionPeriferico(true);
        },
        [invPerifericos]
    );

    const handleAsignar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvPeriferico(selected);
            modalActionAsignarEquipo(true);
        },
        [invPerifericos]
    );

    const handleClearEquipo = useCallback(
        (selected) => {
            //const { pivot = {} } = selected;
            console.log(selected);

            Swal.fire({
                text: `¿Deseas remover el equipo a este periférico?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, remover!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startClearEquipo(selected, storageFields);
                }
            });
        },
        [invPerifericos]
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        startExportComponentes(invPerifericos);
        //console.log("export");
    };

    const table = useMantineReactTable({
        columns,
        data: invPerifericos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Periferico
                row={row}
                handleEdit={handleEditar}
                handleAsignar={handleAsignar}
                handleClearEquipo={handleClearEquipo}
            />
        ),
        renderTopToolbarCustomActions: ({ table }) =>
            invPerifericos.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null,
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
