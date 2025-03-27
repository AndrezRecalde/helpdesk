import { useEffect } from "react";
import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderMenu } from "./HeaderMenu";
import { useUiHeaderMenu, useUsersStore } from "../../../hooks";
import { StackAside } from "./StackAside";
import classes from "../../../assets/styles/modules/layout/body/AppBody.module.css"

export const AppHeaderMenu = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    //const [opened, { toggle }] = useDisclosure();
    const { isOpenModalAside, modalActionAside } = useUiHeaderMenu();
    const [asideOpened, { toggle: toggleAside }] = useDisclosure(true);
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
                collapsed: { desktop: !isOpenModalAside, mobile: true }, // Controla el Aside
            }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderMenu
                    usuario={usuario}
                    asideValue={isOpenModalAside}
                    modalAside={modalActionAside}
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
            <AppShell.Main className={classes.body}>{children}</AppShell.Main>
            <AppShell.Aside className={classes.body} p="sm" component={ScrollArea}>
                <StackAside modalAside={modalActionAside} />
            </AppShell.Aside>
            {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
        </AppShell>
    );
};
