import { IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";
import {
    ActionIcon,
    Box,
    Burger,
    Divider,
    Drawer,
    Group,
    ScrollArea,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Logo, UserBtnHeader } from "../../../components";
import {
    MenuRapido,
    NavMenuAdminTics,
    NavMenuPermisosAdmin,
    NavMenuTics,
} from "./data/menuRoutes";
import {
    SolicitudesMenu,
    GestionMenu,
    MenuSection,
    MenuRapidoSection,
} from "../../../layouts";
import classes from "../../../assets/styles/modules/layout/menu/HeaderMenu.module.css";
import classess from "../../../assets/styles/modules/user/UserHeader.module.css";
import { Roles } from "../../../helpers/dictionary";

export function HeaderMenu({ usuario, asideValue, btnToggle }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksMenuQuick, { toggle: toggleMenuQuick }] = useDisclosure(false);
    const [linksMenuSoportes, { toggle: toggleSoportes }] =
        useDisclosure(false);
    const [linksGestionGeneral, { toggle: toggleGestionGeneral }] =
        useDisclosure(false);
    const [linksMenuPermisos, { toggle: togglePermisos }] =
        useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <div>
            <Box pb={30}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Group>
                            <Logo height={50} width={200} />
                            <Group h="100%" gap={0} visibleFrom="md">
                                {/* MENU DE GESTION DE TICS */}
                                {usuario.role === Roles.TIC_GERENTE ||
                                usuario.role === Roles.TIC_TECNICO ? (
                                    <GestionMenu
                                        title="Gestión de TIC"
                                        menuData={NavMenuTics}
                                        usuario={usuario}
                                        classes={classes}
                                        theme={theme}
                                    />
                                ) : null}

                                {usuario.role === Roles.TIC_GERENTE ? (
                                    <GestionMenu
                                        title="Gestión General"
                                        menuData={NavMenuAdminTics}
                                        usuario={usuario}
                                        classes={classes}
                                        theme={theme}
                                    />
                                ) : null}

                                {/* MENU DE GESTION GENERAL DE TICS */}

                                {/* MENU DE PERMISOS ADMIN */}
                                {usuario.role === Roles.TIC_GERENTE ||
                                usuario.role === Roles.NOM_ASISTENCIA ? (
                                    <GestionMenu
                                        title="Permisos Admin"
                                        menuData={NavMenuPermisosAdmin}
                                        usuario={usuario}
                                        classes={classes}
                                        theme={theme}
                                    />
                                ) : null}
                            </Group>
                        </Group>

                        <Group visibleFrom="md">
                            {!asideValue ? (
                                <ActionIcon
                                    size={42}
                                    variant="light"
                                    color="red.7"
                                    aria-label="Notificacion Menu"
                                    onClick={btnToggle}
                                >
                                    <IconLayoutSidebarRightCollapseFilled
                                        size={24}
                                    />
                                </ActionIcon>
                            ) : null}
                            <SolicitudesMenu
                                menuData={MenuRapido}
                                classes={classes}
                                theme={theme}
                            />

                            <UserBtnHeader classes={classess} />
                        </Group>

                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom="md"
                        />
                    </Group>
                </header>

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Menú"
                    hiddenFrom="md"
                    zIndex={1000000}
                >
                    <ScrollArea h="calc(100vh - 80px" mx="-md">
                        {usuario.role === Roles.TIC_GERENTE ? (
                            <>
                                <MenuSection
                                    title="Gestión de TIC"
                                    menuData={NavMenuTics}
                                    isOpen={linksMenuSoportes}
                                    toggle={toggleSoportes}
                                    classes={classes}
                                    theme={theme}
                                />
                                <MenuSection
                                    title="Gestión General"
                                    menuData={NavMenuAdminTics}
                                    isOpen={linksGestionGeneral}
                                    toggle={toggleGestionGeneral}
                                    classes={classes}
                                    theme={theme}
                                />
                            </>
                        ) : null}

                        {usuario.role === Roles.TIC_GERENTE ||
                        usuario.role === Roles.NOM_ASISTENCIA ? (
                            <MenuSection
                                title="Permisos Admin"
                                menuData={NavMenuPermisosAdmin}
                                isOpen={linksMenuPermisos}
                                toggle={togglePermisos}
                                classes={classes}
                                theme={theme}
                            />
                        ) : null}

                        {/* Menú Rápido en el Drawer */}
                        <MenuRapidoSection
                            title="Menú Rápido"
                            menuData={MenuRapido}
                            isOpen={linksMenuQuick}
                            toggle={toggleMenuQuick}
                            classes={classes}
                            theme={theme}
                        />

                        <Divider my="sm" />
                        <Group justify="center" grow pb="xl" px="md">
                            <UserBtnHeader classes={classess} />
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </div>
    );
}
