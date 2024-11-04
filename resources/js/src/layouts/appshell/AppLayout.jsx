import { AppShell, Badge, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TextSection } from "../../components";
import { Outlet } from "react-router-dom";
import { AppHeader, AppNavbar, AppNavfooter } from "../../layouts";
import classes from "../../assets/styles/modules/layout/Layout.module.css";

export const AppLayout = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 310,
                breakpoint: "sm",
                collapsed: {
                    mobile: !mobileOpened,
                    desktop: !desktopOpened,
                },
            }}
            padding="md"
            className={classes.container}
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
                                <TextSection
                                    fw={700}
                                    fz={12}
                                    tt="uppercase"
                                    color="dimmed"
                                >
                                    {usuario?.direccion}
                                </TextSection>
                            </div>
                            <Badge radius="lg" size="lg" variant="default">
                                {usuario?.cdgo_lrgo}
                            </Badge>
                        </Group>
                    </div>
                </AppShell.Section>
                <AppShell.Section
                    className={classes.links}
                    grow
                    component={ScrollArea}
                >
                    <AppNavbar
                        role={usuario?.role}
                        toggleMobile={toggleMobile}
                    />
                </AppShell.Section>
                <AppShell.Section>
                    <AppNavfooter toggleMobile={toggleMobile} />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};
