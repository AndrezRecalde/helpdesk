import { IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";
import {
    ActionIcon,
    Box,
    Burger,
    Drawer,
    Group,
    ScrollArea,
    SimpleGrid,
    useMantineTheme,
} from "@mantine/core";
import { Logo, UserBtnHeader } from "../../../components";
import {
    menuHome,
    MenuRapido,
    NavMenuAdminTics,
    NavMenuPermisosAdmin,
    NavMenuTics,
} from "./data/menuRoutes";
import {
    SolicitudesMenu,
    GestionMenu,
    MenuSection,
    MenuItems,
} from "../../../layouts";
import { Roles } from "../../../helpers/dictionary";
import { UserBtnMobile } from "../../../components/user/menu/UserBtnMobile";
import { useUiHeaderMenu } from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/menu/HeaderMenu.module.css";
import classess from "../../../assets/styles/modules/menu/MenuGrid.module.css";

export function HeaderMenu({ usuario, asideValue, modalAside }) {
    const {
        isOpenDrawerMobile,
        isOpenMenuLinksTics,
        isOpenMenuLinksGestionGeneral,
        isOpenMenuLinksPermisos,
        modalActionDrawerMobile,
        modalMenuLinksTics,
        modalMenuLinksGestionGeneral,
        modalMenuLinksPermisos,
    } = useUiHeaderMenu();

    const theme = useMantineTheme();

    return (
        <div>
            <Box pb={30}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Group>
                            <Logo height={50} width={200} />
                            <Group h="100%" gap={0} visibleFrom="sm">
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

                                {/* MENU DE GESTION GENERAL DE TICS */}
                                {usuario.role === Roles.TIC_GERENTE ? (
                                    <GestionMenu
                                        title="Gestión General"
                                        menuData={NavMenuAdminTics}
                                        usuario={usuario}
                                        classes={classes}
                                        theme={theme}
                                    />
                                ) : null}

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

                        <Group visibleFrom="sm">
                            {!asideValue ? (
                                <ActionIcon
                                    size={42}
                                    variant="light"
                                    color="red.7"
                                    aria-label="Notificacion Menu"
                                    onClick={() => modalAside(true)}
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

                            <UserBtnHeader />
                        </Group>

                        <Burger
                            opened={isOpenDrawerMobile}
                            onClick={() => modalActionDrawerMobile(true)}
                            hiddenFrom="sm"
                        />
                    </Group>
                </header>

                <Drawer
                    opened={isOpenDrawerMobile}
                    onClose={() => modalActionDrawerMobile(false)}
                    size="100%"
                    padding="md"
                    title="Menú"
                    hiddenFrom="sm"
                    zIndex={1000000}
                    classNames={{
                        body: classes.drawer,
                        header: classes.drawer,
                    }}
                >
                    <ScrollArea h="calc(100vh - 80px" mx="-md">
                        {usuario.role === Roles.TIC_GERENTE ||
                        usuario.role === Roles.TIC_TECNICO ? (
                            <MenuSection
                                title="Gestión de TIC"
                                menuData={NavMenuTics}
                                classes={classes}
                                theme={theme}
                                isOpen={isOpenMenuLinksTics}
                                toggle={modalMenuLinksTics}
                                toggleDrawer={modalActionDrawerMobile}
                            />
                        ) : null}

                        {usuario.role === Roles.TIC_GERENTE ? (
                            <MenuSection
                                title="Gestión General"
                                menuData={NavMenuAdminTics}
                                classes={classes}
                                theme={theme}
                                isOpen={isOpenMenuLinksGestionGeneral}
                                toggle={modalMenuLinksGestionGeneral}
                                toggleDrawer={modalActionDrawerMobile}
                            />
                        ) : null}

                        {usuario.role === Roles.TIC_GERENTE ||
                        usuario.role === Roles.NOM_ASISTENCIA ? (
                            <MenuSection
                                title="Permisos Admin"
                                menuData={NavMenuPermisosAdmin}
                                classes={classes}
                                theme={theme}
                                isOpen={isOpenMenuLinksPermisos}
                                toggle={modalMenuLinksPermisos}
                                toggleDrawer={modalActionDrawerMobile}
                            />
                        ) : null}

                        {/* Menú Rápido en el Drawer */}
                        {/* <MenuRapidoSection
                            title="Menú Rápido"
                            menuData={MenuRapido}
                            classes={classes}
                            theme={theme}
                            isOpen={linksMenuQuick}
                            toggle={toggleMenuQuick}
                            toggleDrawer={toggleDrawer}
                        />

                        <Divider my="sm" /> */}
                        <SimpleGrid
                            cols={{ base: 2, xs: 2, sm: 2, md: 2, lg: 2 }}
                            mt="md"
                        >
                            <MenuItems
                                menuHome={menuHome}
                                classes={classess}
                                theme={theme}
                            />
                        </SimpleGrid>
                        <Group justify="center" mt={20} p={20}>
                            <UserBtnMobile />
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </div>
    );
}
