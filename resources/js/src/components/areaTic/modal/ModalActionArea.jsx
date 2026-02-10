import { useEffect } from "react";
import { Modal, TextInput, Switch, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAreaTicStore, useUiAreaTic } from "../../../hooks";
import { IconDeviceFloppy } from "@tabler/icons-react";

export const ModalActionArea = () => {
    const { modalActionAreaTic, modalCloseActionAreaTic } = useUiAreaTic();
    const { activateArea, startAddArea, startUpdateArea, setActivateArea } =
        useAreaTicStore();

    const form = useForm({
        initialValues: {
            nombre: "",
            activo: true,
        },
        validate: {
            nombre: (value) =>
                value.trim().length < 3
                    ? "El nombre debe tener al menos 3 caracteres"
                    : null,
        },
    });

    useEffect(() => {
        if (activateArea) {
            form.setValues({
                nombre: activateArea.nombre,
                activo: activateArea.activo,
            });
        } else {
            form.reset();
        }
    }, [activateArea]);

    const handleCloseModal = () => {
        modalCloseActionAreaTic();
        setActivateArea(null);
        form.reset();
    };

    const handleSubmit = async (values) => {
        if (activateArea) {
            await startUpdateArea({
                id_areas_tic: activateArea.id_areas_tic,
                ...values,
            });
        } else {
            await startAddArea(values);
        }
        handleCloseModal();
    };

    return (
        <Modal
            opened={modalActionAreaTic}
            onClose={handleCloseModal}
            title={activateArea ? "Editar Área TIC" : "Nueva Área TIC"}
            size="md"
            centered
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nombre del Área"
                    placeholder="Ej: Soporte Técnico, Desarrollo, Infraestructura"
                    required
                    mb="md"
                    {...form.getInputProps("nombre")}
                />

                <Switch
                    label="Área Activa"
                    description="Las áreas inactivas no aparecerán en los formularios"
                    mb="xl"
                    {...form.getInputProps("activo", { type: "checkbox" })}
                />

                <Group justify="flex-end" mt="md">
                    <Button variant="light" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        leftSection={<IconDeviceFloppy size={16} />}
                    >
                        {activateArea ? "Actualizar" : "Guardar"}
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};
