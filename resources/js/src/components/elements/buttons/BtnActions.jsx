import cx from "clsx";
import {
    ActionIcon,
    rem,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconFileTypePdf, IconMoon, IconSunHigh } from "@tabler/icons-react";

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
            size={35}
            radius="md"
            aria-label="Toggle color scheme"
        >
            <IconSunHigh
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
                style={{ width: rem(22), height: rem(22) }}
            />

            <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
                style={{ width: rem(22), height: rem(22) }}
            />
        </ActionIcon>
    );
};

export const ActionReportPDF = ({ handleExportDataPDF }) => (
    <Tooltip label="Exportar PDF" withArrow position="left">
        <ActionIcon
            size={42}
            variant="default"
            color="red.7"
            aria-label="Exportacion pdf"
            onClick={handleExportDataPDF}
        >
            <IconFileTypePdf size={24} />
        </ActionIcon>
    </Tooltip>
);
