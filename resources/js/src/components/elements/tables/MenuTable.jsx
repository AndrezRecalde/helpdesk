import { Menu, rem } from "@mantine/core";
import { IconEditCircle, IconTrash, IconUserShare } from "@tabler/icons-react";

export const MenuUsersTable = ({ row, handleEdit, handleResetPassword }) => {
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
                onClick={() => handleResetPassword(row.original)}
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

export const MenuSolicitudTable = ({
    row,
    handleEditar = null,
    handleAsignar,
    handleAnular,
    isEdit,
}) => {
    console.log(isEdit)
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconUserShare
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleAsignar(row.original)}
            >
                Asignar técnico
            </Menu.Item>
            {isEdit ? (
                <Menu.Item
                    leftSection={
                        <IconEditCircle
                            style={{ width: rem(15), height: rem(15) }}
                        />
                    }
                    onClick={() => handleEditar(row.original)}
                >
                    Editar soporte
                </Menu.Item>
            ) : null}
            <Menu.Item
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleAnular(row.original)}
            >
                Anular soporte
            </Menu.Item>
        </>
    );
};
