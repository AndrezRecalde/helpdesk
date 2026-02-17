import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAccessPermissionStore } from "../../hooks/accessControl/useAccessPermissionStore";
import { BtnSubmit } from "../elements/buttons/BtnServices";

export const PermissionModal = ({ opened, close }) => {
    const {
        startAddPermission,
        startUpdatePermission,
        setActivePermission,
        activePermission,
    } = useAccessPermissionStore();

    const form = useForm({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) =>
                value.length < 3
                    ? "El nombre debe tener al menos 3 caracteres"
                    : null,
        },
    });

    useEffect(() => {
        if (activePermission) {
            form.setValues({
                name: activePermission.name,
            });
        }
    }, [activePermission]);

    const handleSubmit = (values) => {
        if (activePermission) {
            startUpdatePermission({ ...activePermission, ...values });
        } else {
            startAddPermission(values);
        }
        handleClose();
    };

    const handleClose = () => {
        close();
        form.reset();
        setActivePermission(null);
    };

    return (
        <Modal
            size="lg"
            opened={opened}
            onClose={handleClose}
            title={activePermission ? "Editar Permiso" : "Crear Permiso"}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nombre del Permiso"
                    placeholder="Ej. crear_usuario"
                    required
                    {...form.getInputProps("name")}
                />
                <Group position="right" mt="md">
                    <BtnSubmit>
                        {activePermission ? "Actualizar" : "Guardar"}
                    </BtnSubmit>
                </Group>
            </form>
        </Modal>
    );
};
