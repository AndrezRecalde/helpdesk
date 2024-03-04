import { Menu, rem } from "@mantine/core";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";

export const MenuUsersTable = ({ row, handleEdit }) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleEdit(row.original)}
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

export const MenuTable_E = ({ row, handleEdit }) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleEdit(row.original)}
            >
                Editar
            </Menu.Item>
        </>
    );
};

export const MenuSolicitudTable = ({ row, handleAsignar, handleAnular }) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleAsignar(row.original)}
            >
                Asignar técnico
            </Menu.Item>
            <Menu.Item
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleAnular(row.original)}
            >
                Anular solicitud
            </Menu.Item>
        </>
    );
};
