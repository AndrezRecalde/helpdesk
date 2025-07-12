import { useEffect, useMemo, useState } from "react";
import { List, Spoiler, ThemeIcon } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import dayjs from "dayjs";

const STORAGE_KEY = "marcaciones_page_size";

export const TableMarcacionRelojOnline = () => {
    const { isLoading, marcaciones } = useMarcacionStore();

    // ✅ Obtener pageSize desde localStorage o usar 50 por defecto
    const getInitialPageSize = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 50;
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: getInitialPageSize(),
    });

    // ✅ Guardar pageSize cuando cambia
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, pagination.pageSize.toString());
    }, [pagination.pageSize]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "Nombre",
                header: "SERVIDOR",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) => dayjs(row.Fecha).format("YYYY-MM-DD"),
                header: "FECHA",
                filterVariant: "autocomplete",
                size: 80,
            },
            {
                accessorFn: (row) => row.Entrada,
                header: "ENTRADA",
                enableColumnFilter: false,
                size: 80,
            },
            {
                accessorFn: (row) => row.AlmuerzoSalida,
                header: "SALIDA ALMUERZO",
                enableColumnFilter: false,
                size: 80,
            },
            {
                accessorFn: (row) => row.AlmuerzoRetorno,
                header: "RETORNO ALMUERZO",
                enableColumnFilter: false,
                size: 80,
            },
            {
                accessorFn: (row) => row.Salida,
                header: "SALIDA",
                enableColumnFilter: false,
                size: 80,
            },
            {
                id: "observacion",
                accessorFn: (row) => row, // accedemos a toda la fila
                header: "OBSERVACIÓN",
                enableColumnFilter: false,
                Cell: ({ cell }) => {
                    const row = cell.getValue();
                    const permisosDesde = row.PermisoDesde?.split(", ") || [];
                    const permisosHasta = row.PermisoHasta?.split(", ") || [];
                    const tiposPermiso = row.TipoPermiso?.split(", ") || [];

                    return (
                        <Spoiler
                            maxHeight={40}
                            showLabel="Mostrar"
                            hideLabel="Ocultar"
                        >
                            <List
                                spacing="xs"
                                size="sm"
                                center
                                icon={
                                    <ThemeIcon
                                        //color="indigo"
                                        variant="default"
                                        size={24}
                                        radius="xl"
                                    >
                                        <IconCircleDashedCheck size={16} />
                                    </ThemeIcon>
                                }
                            >
                                {permisosDesde.length > 0 ? (
                                    permisosDesde.map((desde, index) => (
                                        <List.Item key={`permiso-${index}`}>
                                            <b>
                                                [
                                                {tiposPermiso[index] ??
                                                    "Permiso"}
                                                ]
                                            </b>{" "}
                                            Desde:{" "}
                                            {dayjs(desde).format("HH:mm:ss")}
                                            {permisosHasta[index]
                                                ? ` - Hasta: ${dayjs(
                                                      permisosHasta[index]
                                                  ).format("HH:mm:ss")}`
                                                : ""}
                                        </List.Item>
                                    ))
                                ) : (
                                    <List.Item>Sin permisos</List.Item>
                                )}
                            </List>
                        </Spoiler>
                    );
                },
                size: 250,
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones,
        enableFacetedValues: true,
        state: {
            pagination, // 👈 controlado desde useState
        },
        onPaginationChange: setPagination,
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
            showProgressBars: isLoading,
        },
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "observacion"
                    ? {
                          backgroundColor: cell.row.original.PermisoDesde ? "#008fdb" : null,
                          color: cell.row.original.PermisoDesde ? "white" : "black",
                      }
                    : {},
        }),
        mantineTableProps: {
            highlightOnHover: true,
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
