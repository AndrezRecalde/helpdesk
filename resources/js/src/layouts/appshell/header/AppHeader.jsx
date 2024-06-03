import { Burger, Group } from "@mantine/core";
import { BtnSearchMenu, UserBtnHeader } from "../../../components";
import { Logo, BtnDarkMode } from "../../../components";
import classes from "././../../../assets/styles/modules/layout/navbar/AppHeader.module.css";

export const AppHeader = ({
    mobileOpened,
    toggleMobile,
    desktopOpened,
    toggleDesktop,
}) => {
    return (
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Logo height={50} width={200} />
                <Burger
                    opened={mobileOpened}
                    onClick={toggleMobile}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Burger
                    opened={desktopOpened}
                    onClick={toggleDesktop}
                    visibleFrom="sm"
                    size="sm"
                />
            </Group>

            <Group>
                {/* <BtnSearchMenu classes={classes} /> */}
                <BtnDarkMode classes={classes} />
                <UserBtnHeader />
            </Group>
        </Group>
    );
};
