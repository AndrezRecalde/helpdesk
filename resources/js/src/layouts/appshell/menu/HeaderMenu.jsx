import {
    Group,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    BtnAdministracion,
    BtnDarkMode,
    BtnSearchMenu,
    BtnSolicitarSoporte,
    Logo,
    UserBtnHeader,
} from "../../../components";
import {
    MobileTabAdminHelpdesk,
    TabHome,
    WebTabActividades,
    WebTabAdminHelpdesk,
    WebTabPermisos,
} from "../menu";
import classes from "../../../assets/styles/modules/layout/header/HeaderMenu.module.css";
import classess from "../../../assets/styles/modules/layout/navbar/AppHeader.module.css";
import { Outlet, useNavigate } from "react-router-dom";

export const HeaderMenu = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const navigate = useNavigate();
    const theme = useMantineTheme();

    const linkNavigate = (url) => {
        navigate(url);
    }

    return (
        <>
            <Box pb={30}>
                {/* WEB DESKTOP */}
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Group>
                            <Logo height={50} width={200} />
                        </Group>
                        <Group h="100%" gap={0} visibleFrom="sm">
                            {/* Inicio */}
                            <TabHome classes={classes} />

                            <WebTabAdminHelpdesk
                                classes={classes}
                                theme={theme}
                            />

                            {/* Actividades */}
                            <WebTabActividades
                                classes={classes}
                                theme={theme}
                            />

                            {/* Permisos */}
                            <WebTabPermisos classes={classes} theme={theme} />
                        </Group>

                        <Group visibleFrom="sm">
                            {/* Administracion */}
                            <BtnAdministracion theme={theme} linkNavigate={linkNavigate} />

                            {/* Solicitar soporte */}
                            <BtnSolicitarSoporte theme={theme} linkNavigate={linkNavigate} />

                            <BtnSearchMenu classes={classess} />
                            <BtnDarkMode classes={classess} />
                            <UserBtnHeader />
                        </Group>

                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom="sm"
                        />
                    </Group>
                </header>

                {/* MOBILE */}
                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Menu"
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                        <Divider my="sm" />

                        <TabHome classes={classes} />

                        {/* Soporte tecnico */}
                        <MobileTabAdminHelpdesk
                            classes={classes}
                            toggleLinks={toggleLinks}
                            theme={theme}
                            linksOpened={linksOpened}
                        />

                        {/* Actividades */}
                        <a href="#" className={classes.link}>
                            Actividades
                        </a>

                        {/* Permisos */}
                        <a href="#" className={classes.link}>
                            Permisos
                        </a>

                        <Divider my="sm" />
                        <Group justify="center" grow pb="xl" px="md">
                            <BtnDarkMode classes={classess} />
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
            <Outlet />
        </>
    );
};
