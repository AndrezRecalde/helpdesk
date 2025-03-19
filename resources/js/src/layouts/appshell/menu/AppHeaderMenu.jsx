import { useEffect } from "react";
import { AppShell, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderMenu } from "./HeaderMenu";
import { useUsersStore } from "../../../hooks";
import { StackAside } from "./StackAside";

export const AppHeaderMenu = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const [opened, { toggle }] = useDisclosure();
    const [asideOpened, { toggle: toggleAside }] = useDisclosure();
    const { startLoadBirthdays } = useUsersStore();

    useEffect(() => {
        startLoadBirthdays();
    }, []);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            /* navbar={{
                width: 200,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }} */
            aside={{
                width: 300,
                breakpoint: "md",
                collapsed: { desktop: !asideOpened, mobile: true }, // Controla el Aside
            }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderMenu
                    usuario={usuario}
                    asideValue={asideOpened}
                    btnToggle={toggleAside}
                />
            </AppShell.Header>
            {/* <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar> */}
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Aside p="sm">
                <StackAside btnToggle={toggleAside} />
            </AppShell.Aside>
            {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
        </AppShell>
    );
};
