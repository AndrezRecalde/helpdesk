import { IconBellPlus } from "@tabler/icons-react";
import { ActionIcon, Box, Burger, Group, useMantineTheme } from "@mantine/core";
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

export function HeaderMenu({ usuario, asideValue, modalAside }) {
    const { isOpenDrawerMobile, modalActionDrawerMobile } = useUiHeaderMenu();
    const theme = useMantineTheme();
    return (
        <div>
            <Box pb={30}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Group h="100%">
                            <Logo height={50} width={200} />
                            <Group h="100%" gap={0} visibleFrom="lg">
                                <HeaderBtnInicio
                                    classes={classes}
                                    theme={theme}
                                />
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

                        <Group visibleFrom="lg">
                            {!asideValue ? (
                                <ActionIcon
                                    size={35}
                                    variant="default"
                                    color="red.7"
                                    aria-label="Notificacion Menu"
                                    onClick={() => modalAside(true)}
                                >
                                    <IconBellPlus
                                        size={25}
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
                            hiddenFrom="lg"
                        />
                    </Group>
                </header>
                <DrawerMenuMobile
                    usuario={usuario}
                    classes={classes}
                    theme={theme}
                />
            </Box>
        </div>
    );
}
