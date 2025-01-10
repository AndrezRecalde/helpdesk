import cx from "clsx";
import {
    ActionIcon,
    TextInput,
    UnstyledButton,
    rem,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import {
    IconDashboard,
    IconFileText,
    IconFileTypePdf,
    IconHome,
    IconMoon,
    IconSearch,
    IconSunHigh,
} from "@tabler/icons-react";
import { Spotlight, spotlight } from "@mantine/spotlight";

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
    <ActionIcon
        size={40}
        variant="default"
        color="red.7"
        aria-label="Exportacion pdf"
        onClick={handleExportDataPDF}
    >
        <IconFileTypePdf
            stroke={1.5}
            style={{ width: rem(25), height: rem(25) }}
        />
    </ActionIcon>
);

const actions = [
    {
        id: "home",
        label: "Home",
        description: "Get to home page",
        onClick: () => console.log("Home"),
        leftSection: (
            <IconHome
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.5}
            />
        ),
    },
    {
        id: "dashboard",
        label: "Dashboard",
        description: "Get full information about current system status",
        onClick: () => console.log("Dashboard"),
        leftSection: (
            <IconDashboard
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.5}
            />
        ),
    },
    {
        id: "documentation",
        label: "Documentation",
        description: "Visit documentation to lean more about all features",
        onClick: () => console.log("Documentation"),
        leftSection: (
            <IconFileText
                style={{ width: rem(24), height: rem(24) }}
                stroke={1.5}
            />
        ),
    },
];

export const BtnSearchMenu = ({ classes }) => (
    <div>
        <UnstyledButton className={classes.BtnSearch} onClick={spotlight.open}>
            <TextInput
                pointer
                radius="lg"
                placeholder="Buscar"
                rightSection={<IconSearch style={{ width: 20, height: 20 }} />}
            />
        </UnstyledButton>
        <Spotlight
            actions={actions}
            nothingFound="No se ha encontrado nada..."
            highlightQuery
            searchProps={{
                leftSection: (
                    <IconSearch
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                    />
                ),
                placeholder: "Buscar...",
            }}
        />
    </div>
);


