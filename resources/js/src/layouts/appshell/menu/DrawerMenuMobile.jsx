import { Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useUiHeaderMenu } from "../../../hooks";
import { MenuSection, MenuHome } from "../../../layouts";
import { UserBtnMobile } from "../../../components/user/menu/UserBtnMobile";
import {
    NavMenuAdminTics,
    NavMenuPermisosAdmin,
    NavMenuTics,
} from "./data/menuRoutes";
import { Roles } from "../../../helpers/dictionary";

export const DrawerMenuMobile = ({ usuario, classes }) => {
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
                <MenuHome
                    classes={classes}
                    toggleDrawer={modalActionDrawerMobile}
                />
                <Divider my="sm" />

                {usuario.role === Roles.TIC_GERENTE ||
                usuario.role === Roles.TIC_TECNICO ? (
                    <MenuSection
                        title="Gestión de TIC"
                        usuario={usuario}
                        menuData={NavMenuTics}
                        classes={classes}
                        isOpen={isOpenMenuLinksTics}
                        toggle={modalMenuLinksTics}
                        toggleDrawer={modalActionDrawerMobile}
                    />
                ) : null}

                {usuario.role === Roles.TIC_GERENTE ? (
                    <MenuSection
                        title="Gestión General"
                        usuario={usuario}
                        menuData={NavMenuAdminTics}
                        classes={classes}
                        isOpen={isOpenMenuLinksGestionGeneral}
                        toggle={modalMenuLinksGestionGeneral}
                        toggleDrawer={modalActionDrawerMobile}
                    />
                ) : null}

                {usuario.role === Roles.TIC_GERENTE ||
                usuario.role === Roles.NOM_ASISTENCIA ? (
                    <MenuSection
                        title="Permisos Admin"
                        usuario={usuario}
                        menuData={NavMenuPermisosAdmin}
                        classes={classes}
                        isOpen={isOpenMenuLinksPermisos}
                        toggle={modalMenuLinksPermisos}
                        toggleDrawer={modalActionDrawerMobile}
                    />
                ) : null}
                <Group justify="center" mt={20} mb={20} p={20}>
                    <UserBtnMobile />
                </Group>
            </ScrollArea>
        </Drawer>
    );
};
