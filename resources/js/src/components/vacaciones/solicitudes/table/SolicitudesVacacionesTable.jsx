import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuTableActions, TableContent } from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { useUiVacaciones, useVacacionesStore } from "../../../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
    IconChecks,
    IconBan,
    IconNotesOff,
    IconPrinter,
} from "@tabler/icons-react";

export const SolicitudesVacacionesTable = ({ usuario }) => {
    const {
        isLoading,
        solicitudes,
        paginacion,
        ultimosFiltros,
        setActivateVacacion,
        startExportFichaVacaciones,
        startLoadSolicitudesVacaciones,
        startAnularSolicitudVacacion,
    } = useVacacionesStore();
    const { modalActionSolAnulacion, modalActionGestionarVacacion } =
        useUiVacaciones();

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
        if (ultimosFiltros.anio !== null && !isSyncedWithRedux) {
            startLoadSolicitudesVacaciones({
                ...ultimosFiltros,
                por_pagina: pagination.pageSize,
                pagina_actual: pagination.pageIndex + 1, // Mantine usa índice 0, Laravel usa página 1
            });
        }
    }, [pagination.pageIndex, pagination.pageSize]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "estado",
                header: "Estado",
                size: 80,
            },
            {
                accessorKey: "solicitante", //access nested data with dot notation
                header: "Solicitante",
            },
            {
                accessorKey: "codigo_vacacion", //access nested data with dot notation
                header: "Código",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_inicio).format("YYYY-MM-DD"), //access nested data with dot notation
                header: "Fecha Inicio",
                size: 80,
            },
            {
                accessorFn: (row) => dayjs(row.fecha_fin).format("YYYY-MM-DD"),
                header: "Fecha Final",
                size: 80,
            },
            {
                accessorKey: "motivo_vacaciones",
                header: "Motivo",
            },
            {
                accessorKey: "dias_solicitados",
                header: "Dias solicitados",
                size: 80,
            },
        ],
        [],
    );

    const handleAnular = useCallback(
        (selected) => {
            Swal.fire({
                title: "¿Desea anular esta solicitud?",
                text:
                    "Estas tratando de anular la solicitud de vacaciones No. " +
                    selected.codigo_vacacion,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#106ee8",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, anular solicitud!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { status } =
                        await startAnularSolicitudVacacion(selected);
                    if (status) {
                        Swal.fire({
                            title: "¡Anulada!",
                            text: `La solicitud ${selected.codigo_vacacion} fue anulada correctamente.`,
                            icon: "success",
                            confirmButtonColor: "#106ee8",
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo anular la solicitud. Intente nuevamente.",
                            icon: "error",
                            confirmButtonColor: "#106ee8",
                        });
                    }
                }
            });
        },
        [solicitudes],
    );

    const handleAutorizar = useCallback(
        (selected) => {
            setActivateVacacion(selected);
            modalActionGestionarVacacion(true);
        },
        [solicitudes],
    );

    const handleSolicitarAnulacion = useCallback(
        (selected) => {
            setActivateVacacion(selected);
            modalActionSolAnulacion(true);
        },
        [solicitudes],
    );

    const handleExport = useCallback(
        (selected) => {
            Swal.fire({
                text: `¿Deseas imprimir la ficha ${selected.codigo_vacacion}?`,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, imprimir!",
            }).then((result) => {
                if (result.isConfirmed) {
                    //console.log(selected.codigo_vacacion);
                    startExportFichaVacaciones(selected.codigo_vacacion);
                    //console.log(message.idper_permisos)
                }
            });
        },
        [solicitudes],
    );

    const table = useMantineReactTable({
        columns,
        data: solicitudes,
        state: {
            showProgressBars: isLoading,
            pagination,
        },
        manualPagination: true,
        rowCount: paginacion.total,
        pageCount: paginacion.ultima_pagina,
        onPaginationChange: setPagination,
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => {
            const isAdministrator = usuario.permissions?.includes(
                "tthh.vacaciones.gestionar",
            );
            const estado = row.original.estado;
            const canAutorizar =
                estado === "NUEVO" || estado === "EN PROCESO DE ANULACION";
            const canAnular =
                estado === "NUEVO" || estado === "EN PROCESO DE ANULACION";
            const canImprimir =
                estado === "NUEVO" ||
                estado === "APROBADO" ||
                estado === "EN PROCESO DE ANULACION";

            return (
                <MenuTableActions
                    row={row}
                    actions={[
                        {
                            icon: IconChecks,
                            label: "Autorizar Vacación",
                            onClick: handleAutorizar,
                            disabled: !canAutorizar,
                            visible: isAdministrator,
                        },
                        {
                            icon: IconBan,
                            label: "Anular Vacación",
                            onClick: handleAnular,
                            disabled: !canAnular,
                            visible: isAdministrator,
                        },
                        {
                            icon: IconNotesOff,
                            label: "Solicitud de Anulación",
                            onClick: handleSolicitarAnulacion,
                            disabled: !canAutorizar,
                            visible: !isAdministrator,
                        },
                        {
                            icon: IconPrinter,
                            label: "Imprimir",
                            onClick: handleExport,
                            disabled: !canImprimir,
                        },
                    ]}
                />
            );
        },
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
