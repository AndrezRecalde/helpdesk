import {
    IconBuilding,
    IconCertificate,
    IconChartBar,
    IconChevronDown,
    IconCopyCheck,
    IconCpu,
    IconDeviceDesktopCheck,
    IconDeviceDesktopCog,
    IconDeviceImac,
    IconDeviceImacBolt,
    IconEditCircle,
    IconEyeCheck,
    IconFileDescription,
    IconLayoutSidebarRightCollapseFilled,
    IconLicense,
    IconList,
    IconListCheck,
    IconTransferIn,
    IconUsers,
} from "@tabler/icons-react";
import {
    ActionIcon,
    Box,
    Burger,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    Menu,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../../assets/styles/modules/layout/menu/HeaderMenu.module.css";
import { Logo, UserBtnHeader } from "../../../components";
import { Link } from "react-router-dom";
import { Roles } from "../../../helpers/dictionary";

import classess from "../../../assets/styles/modules/user/UserHeader.module.css";

const soporteTecnicos = {
    Soportes: [
        {
            icon: IconTransferIn,
            title: "Solicitudes Actuales",
            path: "solicitudes-actuales",
            link: "/helpdesk/solicitudes-actuales",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconDeviceDesktopCog,
            title: "Gestionar Soportes",
            path: "soportes",
            link: "/helpdesk/soportes",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconFileDescription,
            title: "Reporte de Soporte",
            path: "reporte-soportes",
            link: "/helpdesk/reporte-soportes",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconDeviceDesktopCheck,
            title: "Cerrar Soportes",
            path: "cerrar-soportes",
            link: "/helpdesk/gerencia/cerrar-soportes",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconCertificate,
            title: "Indicadores de Soporte",
            path: "indicadores-soportes",
            link: "/helpdesk/gerencia/indicadores-soportes",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconChartBar,
            title: "Dashboard",
            path: "dashboard",
            link: "/helpdesk/gerencia/dashboard",
            roles: [Roles.TIC_GERENTE],
        },
    ],
    Administracion: [
        {
            icon: IconUsers,
            title: "Gestionar Usuarios",
            path: "usuarios",
            link: "/helpdesk/gerencia/usuarios",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconBuilding,
            title: "Gestionar Direcciones",
            path: "direcciones",
            link: "/helpdesk/gerencia/direcciones",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconUsers,
            title: "Gestionar Tecnicos",
            path: "tecnicos",
            link: "/helpdesk/gerencia/tecnicos",
            roles: [Roles.TIC_GERENTE],
        },
    ],
    Inventario: [
        {
            icon: IconListCheck,
            title: "Configuracion de Inventario",
            path: "configuracion-inventario/:tabValue/*",
            link: "/helpdesk/gerencia/configuracion-inventario/categorias",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconDeviceImac,
            title: "Equipos",
            path: "inventario/equipos",
            link: "/helpdesk/gerencia/inventario/equipos",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconCpu,
            title: "Consumibles",
            path: "inventario/consumibles",
            link: "/helpdesk/gerencia/inventario/consumibles",
            roles: [Roles.TIC_GERENTE],
        },
    ],
};

const permisosAdmin = {
    Permisos: [
        {
            icon: IconLicense,
            title: "Ver Permisos (A)",
            path: "ver-permisos",
            link: "/permisos/gerencia/ver-permisos",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconLicense,
            title: "Consolidado Permisos",
            path: "consolidado-permisos",
            link: "/permisos/gerencia/consolidado-permisos",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconCopyCheck,
            title: "Anular Permisos",
            path: "anular-permisos",
            link: "/permisos/gerencia/anular-permisos",
            roles: [Roles.TIC_GERENTE],
        },
    ],
};

const megaMenu = [
    {
        icon: IconLicense,
        title: "Solicitar Permisos",
        path: "permiso",
        link: "/intranet/permiso",
        roles: [""],
    },
    {
        icon: IconEyeCheck,
        title: "Ver Mis Permisos",
        path: "ver-permisos",
        link: "/intranet/ver-permisos",
        roles: [""],
    },
    {
        icon: IconDeviceImacBolt,
        title: "Solicitar Soporte",
        path: "solicitud-soporte",
        link: "/intranet/solicitud-soporte",
        roles: [""],
    },
    {
        icon: IconList,
        title: "Mis Soportes",
        path: "soportes/:soporteValue",
        link: "/intranet/soportes/actuales",
        roles: [""],
    },
    {
        icon: IconEditCircle,
        title: "Agregar Actividad",
        path: "agregar-actividad",
        link: "/intranet/agregar-actividad",
        roles: [""],
    },
    {
        icon: IconListCheck,
        title: "Listar Actividades",
        path: "lista-actividades",
        link: "/intranet/lista-actividades",
        roles: [""],
    },
];
export function HeaderMenu({ usuario, asideValue, btnToggle }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksMenuQuick, { toggle: toggleMenuQuick }] = useDisclosure(false);
    const [linksMenuSoportes, { toggle: toggleSoportes }] =
        useDisclosure(false);
    const [linksMenuPermisos, { toggle: togglePermisos }] =
        useDisclosure(false);
    const theme = useMantineTheme();

    /* Soportes Tecnicos */
    const menuSoportes = Object.entries(soporteTecnicos).map(
        ([category, items]) => (
            <div key={category}>
                <Menu.Label>{category}</Menu.Label>
                {items.map((item) => {
                    const isAllowed = item.roles.includes(usuario.role);
                    return (
                        <Menu.Item
                            key={item.title}
                            leftSection={
                                <item.icon
                                    size={16}
                                    color={theme.colors.teal[6]}
                                />
                            }
                            disabled={!isAllowed} // Deshabilitar si no tiene permisos
                            component={isAllowed ? Link : "div"} // Usa Link solo si tiene permisos
                            to={isAllowed ? item.link : "#"} // Evita navegación si está deshabilitado
                        >
                            {item.title}
                        </Menu.Item>
                    );
                })}
                <Menu.Divider />
            </div>
        )
    );

    /* Permisos Administracion */
    const menuPermisosAdmin = Object.entries(permisosAdmin).map(
        ([category, items]) => (
            <div key={category}>
                <Menu.Label>{category}</Menu.Label>
                {items.map((item) => {
                    const isAllowed = item.roles.includes(usuario.role);
                    return (
                        <Menu.Item
                            key={item.title}
                            leftSection={
                                <item.icon
                                    size={16}
                                    color={theme.colors.teal[6]}
                                />
                            }
                            disabled={!isAllowed} // Deshabilitar si no tiene permisos
                            component={isAllowed ? Link : "div"} // Usa Link solo si tiene permisos
                            to={isAllowed ? item.link : "#"} // Evita navegación si está deshabilitado
                        >
                            {item.title}
                        </Menu.Item>
                    );
                })}
                <Menu.Divider />
            </div>
        )
    );

    /* Links de Mega Menu */
    const menuQuick = megaMenu.map((item) => (
        <Link
            to={item.link}
            key={item.title}
            className={classes.subLink}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.teal[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                </div>
            </Group>
        </Link>
    ));

    return (
        <div>
            <Box pb={30}>
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Group>
                            <Logo height={50} width={200} />
                            <Group h="100%" gap={0} visibleFrom="sm">
                                {/* MENU SOPORTES */}
                                <Menu
                                    transitionProps={{
                                        transition: "pop-top-left",
                                    }}
                                    withinPortal
                                    shadow="md"
                                >
                                    <Menu.Target>
                                        <a href="#" className={classes.link}>
                                            <Center inline>
                                                <Box component="span" mr={5}>
                                                    Soporte Técnico
                                                </Box>
                                                <IconChevronDown
                                                    size={16}
                                                    color={theme.colors.blue[6]}
                                                />
                                            </Center>
                                        </a>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        {menuSoportes}
                                    </Menu.Dropdown>
                                </Menu>

                                {/*  MENU PERMISOS */}
                                <Menu
                                    transitionProps={{
                                        transition: "pop-top-left",
                                    }}
                                    withinPortal
                                    shadow="md"
                                >
                                    <Menu.Target>
                                        <a href="#" className={classes.link}>
                                            <Center inline>
                                                <Box component="span" mr={5}>
                                                    Admin Permisos
                                                </Box>
                                                <IconChevronDown
                                                    size={16}
                                                    color={theme.colors.blue[6]}
                                                />
                                            </Center>
                                        </a>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        {menuPermisosAdmin}
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Group>

                        <Group visibleFrom="sm">
                            {!asideValue ? (
                                <ActionIcon
                                    size={42}
                                    variant="light"
                                    color="red.7"
                                    aria-label="Notificacion Menu"
                                    onClick={btnToggle}
                                >
                                    <IconLayoutSidebarRightCollapseFilled
                                        size={24}
                                    />
                                </ActionIcon>
                            ) : null}
                            <HoverCard
                                width={400}
                                position="bottom"
                                radius="md"
                                shadow="md"
                                withinPortal
                            >
                                <HoverCard.Target>
                                    <ActionIcon
                                        size={42}
                                        variant="light"
                                        color="yellow.7"
                                        aria-label="ActionIcon menu rapido"
                                    >
                                        <IconLicense size={24} />
                                    </ActionIcon>
                                </HoverCard.Target>

                                <HoverCard.Dropdown
                                    style={{ overflow: "hidden" }}
                                >
                                    <SimpleGrid cols={2} spacing={0}>
                                        {menuQuick}
                                    </SimpleGrid>
                                </HoverCard.Dropdown>
                            </HoverCard>

                            <UserBtnHeader classes={classess} />
                        </Group>

                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom="sm"
                        />
                    </Group>
                </header>

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Menú"
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea h="calc(100vh - 80px" mx="-md">
                        {/* Menú Soportes Técnicos en el Drawer */}
                        <UnstyledButton
                            className={classes.link}
                            onClick={toggleSoportes}
                        >
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Soporte Técnico
                                </Box>
                                <IconChevronDown
                                    size={16}
                                    color={theme.colors.teal[6]}
                                />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksMenuSoportes}>
                            {Object.entries(soporteTecnicos).map(
                                ([category, items]) => (
                                    <div
                                        key={category}
                                        style={{ paddingLeft: 10 }}
                                    >
                                        <Text fw={700} size="sm" c="dimmed">
                                            {category}
                                        </Text>
                                        {items.map((item) => (
                                            <UnstyledButton
                                                key={item.title}
                                                className={classes.subLink}
                                            >
                                                <Group
                                                    wrap="nowrap"
                                                    align="center"
                                                >
                                                    <ThemeIcon
                                                        size={34}
                                                        variant="default"
                                                        radius="md"
                                                    >
                                                        <item.icon
                                                            size={18}
                                                            color={
                                                                theme.colors
                                                                    .teal[6]
                                                            }
                                                        />
                                                    </ThemeIcon>
                                                    <Text size="sm">
                                                        {item.title}
                                                    </Text>
                                                </Group>
                                            </UnstyledButton>
                                        ))}
                                        <Divider my="sm" />
                                    </div>
                                )
                            )}
                        </Collapse>

                        <Divider my="sm" />

                        {/* Menú Permisos Admin en el Drawer */}
                        <UnstyledButton
                            className={classes.link}
                            onClick={togglePermisos}
                        >
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Soporte Técnico
                                </Box>
                                <IconChevronDown
                                    size={16}
                                    color={theme.colors.teal[6]}
                                />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksMenuPermisos}>
                            {Object.entries(soporteTecnicos).map(
                                ([category, items]) => (
                                    <div
                                        key={category}
                                        style={{ paddingLeft: 10 }}
                                    >
                                        <Text fw={700} size="sm" c="dimmed">
                                            {category}
                                        </Text>
                                        {items.map((item) => (
                                            <UnstyledButton
                                                key={item.title}
                                                className={classes.subLink}
                                            >
                                                <Group
                                                    wrap="nowrap"
                                                    align="center"
                                                >
                                                    <ThemeIcon
                                                        size={34}
                                                        variant="default"
                                                        radius="md"
                                                    >
                                                        <item.icon
                                                            size={18}
                                                            color={
                                                                theme.colors
                                                                    .teal[6]
                                                            }
                                                        />
                                                    </ThemeIcon>
                                                    <Text size="sm">
                                                        {item.title}
                                                    </Text>
                                                </Group>
                                            </UnstyledButton>
                                        ))}
                                        <Divider my="sm" />
                                    </div>
                                )
                            )}
                        </Collapse>

                        <Divider my="sm" />

                        {/* Menú Rápido en el Drawer */}
                        <UnstyledButton
                            className={classes.link}
                            onClick={toggleMenuQuick}
                        >
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Menu Rápido
                                </Box>
                                <IconChevronDown
                                    size={16}
                                    color={theme.colors.teal[6]}
                                />
                            </Center>
                        </UnstyledButton>
                        <Collapse in={linksMenuQuick}>{menuQuick}</Collapse>

                        <Divider my="sm" />
                        <Group justify="center" grow pb="xl" px="md">
                            <UserBtnHeader classes={classess} />
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </div>
    );
}
