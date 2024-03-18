import { AppShell, Badge, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppHeader, AppNavbar, AppNavfooter } from "../../layouts";
import { useState } from "react";
import { TextSection } from "../../components";
import { Outlet } from "react-router-dom";
import classes from "../../assets/styles/modules/layout/Layout.module.css";

export const AppLayout = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 310,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <AppHeader
                    mobileOpened={mobileOpened}
                    toggleMobile={toggleMobile}
                    desktopOpened={desktopOpened}
                    toggleDesktop={toggleDesktop}
                />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section>
                    <div className={classes.header}>
                        <Group>
                            <div style={{ flex: 1 }}>
                                <TextSection fw={700} fz={12} tt="capitalize">
                                    {usuario?.direccion}
                                </TextSection>
                            </div>
                            <Badge radius="sm" color="indigo.7">
                                GTIC
                            </Badge>
                        </Group>
                    </div>
                </AppShell.Section>
                <AppShell.Section
                    className={classes.links}
                    grow
                    component={ScrollArea}
                >
                    <AppNavbar role={usuario?.role} />

                    {/* TODO: Realizar condicional para que se cargue el Navbar de Planificacion */}
                </AppShell.Section>
                <AppShell.Section>
                    <AppNavfooter />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};
