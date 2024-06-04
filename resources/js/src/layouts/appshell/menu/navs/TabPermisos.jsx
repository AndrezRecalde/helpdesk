import { Center, Menu, rem } from "@mantine/core";
import { IconBook, IconChevronDown, IconSettings } from "@tabler/icons-react";

export const WebTabPermisos = ({ classes, theme, linkNavigate }) => {
    return (
        <Menu
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
        >
            <Menu.Target>
                <a
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                >
                    <Center>
                        <span className={classes.linkLabel}>Permisos</span>
                        <IconChevronDown
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    </Center>
                </a>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>General</Menu.Label>
                <Menu.Item
                    onClick={() => linkNavigate("/gerencia/permiso")}
                    leftSection={
                        <IconSettings
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Crear Permiso
                </Menu.Item>
                <Menu.Item
                    onClick={() => linkNavigate("/gerencia/ver-permisos")}
                    leftSection={
                        <IconBook
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Ver Permisos
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
