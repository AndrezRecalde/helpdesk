import {
    Anchor,
    Box,
    Center,
    Collapse,
    Divider,
    Group,
    HoverCard,
    SimpleGrid,
    ThemeIcon,
    UnstyledButton,
    rem,
} from "@mantine/core";
import {
    IconChartInfographic,
    IconChevronDown,
    IconDeviceDesktopAnalytics,
    IconDeviceImacBolt,
    IconDeviceImacX,
    IconFiles,
    IconIndentIncrease,
} from "@tabler/icons-react";
import { TextSection } from "../../../../components";
import { Link } from "react-router-dom";

const mockdata = [
    {
        icon: IconIndentIncrease,
        title: "Solicitudes Actuales",
        description: "Revisar todas las solicitudes del día actual.",
        to: "/gerencia/solicitudes-actuales",
    },
    {
        icon: IconDeviceDesktopAnalytics,
        title: "Gestionar Soportes",
        description:
            "Administrar los soportes a tráves de filtros de búsqueda.",
        to: "/gerencia/soportes",
    },
    {
        icon: IconDeviceImacX,
        title: "Solicitudes Anuladas",
        description:
            "Revisar las solicitudes anuladas a tráves de filtros de busqueda.",
        to: "/gerencia/solicitudes-anuladas",
    },
    {
        icon: IconDeviceImacBolt,
        title: "Cerrar Soportes",
        description: "Se verifica la resolución de los soportes técnicos.",
        to: "/gerencia/cerrar-soportes",
    },
    {
        icon: IconChartInfographic,
        title: "Indicadores",
        description: "Revisar un reporte de los indicadores del área de TIC(s)",
        to: "/gerencia/indicadores-soportes",
    },
    {
        icon: IconFiles,
        title: "Reporte",
        description: "Revisa y exporta un reporte de los soportes realizados.",
        to: "/gerencia/reporte-soportes",
    },
];

const Links = ({ classes, theme }) => {
    return mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.teal[5]}
                    />
                </ThemeIcon>
                <Link to={item.to} className={classes.link}>
                    <div>
                        <TextSection tt="" ta="left" fz={14} fw={500}>
                            {item.title}
                        </TextSection>
                        <TextSection
                            tt=""
                            ta="left"
                            fz={12}
                            fw={500}
                            color="dimmed"
                        >
                            {item.description}
                        </TextSection>
                    </div>
                </Link>
            </Group>
        </UnstyledButton>
    ));
};

export const WebTabAdminHelpdesk = ({ classes, theme }) => {
    return (
        <HoverCard
            width={600}
            position="bottom"
            radius="md"
            shadow="md"
            withinPortal
        >
            <HoverCard.Target>
                <a href="#" className={classes.link}>
                    <Center inline>
                        <Box component="span" mr={5}>
                            Helpdesk
                        </Box>
                        <IconChevronDown
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            color={theme.colors.teal[6]}
                        />
                    </Center>
                </a>
            </HoverCard.Target>
            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                    <TextSection tt="" fz={16} fw={500}>
                        Soporte técnico
                    </TextSection>
                    <Link to="/gerencia/dashboard" fz="xs">
                        Dashboard
                    </Link>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                    <Links classes={classes} theme={theme} />
                </SimpleGrid>
            </HoverCard.Dropdown>
        </HoverCard>
    );
};

export const MobileTabAdminHelpdesk = ({
    classes,
    toggleLinks,
    theme,
    linksOpened,
}) => {
    return (
        <>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                    <Box component="span" mr={5}>
                        Helpdesk
                    </Box>
                    <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.teal[6]}
                    />
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>
                <Links classes={classes} theme={theme} />
            </Collapse>
        </>
    );
};
