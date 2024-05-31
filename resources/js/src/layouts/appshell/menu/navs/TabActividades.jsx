import { Center, Menu, rem } from "@mantine/core";
import { IconBook, IconChevronDown, IconSettings } from "@tabler/icons-react";

export const WebTabActividades = ({ classes, theme }) => {
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
                            size="0.9rem"
                            color={theme.colors.teal[6]}
                        />
                    </Center>
                </a>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>General</Menu.Label>
                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{
                                width: rem(14),
                                height: rem(14),
                            }}
                        />
                    }
                >
                    Crear Actividad
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconBook
                            style={{
                                width: rem(14),
                                height: rem(14),
                            }}
                        />
                    }
                >
                    Ver Actividades
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};