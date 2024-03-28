import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_Per, TableContent } from "../../../components";
import dayjs from "dayjs";
import { usePermisoStore, useUiPermiso } from "../../../hooks";

export const PermisosTable = () => {
    const { isLoading, permisos, startExportPermiso, setActivatePermiso } =
        usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
    const columns = useMemo(
        () => [
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código permiso",
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
                accessorKey: "per_observaciones", //access nested data with dot notation
                header: "Observaciones",
            },
        ],
        [permisos]
    );

    const handleExport = useCallback((selected) => {
        setActivatePermiso(selected);
        startExportPermiso(selected);
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
