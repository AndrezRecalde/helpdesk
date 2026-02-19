import { useMemo } from "react";
import {
    Button,
    Group,
    Modal,
    MultiSelect,
    Select,
    Stack,
    Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconShieldPlus } from "@tabler/icons-react";
import PropTypes from "prop-types";

export const ModalAsignarRolesPermisos = ({
    opened,
    onClose,
    modalData,
    setModalData,
    onSave,
    isLoading,
    roles = [],
    permissions = [],
    users = [],
    onUserSearch,
}) => {
    const rolesOptions = useMemo(
        () => roles.map((r) => ({ value: r.name, label: r.name })),
        [roles],
    );

    const permissionsOptions = useMemo(
        () => permissions.map((p) => ({ value: p.name, label: p.name })),
        [permissions],
    );

    const usersOptions = useMemo(
        () =>
            users.map((u) => ({
                value: String(u.cdgo_usrio),
                label: u.nombre_formateado || u.nmbre_usrio,
            })),
        [users],
    );

    const handleSave = async () => {
        if (!modalData.cdgo_usrio) {
            notifications.show({
                title: "Atención",
                message: "Selecciona un usuario",
                color: "yellow",
            });
            return;
        }
        await onSave();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Text fw={600} size="md">
                    {modalData.cdgo_usrio
                        ? `Editar Roles / Permisos — ${modalData.nombre}`
                        : "Asignar Roles y Permisos a Usuario"}
                </Text>
            }
            size="lg"
            centered
        >
            <Stack gap="md">
                {/* Selector de usuario — solo visible al crear */}
                {!modalData.cdgo_usrio && (
                    <Select
                        label="Seleccionar Usuario"
                        placeholder="Buscar por nombre o usuario..."
                        data={usersOptions}
                        searchable
                        clearable
                        onSearchChange={onUserSearch}
                        onChange={(value) =>
                            setModalData((prev) => ({
                                ...prev,
                                cdgo_usrio: value ? Number(value) : null,
                                nombre:
                                    usersOptions.find((u) => u.value === value)
                                        ?.label ?? "",
                            }))
                        }
                        nothingFoundMessage="No se encontraron usuarios"
                    />
                )}

                <MultiSelect
                    label="Roles"
                    placeholder="Seleccionar roles..."
                    data={rolesOptions}
                    value={modalData.selectedRoles}
                    onChange={(value) =>
                        setModalData((prev) => ({
                            ...prev,
                            selectedRoles: value,
                        }))
                    }
                    searchable
                    clearable
                    nothingFoundMessage="No hay roles disponibles"
                />

                <MultiSelect
                    label="Permisos Directos"
                    placeholder="Seleccionar permisos..."
                    data={permissionsOptions}
                    value={modalData.selectedPermissions}
                    onChange={(value) =>
                        setModalData((prev) => ({
                            ...prev,
                            selectedPermissions: value,
                        }))
                    }
                    searchable
                    clearable
                    nothingFoundMessage="No hay permisos disponibles"
                />

                <Group justify="flex-end" mt="sm">
                    <Button variant="default" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        loading={isLoading}
                        leftSection={<IconShieldPlus size={16} />}
                    >
                        Guardar
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

ModalAsignarRolesPermisos.propTypes = {
    opened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    modalData: PropTypes.shape({
        cdgo_usrio: PropTypes.number,
        nombre: PropTypes.string,
        selectedRoles: PropTypes.arrayOf(PropTypes.string),
        selectedPermissions: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    setModalData: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    roles: PropTypes.array,
    permissions: PropTypes.array,
    users: PropTypes.array,
    onUserSearch: PropTypes.func,
};
