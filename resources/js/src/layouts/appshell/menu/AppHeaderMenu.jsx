import { AppShell } from "@mantine/core";
import { HeaderMenu } from "./HeaderMenu";
import classes from "../../../assets/styles/modules/layout/body/AppBody.module.css";

export const AppHeaderMenu = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));

    return (
        <AppShell
            header={{ height: { base: 48, sm: 60, lg: 60 } }}
            padding={30}
        >
            <AppShell.Header>
                <HeaderMenu usuario={usuario} />
            </AppShell.Header>
            <AppShell.Main className={classes.body}>{children}</AppShell.Main>
        </AppShell>
    );
};
