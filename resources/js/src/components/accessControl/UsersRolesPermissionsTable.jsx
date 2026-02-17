import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Badge, Box, Stack } from "@mantine/core";
import { useUsersStore } from "../../hooks/user/useUsersStore";

export const UsersRolesPermissionsTable = () => {
    const {
        startLoadUsersWithRolesOrPermissions,
        users,
        isLoading,
        paginacion,
    } = useUsersStore();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        startLoadUsersWithRolesOrPermissions({
            pagina: pagination.pageIndex + 1,
            por_pagina: pagination.pageSize,
            search: globalFilter,
        });
    }, [pagination.pageIndex, pagination.pageSize, globalFilter]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "nombre_formateado",
                header: "Nombre",
            },
            {
                accessorKey: "lgin",
                header: "Usuario",
            },
            {
                accessorKey: "roles",
                header: "Roles",
                Cell: ({ cell }) => (
                    <Stack gap="xs">
                        {cell.getValue()?.map((role) => (
                            <Badge key={role.id} color="blue" variant="light">
                                {role.name}
                            </Badge>
                        ))}
                    </Stack>
                ),
            },
            {
                accessorKey: "permissions",
                header: "Permisos Directos",
                Cell: ({ cell }) => (
                    <Stack gap="xs">
                        {cell.getValue()?.map((perm) => (
                            <Badge key={perm.id} color="cyan" variant="outline">
                                {perm.name}
                            </Badge>
                        ))}
                    </Stack>
                ),
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: users || [],
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        manualFiltering: true,
        manualPagination: true,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        rowCount: paginacion?.total || 0,
        state: {
            pagination,
            globalFilter,
            showProgressBars: isLoading,
        },
        localization: {
            actions: "Acciones",
            noRecordsToDisplay: "No hay registros para mostrar",
        },
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });

    return <MantineReactTable table={table} />;
};
