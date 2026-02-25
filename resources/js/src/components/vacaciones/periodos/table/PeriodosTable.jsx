import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuTableActions, TableContent } from "../../../../components";
import { usePeriodoStore, useUiUser, useUsersStore } from "../../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { PeriodoInfoTable } from "./PeriodoInfoTable";
import dayjs from "dayjs";
import { Roles } from "../../../../helpers/dictionary";
import { IconEditCircle } from "@tabler/icons-react";

export const PeriodosTable = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, periodos, paginacion } = usePeriodoStore();
    const { startLoadPeriodos } = usePeriodoStore();
    const { setActivateUser } = useUsersStore();
    const { modalActionUser } = useUiUser();

    const [paginationServer, setPaginationServer] = useState({
        pageIndex: 0,
        pageSize: 15,
    });

    // Sincronizar el estado del paginador con la respuesta del backend
    useEffect(() => {
        if (paginacion) {
            setPaginationServer((prev) => {
                const newPageIndex = Number(paginacion.pagina_actual || 1) - 1;
                const newPageSize = Number(paginacion.por_pagina || 15);

                if (
                    prev.pageIndex !== newPageIndex ||
                    prev.pageSize !== newPageSize
                ) {
                    return { pageIndex: newPageIndex, pageSize: newPageSize };
                }
                return prev;
            });
        }
    }, [paginacion]);

    // Cargar datos cuando cambia la paginación (solo si hay filtros aplicados)
    useEffect(() => {
        // Evitar petición duplicada si el estado de paginación coincide con el de Redux
        const isSyncedWithRedux =
            paginacion &&
            paginationServer.pageIndex + 1 ===
                Number(paginacion.pagina_actual || 1) &&
            paginationServer.pageSize === Number(paginacion.por_pagina || 15);

        if (!isSyncedWithRedux) {
            startLoadPeriodos({
                cdgo_usrio: null,
                por_pagina: paginationServer.pageSize,
                pagina_actual: paginationServer.pageIndex + 1,
            });
        }
    }, [paginationServer.pageIndex, paginationServer.pageSize]);

    const columns = useMemo(
        () => [
            {
                header: "Departamento",
                accessorFn: (row) =>
                    (row?.departamento || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
                size: 230,
                wrap: true,
            },
            {
                header: "Cédula",
                accessorFn: (row) =>
                    (row?.usu_ci || "NO CONTIENE CEDULA")
                        .toString()
                        .toUpperCase(),
                size: 80,
            },
            {
                header: "Servidor",
                accessorFn: (row) =>
                    (row?.nmbre_usrio || "NO CONTIENE NOMBRES")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
            },
            {
                header: "Cargo",
                accessorFn: (row) =>
                    (row?.cargo || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),

                size: 80,
            },
            {
                header: "Regímen",
                accessorFn: (row) =>
                    (row?.nombre_regimen || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
                size: 80,
                filterVariant: "autocomplete",
                wrap: true,
            },
            {
                header: "Fecha Ingreso",
                accessorFn: (row) =>
                    dayjs(row?.fecha_ingreso).isValid()
                        ? dayjs(row?.fecha_ingreso).format("YYYY-MM-DD")
                        : null,
                size: 80,
            },
        ],
        [periodos],
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateUser(selected);
            modalActionUser(false, true);
        },
        [periodos],
    );

    const table = useMantineReactTable({
        columns,
        data: periodos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: {
            showProgressBars: isLoading,
            pagination: paginationServer,
        },
        manualPagination: true,
        rowCount: paginacion?.total,
        pageCount: paginacion?.ultima_pagina,
        onPaginationChange: setPaginationServer,
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: usuario.permissions?.includes(
            "tthh.vacaciones.gestionar",
        ),
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Actualizar Fecha Ingreso",
                        onClick: handleEdit,
                    },
                ]}
            />
        ),
        renderDetailPanel: ({ row }) => (
            <PeriodoInfoTable data={row} usuario={usuario} />
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
    });

    return <TableContent table={table} />;
};
