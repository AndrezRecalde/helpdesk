import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_Per, TableContent } from "../../../components";
import { usePermisoStore, useUiPermiso } from "../../../hooks";
import dayjs from "dayjs";

export const PermisosTable = () => {
    const { isLoading, permisos, startCardPermiso, setActivatePermiso } =
        usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
    const columns = useMemo(
        () => [
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código permiso",
            },
            {
                accessorKey: "usuario_pide", //access nested data with dot notation
                header: "Usuario solicitante",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("YYYY-MM-DD"),
                header: "Fecha",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("HH:mm:ss"),
                header: "Hora de Salida",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_llegada).format("HH:mm:ss"),
                header: "Hora de llegada",
            },
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
            },
            {
                accessorKey: "per_observaciones", //access nested data with dot notation
                header: "Observaciones",
            },
        ],
        [permisos]
    );

    const handleExport = useCallback((selected) => {
        setActivatePermiso(selected);
        startCardPermiso(selected.idper_permisos);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivatePermiso(selected);
        modalActionAnularPermiso(1);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: permisos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Per
                row={row}
                handleAnular={handleAnular}
                handleExport={handleExport}
            />
        ),
    });

    return <TableContent table={table} />;
};
