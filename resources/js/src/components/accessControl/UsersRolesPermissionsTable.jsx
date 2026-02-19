import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconShieldPlus, IconUserShield } from "@tabler/icons-react";
import { useUsersStore } from "../../hooks/user/useUsersStore";
import { useRoleStore } from "../../hooks/accessControl/useRoleStore";
import { useAccessPermissionStore } from "../../hooks/accessControl/useAccessPermissionStore";
import { MenuTableActions } from "../elements/tables/MenuTableActions";
import { BtnSection } from "../elements/buttons/BtnServices";
import { ModalAsignarRolesPermisos } from "./modal/ModalAsignarRolesPermisos";

const MODAL_INITIAL = {
    cdgo_usrio: null,
    nombre: "",
    selectedRoles: [],
    selectedPermissions: [],
};

export const UsersRolesPermissionsTable = () => {
    const {
        startLoadUsersWithRolesOrPermissions,
        startAssignUserRolesPermissions,
        startLoadUsers,
        usersRolesPermissions,
        users,
        isLoading,
        paginacion,
        message,
        errores,
    } = useUsersStore();

    const { roles, startLoadRoles } = useRoleStore();
    const { permissions, startLoadPermissions } = useAccessPermissionStore();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [globalFilter, setGlobalFilter] = useState("");

    /* Modal state */
    const [opened, { open, close }] = useDisclosure(false);
    const [modalData, setModalData] = useState(MODAL_INITIAL);
    const [userSearch, setUserSearch] = useState("");

    /* Load table data */
    useEffect(() => {
        startLoadUsersWithRolesOrPermissions({
            pagina: pagination.pageIndex + 1,
            por_pagina: pagination.pageSize,
            search: globalFilter,
        });
    }, [pagination.pageIndex, pagination.pageSize, globalFilter]);

    /* Load roles & permissions once */
    useEffect(() => {
        startLoadRoles();
        startLoadPermissions();
    }, []);

    /* Load users for selector when modal opens */
    useEffect(() => {
        if (opened) {
            startLoadUsers({ nmbre_usrio: userSearch, por_pagina: 50 });
        }
    }, [opened, userSearch]);

    /* Notifications */
    useEffect(() => {
        if (message?.status === "success") {
            notifications.show({
                title: "Éxito",
                message: message.msg,
                color: "green",
            });
        }
    }, [message]);

    useEffect(() => {
        if (errores) {
            notifications.show({
                title: "Error",
                message: errores,
                color: "red",
            });
        }
    }, [errores]);

    /* Open modal for NEW assignment */
    const handleOpenNew = useCallback(() => {
        setModalData(MODAL_INITIAL);
        open();
    }, [open]);

    /* Open modal for EDIT (pre-load user's current roles & permissions) */
    const handleEdit = useCallback(
        (rowData) => {
            setModalData({
                cdgo_usrio: rowData.cdgo_usrio,
                nombre: rowData.nombre_formateado,
                selectedRoles: rowData.roles?.map((r) => r.name) ?? [],
                selectedPermissions:
                    rowData.permissions?.map((p) => p.name) ?? [],
            });
            open();
        },
        [open],
    );

    /* Save */
    const handleSave = async () => {
        await startAssignUserRolesPermissions(
            modalData.cdgo_usrio,
            modalData.selectedRoles,
            modalData.selectedPermissions,
            {
                pagina: pagination.pageIndex + 1,
                por_pagina: pagination.pageSize,
                search: globalFilter,
            },
        );
        close();
    };

    /* Table columns */
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
        data: usersRolesPermissions || [],
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
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconUserShield,
                        label: "Editar Roles / Permisos",
                        onClick: handleEdit,
                    },
                ]}
            />
        ),
        renderTopToolbarCustomActions: () => (
            <BtnSection
                IconSection={IconShieldPlus}
                handleAction={handleOpenNew}
            >
                Agregar Usuario con Permisos
            </BtnSection>
        ),
        localization: {
            actions: "Acciones",
            noRecordsToDisplay: "No hay registros para mostrar",
        },
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });

    return (
        <>
            <MantineReactTable table={table} />

            <ModalAsignarRolesPermisos
                opened={opened}
                onClose={close}
                modalData={modalData}
                setModalData={setModalData}
                onSave={handleSave}
                isLoading={isLoading}
                roles={roles}
                permissions={permissions}
                users={users}
                onUserSearch={setUserSearch}
            />
        </>
    );
};
