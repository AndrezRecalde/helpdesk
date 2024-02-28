import { AppShell, Badge, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppHeader, AppNavbar, AppNavfooter } from "../../layouts";
import { useState } from "react";
import { TextSection } from "../../components";

import classes from "../../assets/styles/modules/layout/Layout.module.css";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    /* Cambiarlo por el state */
    const [role, setRole] = useState("GERENTE");

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
                                <TextSection fw={700} fz={12}>
                                    Gestión de Tecnologías de la Información
                                </TextSection>
                            </div>
                            <Badge radius="md" color="indigo.7">
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
                    <AppNavbar role={role} />

                    {/* TODO: Realizar condicional para que se cargue el Navbar de Planificacion */}
                </AppShell.Section>
                <AppShell.Section>
                    <AppNavfooter />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main><Outlet /></AppShell.Main>
        </AppShell>
    );
};
