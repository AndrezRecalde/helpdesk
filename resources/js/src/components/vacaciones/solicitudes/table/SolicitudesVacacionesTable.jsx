import { useCallback, useMemo } from "react";
import {
    MenuTable_AutorizarVacacion,
    TableContent,
} from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { useUiVacaciones, useVacacionesStore } from "../../../../hooks";
import { Roles } from "../../../../helpers/dictionary";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const SolicitudesVacacionesTable = ({ usuario }) => {
    const {
        isLoading,
        solicitudes,
        setActivateVacacion,
        startExportFichaVacaciones,
    } = useVacacionesStore();
    const { modalActionSolAnulacion, modalActionGestionarVacacion } =
        useUiVacaciones();

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
        [solicitudes]
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
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#106ee8",
                    });
                }
            });
        },
        [solicitudes]
    );

    const handleAutorizar = useCallback(
        (selected) => {
            setActivateVacacion(selected);
            modalActionGestionarVacacion(true);
        },
        [solicitudes]
    );

    const handleSolicitarAnulacion = useCallback(
        (selected) => {
            setActivateVacacion(selected);
            modalActionSolAnulacion(true);
        },
        [solicitudes]
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
        [solicitudes]
    );

    const table = useMantineReactTable({
        columns,
        data: solicitudes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_AutorizarVacacion
                row={row}
                isAdministrator={
                    usuario.role === Roles.NOM_VACACIONES ? true : false
                }
                handleAnular={handleAnular}
                handleAutorizar={handleAutorizar}
                handleSolicitarAnulacion={handleSolicitarAnulacion}
                handleExport={handleExport}
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
