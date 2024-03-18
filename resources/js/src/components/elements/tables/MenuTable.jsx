import { Menu, rem } from "@mantine/core";
import {
    IconEditCircle,
    IconPrinter,
    IconSortAscending,
    IconTrash,
    IconUserShare,
} from "@tabler/icons-react";

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

export const MenuTable_T = ({ row, handleDiagnosticar, handleExport }) => {
    return (
        <>
            <Menu.Item
                disabled={
                    row.original.tecnico_asignado === null ||
                    row.original.id_estado === 2 ||
                    row.original.id_estado === 3 ||
                    row.original.id_estado === 4
                        ? true
                        : false
                }
                leftSection={
                    <IconSortAscending
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleDiagnosticar(row.original)}
            >
                Diagnosticar
            </Menu.Item>
            <Menu.Item
                disabled={
                    row.original.tecnico_asignado === null ||
                    row.original.id_estado === 2
                        ? true
                        : false
                }
                leftSection={
                    <IconPrinter style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleExport(row.original.id_sop)}
            >
                Imprimir
            </Menu.Item>
        </>
    );
};

export const MenuSolicitudTable = ({
    row,
    handleEditar = null,
    handleDiagnosticar,
    handleAsignar,
    handleAnular,
    handleExport,
    isEdit,
}) => {
    console.log(isEdit);
    return (
        <>
            <Menu.Item
                disabled={
                    row.original.tecnico_asignado === null ||
                    row.original.id_estado === 2 ||
                    row.original.id_estado === 3 ||
                    row.original.id_estado === 4
                        ? true
                        : false
                }
                leftSection={
                    <IconSortAscending
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleDiagnosticar(row.original)}
            >
                Diagnosticar
            </Menu.Item>
            <Menu.Item
                disabled={row.original.tecnico_asignado !== null || row.original.id_estado === 2 ? true : false}
                leftSection={
                    <IconUserShare
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleAsignar(row.original)}
            >
                Asignar técnico
            </Menu.Item>
            <Menu.Item
                disabled={
                    row.original.tecnico_asignado === null ||
                    row.original.id_estado === 2
                        ? true
                        : false
                }
                leftSection={
                    <IconPrinter style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleExport(row.original.id_sop)}
            >
                Imprimir
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
                disabled={ row.original.id_estado === 2 ? true : false }
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
