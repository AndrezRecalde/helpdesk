import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    MenuTable_E,
    TableContent,
    ActionReportPDF,
} from "../../../../components";
import { useInvPerifericoStore, useInvUiPeriferico } from "../../../../hooks";

export const InvPerifericoTable = () => {
    const {
        isLoading,
        invPerifericos,
        setActivateInvPeriferico,
        startExportComponentes,
    } = useInvPerifericoStore();
    const { modalActionPeriferico } = useInvUiPeriferico();

    const columns = useMemo(
        () => [
            {
                header: "Modelo",
                accessorKey: "modelo",
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
                header: "Estado",
                accessorKey: "nombre_estado",
            },
            {
                header: "Equipo al que pertenece",
                accessorFn: (row) => row.equipo.codigo_nuevo,
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
            <MenuTable_E row={row} handleEdit={handleEditar} />
        ),
        renderTopToolbarCustomActions: ({ table }) =>
            invPerifericos.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null,
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor: cell.row.original.color,
                color: "black",
            },
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
