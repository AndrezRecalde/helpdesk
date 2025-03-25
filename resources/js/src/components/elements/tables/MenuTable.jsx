import { Menu, rem } from "@mantine/core";
import {
    IconChecks,
    IconEditCircle,
    IconEyeCheck,
    IconLogs,
    IconNotesOff,
    IconPrinter,
    IconRestore,
    IconSortAscending,
    IconTrash,
    IconUserHexagon,
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
                    <IconRestore style={{ width: rem(15), height: rem(15) }} />
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

export const MenuTable_D = ({ row, handleDelete }) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleDelete(row.original)}
            >
                Eliminar
            </Menu.Item>
        </>
    );
};

export const MenuTable_Equipo = ({
    row,
    handleShow,
    handleEdit,
    handleRemoveCustodio,
    handleAssignCustodio,
    handleDelete,
}) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconEyeCheck style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleShow(row.original)}
            >
                Ver
            </Menu.Item>
            <Menu.Item
                disabled={
                    row.original.estado_id === 4 || row.original.estado_id === 5
                        ? true
                        : false
                }
                leftSection={
                    <IconEditCircle
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleEdit(row.original)}
            >
                Editar
            </Menu.Item>
            {row.original.user_id || row.original.direccion_id ? (
                <Menu.Item
                    disabled={
                        row.original.estado_id === 4 ||
                        row.original.estado_id === 5
                            ? true
                            : false
                    }
                    leftSection={
                        <IconUserShare
                            style={{ width: rem(15), height: rem(15) }}
                        />
                    }
                    onClick={() => handleRemoveCustodio(row.original)}
                >
                    Remover Custodio
                </Menu.Item>
            ) : (
                <Menu.Item
                    disabled={
                        row.original.estado_id === 4 ||
                        row.original.estado_id === 5
                            ? true
                            : false
                    }
                    leftSection={
                        <IconUserHexagon
                            style={{ width: rem(15), height: rem(15) }}
                        />
                    }
                    onClick={() => handleAssignCustodio(row.original)}
                >
                    Asignar Custodio
                </Menu.Item>
            )}
            <Menu.Item
                disabled={true}
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleDelete(row.original)}
            >
                Eliminar
            </Menu.Item>
        </>
    );
};

export const MenuTable_Consumible = ({ row, handleEdit, handleHistorial }) => {
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
                    <IconLogs style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleHistorial(row.original)}
            >
                Historial
            </Menu.Item>
        </>
    );
};

export const MenuTable_Imprimir = ({ row, handleImprimir }) => {
    return (
        <>
            <Menu.Item
                leftSection={
                    <IconPrinter style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleImprimir(row.original)}
            >
                (RE)Imprimir
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
    //console.log(isEdit);
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
                    row.original.id_estado === 3 ||
                    row.original.id_estado === 4 ||
                    row.original.id_estado === 2
                        ? true
                        : false
                }
                leftSection={
                    <IconUserShare
                        style={{ width: rem(15), height: rem(15) }}
                    />
                }
                onClick={() => handleAsignar(row.original)}
            >
                (RE) Asignar técnico
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
                disabled={row.original.id_estado === 2 ? true : false}
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

export const MenuTable_AutorizarPermiso = ({
    row,
    handleAnular,
    handleAutorizar,
}) => {
    return (
        <>
            <Menu.Item
                disabled={
                    row.original.id_estado === 2 ||
                    row.original.id_estado === 6 ||
                    row.original.id_estado === 7 ||
                    row.original.id_estado === 8
                        ? true
                        : false
                }
                leftSection={
                    <IconChecks style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleAutorizar(row.original)}
            >
                Autorizar Permiso
            </Menu.Item>
            <Menu.Item
                disabled={
                    row.original.id_estado === 8 ||
                    row.original.id_estado === 7 ||
                    row.original.id_estado === 6
                        ? true
                        : false
                }
                leftSection={
                    <IconNotesOff style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleAnular(row.original)}
            >
                Anular Permiso
            </Menu.Item>
        </>
    );
};

export const MenuTable_Per = ({ row, handleExport, handleAnular }) => {
    return (
        <>
            <Menu.Item
                disabled={
                    row.original.id_estado === 8 ||
                    row.original.id_estado === 7 ||
                    row.original.id_estado === 6
                        ? true
                        : false
                }
                leftSection={
                    <IconPrinter style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleExport(row.original)}
            >
                Imprimir
            </Menu.Item>
            <Menu.Item
                disabled={
                    row.original.id_estado === 8 ||
                    row.original.id_estado === 7 ||
                    row.original.id_estado === 6
                        ? true
                        : false
                }
                leftSection={
                    <IconTrash style={{ width: rem(15), height: rem(15) }} />
                }
                onClick={() => handleAnular(row.original)}
            >
                Anular
            </Menu.Item>
        </>
    );
};
