import { useState, useEffect } from "react";
import { Box, Container, Divider, Tabs, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    TitlePage,
    RolesTable,
    PermissionsTable,
    PermissionModal,
    RoleModal,
    UsersRolesPermissionsTable,
} from "../../components";
import {
    useTitlePage,
    useUsersStore,
    useRoleStore,
    useAccessPermissionStore,
} from "../../hooks";
import { IconAdjustments, IconLock, IconShieldPlus } from "@tabler/icons-react";

const RolesPermissionsPage = () => {
    useTitlePage("Administración de Roles y Permisos - Intranet");
    const iconStyle = { width: rem(18), height: rem(18) };
    const [activeTab, setActiveTab] = useState("roles");

    // Role Logic
    const [openedRole, { open: openRole, close: closeRole }] =
        useDisclosure(false);
    const { setActiveRole } = useRoleStore();

    const handleOpenRoleModal = () => {
        setActiveRole(null);
        openRole();
    };

    // Permission Logic
    const [openedPermission, { open: openPermission, close: closePermission }] =
        useDisclosure(false);
    const { setActivePermission } = useAccessPermissionStore();

    const { startLoadRoles } = useRoleStore();
    const { startLoadPermissions } = useAccessPermissionStore();

    const { startLoadUsersWithRolesOrPermissions } = useUsersStore();

    useEffect(() => {
        if (activeTab === "roles") {
            startLoadRoles();
        } else if (activeTab === "permissions") {
            startLoadPermissions();
        } else if (activeTab === "user-roles-permissions") {
            startLoadUsersWithRolesOrPermissions();
        }
    }, [activeTab]);

    const handleOpenPermissionModal = () => {
        setActivePermission(null);
        openPermission();
    };

    return (
        <Container size="xl">
            <TitlePage order={2}>Administración de Roles y Permisos</TitlePage>
            <Divider my="md" />

            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List grow>
                    <Tabs.Tab
                        value="roles"
                        leftSection={<IconAdjustments style={iconStyle} />}
                    >
                        Roles
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="permissions"
                        leftSection={<IconLock style={iconStyle} />}
                    >
                        Permisiones
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="user-roles-permissions"
                        leftSection={<IconShieldPlus style={iconStyle} />}
                    >
                        Usuarios con Roles y Permisos
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="roles" pt="xs">
                    <RolesTable
                        setModalVisible={openRole}
                        handleOpenRoleModal={handleOpenRoleModal}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="permissions" pt="xs">
                    <PermissionsTable
                        setModalVisible={openPermission}
                        handleOpenPermissionModal={handleOpenPermissionModal}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="user-roles-permissions" pt="xs">
                    <Box mb="md" mt="md" />
                    <UsersRolesPermissionsTable />
                </Tabs.Panel>
            </Tabs>

            <RoleModal opened={openedRole} close={closeRole} />
            <PermissionModal
                opened={openedPermission}
                close={closePermission}
            />
        </Container>
    );
};

export default RolesPermissionsPage;
