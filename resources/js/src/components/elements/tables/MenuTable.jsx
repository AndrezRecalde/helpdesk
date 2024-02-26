import { Menu, rem } from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

export const MenuUsersTable = () => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => console.info("editar")}
            >
                Editar
            </Menu.Item>
            <Menu.Item
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => console.info("resetear")}
            >
                Resetear contraseña
            </Menu.Item>
        </>
    );
};

export const MenuTable_E = () => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => console.info("editar")}
            >
                Editar
            </Menu.Item>
        </>
    );
};

export const MenuSolicitudTable = () => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => console.info("editar")}
            >
                Asignar técnico
            </Menu.Item>
            <Menu.Item
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => console.info("resetear")}
            >
                Anular solicitud
            </Menu.Item>
        </>
    );
};
