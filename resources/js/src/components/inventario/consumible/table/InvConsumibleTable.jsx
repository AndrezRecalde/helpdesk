import { useCallback, useEffect, useMemo, useState } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    ConsumibleStockModal,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";
import { NavLink } from "@mantine/core";
import { IconEditCircle } from "@tabler/icons-react";

export const InvConsumibleTable = () => {
    const {
        isLoading,
        consumibles,
        paginacion,
        ultimosFiltros,
        startLoadInvConsumibles,
        setActivateInvConsumible,
    } = useInvConsumibleStore();
    const { modalActionConsumible, modalActionStockConsumible } =
        useUiInvConsumible();

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

    // Cargar datos cuando cambia la paginación
    useEffect(() => {
        // Evitar petición duplicada si el estado de paginación coincide con el de Redux
        const isSyncedWithRedux =
            paginacion &&
            pagination.pageIndex + 1 ===
                Number(paginacion.pagina_actual || 1) &&
            pagination.pageSize === Number(paginacion.por_pagina || 15);

        // Solo cargar si no está sincronizado
        if (!isSyncedWithRedux && ultimosFiltros) {
            startLoadInvConsumibles({
                categoria_id: ultimosFiltros.categoria_id,
                por_pagina: pagination.pageSize,
                pagina_actual: pagination.pageIndex + 1, // Mantine usa índice 0, Laravel usa página 1
            });
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    const columns = useMemo(
        () => [
            {
                header: "Codigo",
                accessorKey: "codigo",
                filterVariant: "autocomplete",
            },
            {
                header: "Consumible",
                accessorKey: "nombre_consumible",
                filterVariant: "autocomplete",
            },
            {
                header: "Categoría",
                accessorKey: "categoria.nombre_categoria",
                filterVariant: "autocomplete",
            },
            {
                header: "Stock",
                accessorKey: "stock",
                Cell: ({ cell }) => (
                    <NavLink
                        onClick={() => handleStock(cell.row.original)}
                        label={cell.getValue()}
                    />
                ),
            },
            {
                header: "Estado",
                accessorFn: (row) => (row.activo === 1 ? "Activo" : "Inactivo"),
                filterVariant: "autocomplete",
            },
        ],
        [consumibles],
    );

    const handleStock = useCallback(
        (selected) => {
            setActivateInvConsumible(selected);
            modalActionStockConsumible(true);
        },
        [consumibles],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvConsumible(selected);
            modalActionConsumible(true);
        },
        [consumibles],
    );

    const table = useMantineReactTable({
        columns,
        data: consumibles, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: {
            showProgressBars: isLoading,
            pagination,
        },
        manualPagination: true,
        rowCount: paginacion?.total,
        pageCount: paginacion?.ultima_pagina,
        onPaginationChange: setPagination,
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEditar,
                    },
                ]}
            />
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });

    return (
        <>
            <TableContent table={table} />
            <ConsumibleStockModal />
        </>
    );
};
