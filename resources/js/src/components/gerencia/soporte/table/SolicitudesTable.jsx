import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    DetailSolicitudesActualesTable,
    MenuSolicitudTable,
    MenuTable_T,
    TableContent,
    TextSection,
} from "../../../../components";
import { Badge, useMantineColorScheme } from "@mantine/core";
import { useSoporteStore, useUiSoporte } from "../../../../hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español

export const SolicitudesTable = ({ menu, isLoading }) => {
    const { colorScheme } = useMantineColorScheme();
    const { soportes, setActivateSoporte, startExportSoporte } =
        useSoporteStore();
    const {
        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionDiagnosticar,
    } = useUiSoporte();
    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop",
                Cell: ({ cell }) => (
                    <div>
                        <Badge color={cell.row.original.color} variant="dot">
                            {cell.row.original.numero_sop}
                        </Badge>
                        <TextSection fs="italic" fz={12} tt="">
                            — {dayjs(cell.row.original.fecha_ini).fromNow()}
                        </TextSection>
                    </div>
                ),
                header: "No. Soporte",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    (row?.direccion || "SIN DIRECCION")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Departamento del solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    (row?.usuario_recibe || "SIN SOLICITANTE")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    (row?.tecnico_asignado || "NO ASIGNADO")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        []
    );

    const handleAsignar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionAsignarSoporte(1);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionAnularSoporte(1);
    }, []);

    const handleDiagnosticar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionDiagnosticar(1);
    }, []);

    const handleExportSoporte = useCallback((id_sop) => {
        startExportSoporte(id_sop);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) =>
            menu === 1 ? (
                <MenuSolicitudTable
                    row={row}
                    isEdit={false}
                    handleDiagnosticar={handleDiagnosticar}
                    handleAsignar={handleAsignar}
                    handleAnular={handleAnular}
                    handleExport={handleExportSoporte}
                />
            ) : (
                <MenuTable_T
                    row={row}
                    handleDiagnosticar={handleDiagnosticar}
                    handleExport={handleExportSoporte}
                />
            ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.tecnico_asignado === null
                        ? "#fa6e70"
                        : cell.row.original.id_estado == 5
                        ? "#fcb281"
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null
                        ? "white"
                        : cell.row.original.id_estado == 5 &&
                          colorScheme === "dark"
                        ? "white"
                        : cell.row.original.id_estado == 5 &&
                          colorScheme === "light"
                        ? "black"
                        : "",
            },
        }),
        renderDetailPanel: ({ row }) => (
            <DetailSolicitudesActualesTable row={row} />
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
