import { useEffect, useMemo, useState } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { TableContent } from "../../../../components";
import { useDescuentoStore } from "../../../../hooks";

export const DescuentoVacacionesTable = () => {
    const {
        isLoading,
        descuentos,
        paginacion,
        ultimosFiltros,
        startLoadDescuentos,
    } = useDescuentoStore();
    const usuario = JSON.parse(localStorage.getItem("service_user"));

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 15,
    });

    // Sincronizar el estado del paginador con la respuesta del backend
    useEffect(() => {
        if (paginacion) {
            setPagination((prev) => {
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
            pagination.pageIndex + 1 ===
                Number(paginacion.pagina_actual || 1) &&
            pagination.pageSize === Number(paginacion.por_pagina || 15);

        // Solo cargar si hay filtros válidos aplicados (anio no es null)
        if (!isSyncedWithRedux && ultimosFiltros?.anio !== null) {
            startLoadDescuentos({
                usuario_id: usuario.cdgo_usrio,
                anio: ultimosFiltros.anio,
                por_pagina: pagination.pageSize,
                pagina_actual: pagination.pageIndex + 1, // Mantine usa índice 0, Laravel usa página 1
            });
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    const columns = useMemo(
        () => [
            {
                header: "Cedula",
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
                header: "Periodo",
                accessorFn: (row) => row?.anio || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Dias Descuento",
                accessorFn: (row) =>
                    row?.dias_descuento || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Motivo",
                accessorFn: (row) => row?.motivo || "NO CONTIENE INFORMACION",

                size: 80,
            },
            {
                header: "Ingresado Por",
                accessorFn: (row) =>
                    row?.usuario_tthh_name || "NO CONTIENE INFORMACION",
                size: 80,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: descuentos,
        state: {
            showProgressBars: isLoading,
            pagination,
        },
        localization: MRT_Localization_ES,
        manualPagination: true,
        rowCount: paginacion?.total,
        pageCount: paginacion?.ultima_pagina,
        onPaginationChange: setPagination,
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: false,
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
