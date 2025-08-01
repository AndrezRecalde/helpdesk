import { useCallback, useMemo } from "react";
import { MenuTable_E, TableContent, TextSection } from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { usePeriodoStore, useUiPeriodo } from "../../../../hooks";

export const PeriodoInfoTable = ({ data }) => {
    const { original } = data;
    const { periodo_vacacionales } = original;
    const { setActivatePeriodo } = usePeriodoStore();
    const { modalActionEditPeriodo } = useUiPeriodo();

    const columns = useMemo(
        () => [
            {
                header: "Anio",
                accessorFn: (row) => row.anio,
                size: 80,
            },
            {
                header: "Dias Totales",
                accessorFn: (row) => row.dias_total,
                size: 80,
            },
            {
                header: "Dias Tomados",
                accessorFn: (row) => row.dias_tomados,
                size: 80,
            },
            {
                header: "Dias Disponibles",
                accessorFn: (row) => row.dias_disponibles,
                size: 80,
            },
            {
                header: "Total Permisos (Dias)",
                accessorFn: (row) => row.dias_equivalentes_permiso,
                size: 80,
            },
            {
                header: "Disponibilidad Vacaciones",
                accessorFn: (row) => row.disponibilidad_vacaciones, //row.dias_disponibles - row.dias_equivalentes_permiso,
                size: 80,
            },
            {
                header: "Observación",
                accessorFn: (row) => "Sin observación", //row.dias_disponibles - row.dias_equivalentes_permiso,
                size: 80,
            },
        ],
        [periodo_vacacionales]
    );

    const handleEdit = useCallback(
        (selected) => {
            console.log(selected);
            setActivatePeriodo(selected);
            modalActionEditPeriodo(true);
            //setActivateUser(selected);
            //modalActionUser(false, true);
        },
        [periodo_vacacionales]
    );

    const table = useMantineReactTable({
        columns,
        data: periodo_vacacionales, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableFilters: false,
        enableColumnDragging: false,
        enableHiding: false,
        enableStickyHeader: false,
        enableColumnActions: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEdit} />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <TextSection mt={10} fw={700}>Informacion de los periodos</TextSection>
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
