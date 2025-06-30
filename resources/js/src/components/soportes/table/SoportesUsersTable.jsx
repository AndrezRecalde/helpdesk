import { useCallback, useMemo } from "react";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import {
    DetailSolicitudesActualesTable,
    TableContent,
    TextSection,
} from "../../../components";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español

export const SoportesUsersTable = ({ isLoading }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        soportes,
        startLoadSoportesAnualesUsuarios,
        startCerrarSoporte,
        setActivateSoporte,
    } = useSoporteStore();
    const { modalActionAnularSoporte } = useUiSoporte();

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
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"), //access nested data with dot notation
                header: "Fecha - Hora",
            },

            {
                accessorFn: (row) =>
                    (row?.tecnico_asignado || "NO ASIGNADO")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "estado",
                header: "Estado",
                Cell: ({ cell }) => (
                    <Badge variant="dot" color={cell.row.original.color}>
                        {cell.row.original.estado}
                    </Badge>
                ),
                filterVariant: "autocomplete",
            },
            {
                header: "Accion",
                Cell: ({ cell }) => {
                    return cell.row.original.id_estado === 3 ? (
                        <Group justify="flex-start" gap={25}>
                            <ActionIcon
                                variant="default"
                                size={40}
                                radius="xl"
                                onClick={() => handleSuccess(cell.row.original)}
                            >
                                <IconThumbUp />
                            </ActionIcon>
                            <ActionIcon
                                variant="default"
                                size={40}
                                radius="xl"
                                onClick={() => handleAnular(cell.row.original)}
                            >
                                <IconThumbDown />
                            </ActionIcon>
                        </Group>
                    ) : (
                        <TextSection fz={16}>Sin Acciones</TextSection>
                    );
                },
            },
        ],
        [soportes]
    );

    const handleSuccess = useCallback(
        (selected) => {
            const values = { id_calificacion: 5, id_estado: 4 };
            //setActivateSoporte(selected);
            startCerrarSoporte(selected, values);
            setTimeout(() => {
                startLoadSoportesAnualesUsuarios(usuario.cdgo_usrio);
            }, 2500);
        },
        [soportes]
    );

    const handleAnular = useCallback(
        (selected) => {
            setActivateSoporte(selected);
            modalActionAnularSoporte(1);
        },
        [soportes]
    );

    const table = useMantineReactTable({
        enableFullScreenToggle: false,
        enableGlobalFilter: false,
        enableDensityToggle: false,
        enableColumnFilters: true,
        enableSorting: false,
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.tecnico_asignado === null
                        ? "#fa6e70"
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null ? "white" : "",
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
