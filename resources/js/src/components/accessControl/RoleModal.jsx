import { Button, Group, Modal, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useRoleStore } from "../../hooks/accessControl/useRoleStore";
import { useAccessPermissionStore } from "../../hooks/accessControl/useAccessPermissionStore";
import { BtnSubmit } from "../elements/buttons/BtnServices";

export const RoleModal = ({ opened, close }) => {
    const { startAddRole, startUpdateRole, setActiveRole, activeRole } =
        useRoleStore();
    const { permissions } = useAccessPermissionStore();

    const form = useForm({
        initialValues: {
            name: "",
            permissions: [],
        },
        validate: {
            name: (value) =>
                value.length < 3
                    ? "El nombre debe tener al menos 3 caracteres"
                    : null,
        },
    });

    useEffect(() => {
        if (activeRole) {
            form.setValues({
                name: activeRole.name,
                permissions: activeRole.permissions?.map((p) => p.name) || [],
            });
        }
    }, [activeRole]);

    const handleSubmit = (values) => {
        if (activeRole) {
            startUpdateRole({ ...activeRole, ...values });
        } else {
            startAddRole(values);
        }
        handleClose();
    };

    const handleClose = () => {
        close();
        form.reset();
        setActiveRole(null);
    };

    return (
        <Modal
            size="lg"
            opened={opened}
            onClose={handleClose}
            title={activeRole ? "Editar Rol" : "Crear Rol"}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nombre del Rol"
                    placeholder="Ej. Admin"
                    required
                    {...form.getInputProps("name")}
                />
                <MultiSelect
                    label="Permisos asignados"
                    placeholder="Seleccione permisos"
                    data={permissions.map((p) => p.name)}
                    mt="md"
                    searchable
                    {...form.getInputProps("permissions")}
                />
                <Group position="right" mt="md">
                    <BtnSubmit>
                        {activeRole ? "Actualizar" : "Guardar"}
                    </BtnSubmit>
                </Group>
            </form>
        </Modal>
    );
};
