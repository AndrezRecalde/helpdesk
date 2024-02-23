import cx from "clsx";
import {
    ActionIcon,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";

export const BtnDarkMode = ({ classes }) => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });
    return (
        <ActionIcon
            variant="default"
            onClick={() =>
                setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                )
            }
            size={34}
            radius="md"
            aria-label="Toggle color scheme"
        >
            <IconSunHigh
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
                size="1.3rem"
            />

            <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
                size="1.3rem"
            />
        </ActionIcon>
    );
};
