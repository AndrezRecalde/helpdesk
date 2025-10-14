import { useCallback, useMemo } from "react";
import {
    MenuTable_PV,
    TableContent,
    TextSection,
} from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    usePeriodoStore,
    useUiDescuento,
    useUiPeriodo,
} from "../../../../hooks";
import { Roles } from "../../../../helpers/dictionary";

export const PeriodoInfoTable = ({ data = {}, usuario }) => {
    const { original = {} } = data ?? {};
    const periodo_vacacionales = Array.isArray(original.periodo_vacacionales)
        ? original.periodo_vacacionales
        : [];
    const { setActivatePeriodo } = usePeriodoStore();
    const { modalActionEditPeriodo } = useUiPeriodo();
    const { modalActionDescuento } = useUiDescuento();

    const columns = useMemo(
        () => [
            {
                header: "Anio",
                accessorFn: (row) => row?.anio || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Dias Totales",
                accessorFn: (row) =>
                    row?.dias_total || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Dias Tomados",
                accessorFn: (row) =>
                    row?.dias_tomados || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Dias Disponibles",
                accessorFn: (row) =>
                    row?.dias_disponibles || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Total Permisos (Dias)",
                accessorFn: (row) =>
                    row?.dias_equivalentes_permiso || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Disponibilidad Vacaciones",
                accessorFn: (row) =>
                    row?.disponibilidad_vacaciones?.toFixed(2) ||
                    "NO CONTIENE INFORMACION", //row.dias_disponibles - row.dias_equivalentes_permiso,
                size: 80,
                id: "disponibilidad_vacaciones",
            },
            {
                header: "Observación",
                accessorFn: (row) => row?.observacion || "SIN OBSERVACIÓN", //row.dias_disponibles - row.dias_equivalentes_permiso,
                size: 80,
            },
        ],
        [periodo_vacacionales]
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivatePeriodo(selected);
            modalActionEditPeriodo(true);
        },
        [periodo_vacacionales]
    );

    const handleDescuento = useCallback(
        (selected) => {
            setActivatePeriodo(selected);
            modalActionDescuento(true);
        },
        [periodo_vacacionales]
    );

    const table = useMantineReactTable({
        columns,
        data: periodo_vacacionales,
        enableFacetedValues: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableFilters: false,
        enableColumnDragging: false,
        enableHiding: false,
        enableStickyHeader: false,
        enableColumnActions: false,
        enablePagination: false,
        enableSorting: false,
        enableBottomToolbar: false,
        enableRowActions: usuario.role === Roles.NOM_VACACIONES ? true : false,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_PV
                row={row}
                handleEdit={handleEdit}
                handleDescuento={handleDescuento}
            />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <TextSection mt={10} fw={700}>
                Informacion de los periodos
            </TextSection>
        ),
        localization: MRT_Localization_ES,
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
        mantineTableBodyCellProps: ({ column }) => ({
            style:
                column.id === "disponibilidad_vacaciones"
                    ? {
                          backgroundColor: "teal",
                          color: "white",
                      }
                    : {},
        }),
    });

    return <TableContent table={table} />;
};
