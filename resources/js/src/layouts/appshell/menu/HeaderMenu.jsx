import { Box, Burger, Group } from "@mantine/core";
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
    HeaderBtnInicio,
    DrawerMenuMobile,
} from "../../../layouts";
import { Roles } from "../../../helpers/dictionary";
import { useUiHeaderMenu } from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/menu/HeaderMenu.module.css";

export function HeaderMenu({ usuario }) {
    const { isOpenDrawerMobile, modalActionDrawerMobile } = useUiHeaderMenu();
    return (
        <Box pb={30}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%">
                        <Logo height={50} width={200} />
                        <Group h="100%" gap={0} visibleFrom="lg">
                            <HeaderBtnInicio classes={classes} />
                            {/* MENU DE GESTION DE TICS */}
                            {usuario.roles?.includes(Roles.GERENTE) ||
                            usuario.roles?.includes(Roles.TIC) ? (
                                <GestionMenu
                                    title="Módulo de TICs"
                                    menuData={NavMenuTics}
                                    usuario={usuario}
                                    classes={classes}
                                />
                            ) : null}

                            {/* MENU DE GESTION GENERAL DE TICS */}
                            {usuario.roles?.includes(Roles.GERENTE) ||
                            usuario.roles?.includes(Roles.TIC) ? (
                                <GestionMenu
                                    title="Módulo de Gestión"
                                    menuData={NavMenuAdminTics}
                                    usuario={usuario}
                                    classes={classes}
                                />
                            ) : null}

                            {/* MENU DE PERMISOS ADMIN */}
                            {usuario.roles?.includes(Roles.GERENTE) ||
                            usuario.roles?.includes(Roles.TTHH) ? (
                                <GestionMenu
                                    title="Módulo Asistencias"
                                    menuData={NavMenuPermisosAdmin}
                                    usuario={usuario}
                                    classes={classes}
                                />
                            ) : null}
                        </Group>
                    </Group>

                    <Group visibleFrom="lg">
                        {/* {!asideValue ? (
                                <ActionIcon
                                    size={35}
                                    variant="default"
                                    //color="red.7"
                                    aria-label="Notificacion Menu"
                                    onClick={() => modalAside(true)}
                                >
                                    <IconBellPlus
                                        size={25}
                                    />
                                </ActionIcon>
                            ) : null} */}
                        <SolicitudesMenu
                            menuData={MenuRapido}
                            classes={classes}
                        />

                        <UserBtnHeader />
                    </Group>

                    <Burger
                        opened={isOpenDrawerMobile}
                        onClick={() => modalActionDrawerMobile(true)}
                        hiddenFrom="lg"
                    />
                </Group>
            </header>
            <DrawerMenuMobile usuario={usuario} classes={classes} />
        </Box>
    );
}
