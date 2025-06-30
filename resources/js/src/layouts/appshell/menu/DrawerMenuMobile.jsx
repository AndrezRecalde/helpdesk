import { Drawer, Group, ScrollArea, SimpleGrid } from "@mantine/core";
import { useUiHeaderMenu } from "../../../hooks";
import { MenuSection, MenuItems } from "../../../layouts";
import { UserBtnMobile } from "../../../components/user/menu/UserBtnMobile";
import {
    menuHome,
    NavMenuAdminTics,
    NavMenuPermisosAdmin,
    NavMenuTics,
} from "./data/menuRoutes";
import { Roles } from "../../../helpers/dictionary";
import classess from "../../../assets/styles/modules/menu/MenuGrid.module.css";

export const DrawerMenuMobile = ({ usuario, classes, theme }) => {
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
    return (
        <Drawer
            opened={isOpenDrawerMobile}
            onClose={() => modalActionDrawerMobile(false)}
            size="100%"
            padding="md"
            title="Menú"
            hiddenFrom="lg"
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
                    mt="sm"
                    p={5}
                >
                    <MenuItems
                        menuHome={menuHome}
                        classes={classess}
                        theme={theme}
                        toggleDrawer={modalActionDrawerMobile}
                    />
                </SimpleGrid>
                <Group justify="center" mt={20} mb={20} p={20}>
                    <UserBtnMobile />
                </Group>
            </ScrollArea>
        </Drawer>
    );
};
