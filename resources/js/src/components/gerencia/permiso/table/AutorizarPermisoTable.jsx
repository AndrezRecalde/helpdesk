import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    MenuTable_AutorizarPermiso,
    TableContent,
} from "../../../../components";
import { usePermisoStore } from "../../../../hooks";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const ANULAR_PERMISO = 6;
const AUTORIZAR_PERMISO = 2;

export const AutorizarPermisoTable = () => {
    const {
        isLoading,
        permisos,
        startLoadPermisos,
        setActivatePermiso,
        startUpdateEstadoPermiso,
    } = usePermisoStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
                filterVariant: "autocomplete",
                size: 80,
            },
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código",
                size: 80,
            },
            {
                accessorKey: "usuario_pide", //access nested data with dot notation
                header: "Usuario solicitante",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("YYYY-MM-DD"),
                header: "Fecha",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("HH:mm:ss"),
                header: "Hora de Salida",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_llegada).format("HH:mm:ss"),
                header: "Hora de llegada",
                size: 80,
            },
            {
                accessorKey: "per_observaciones", //access nested data with dot notation
                header: "Observaciones",
            },
        ],
        [permisos]
    );

    const handleAnularPermiso = useCallback(
        (selected) => {
            //setActivatePermiso(selected);
            Swal.fire({
                title: "¿Estas seguro?",
                text: `¿Confirmas en anular el permiso
                        ${selected.idper_permisos} perteneciente
                        a ${selected.usuario_pide}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startUpdateEstadoPermiso(selected, ANULAR_PERMISO);
                }
            });
        },
        [permisos]
    );

    const handleAutorizarPermiso = useCallback(
        (selected) => {
            //setActivatePermiso(selected);
            Swal.fire({
                title: "¿Estas seguro?",
                text: `¿Confirmas en autorizar el permiso
                        ${selected.idper_permisos} perteneciente
                        a ${selected.usuario_pide}?`,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startUpdateEstadoPermiso(selected, AUTORIZAR_PERMISO);
                }
            });
        },
        [permisos]
    );

    const table = useMantineReactTable({
        columns,
        data: permisos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_AutorizarPermiso
                row={row}
                handleAnular={handleAnularPermiso}
                handleAutorizar={handleAutorizarPermiso}
            />
        ),
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "estado"
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
