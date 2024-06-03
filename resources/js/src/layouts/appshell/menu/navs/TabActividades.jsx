import { Center, Menu, rem } from "@mantine/core";
import { IconBook, IconChevronDown, IconSettings } from "@tabler/icons-react";

export const WebTabActividades = ({ classes, theme, linkNavigate }) => {
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
                        <span className={classes.linkLabel}>Actividades</span>
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
                    leftSection={
                        <IconSettings
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Crear Actividad
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconBook
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Ver Actividades
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
