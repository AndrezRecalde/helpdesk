import { Box, Container, Divider, Tabs, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconAdjustments,
    IconCubePlus,
    IconLock,
    IconUserBolt,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { RolesTable } from "../../components/accessControl/RolesTable";
import { PermissionsTable } from "../../components/accessControl/PermissionsTable";
import { UsersRolesPermissionsTable } from "../../components/accessControl/UsersRolesPermissionsTable";
import { RoleModal } from "../../components/accessControl/RoleModal";
import { PermissionModal } from "../../components/accessControl/PermissionModal";
import { useRoleStore } from "../../hooks/accessControl/useRoleStore";
import { useAccessPermissionStore } from "../../hooks/accessControl/useAccessPermissionStore";
import { useUsersStore } from "../../hooks/user/useUsersStore";
import { BtnSection, TitlePage } from "../../components";
import { useTitlePage } from "../../hooks";

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
                        leftSection={<IconUserBolt style={iconStyle} />}
                    >
                        Usuarios con Roles y Permisos
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="roles" pt="xs">
                    <Box
                        mb="md"
                        mt="md"
                        display="flex"
                        style={{ justifyContent: "flex-end" }}
                    >
                        <BtnSection
                            IconSection={IconCubePlus}
                            handleAction={handleOpenRoleModal}
                        >
                            Agregar Rol
                        </BtnSection>
                    </Box>
                    <RolesTable setModalVisible={openRole} />
                </Tabs.Panel>

                <Tabs.Panel value="permissions" pt="xs">
                    <Box
                        mb="md"
                        mt="md"
                        display="flex"
                        style={{ justifyContent: "flex-end" }}
                    >
                        <BtnSection
                            IconSection={IconCubePlus}
                            handleAction={handleOpenPermissionModal}
                        >
                            Agregar Permiso
                        </BtnSection>
                    </Box>
                    <PermissionsTable setModalVisible={openPermission} />
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
