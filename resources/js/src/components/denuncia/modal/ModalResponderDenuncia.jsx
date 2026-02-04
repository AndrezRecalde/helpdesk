import { Modal, Textarea, Select, Button, Stack, Group } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ESTADOS = [
    { value: "EN_PROCESO", label: "En Proceso" },
    { value: "RESUELTO", label: "Resuelto" },
    { value: "RECHAZADO", label: "Rechazado" },
];

export const ModalResponderDenuncia = () => {
    const {
        activateDenuncia,
        startResponderDenuncia,
        startLoadDenuncias,
        startLoadEstadisticas,
        isLoading,
        message,
        errores,
    } = useDenunciaStore();
    const { openedModalResponderDenuncia, handleCloseModalResponderDenuncia } =
        useUiDenuncia();

    const form = useForm({
        initialValues: {
            respuesta: "",
            estado: "EN_PROCESO",
        },
        validate: {
            respuesta: (value) => {
                if (!value) return "La respuesta es requerida";
                if (value.length < 10)
                    return "La respuesta debe tener al menos 10 caracteres";
                if (value.length > 5000)
                    return "La respuesta no puede exceder 5000 caracteres";
                return null;
            },
            estado: isNotEmpty("Selecciona el estado"),
        },
    });

    useEffect(() => {
        if (activateDenuncia) {
            form.setValues({
                respuesta: activateDenuncia.respuesta || "",
                estado:
                    activateDenuncia.estado === "PENDIENTE"
                        ? "EN_PROCESO"
                        : activateDenuncia.estado,
            });
        }
    }, [activateDenuncia]);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Error al Responder",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

    const handleSubmit = async (values) => {
        if (activateDenuncia) {
            const success = await startResponderDenuncia(
                activateDenuncia.id,
                values,
            );
            if (success) {
                // Recargar la lista de denuncias y estadísticas después de responder
                await startLoadDenuncias();
                await startLoadEstadisticas();
                handleClose();
            }
        }
    };

    const handleClose = () => {
        form.reset();
        handleCloseModalResponderDenuncia();
    };

    return (
        <Modal
            opened={openedModalResponderDenuncia}
            onClose={handleClose}
            title="Responder Denuncia"
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <Textarea
                        label="Respuesta"
                        placeholder="Escribe tu respuesta detallada..."
                        minRows={5}
                        maxRows={10}
                        {...form.getInputProps("respuesta")}
                        required
                        description={`${form.values.respuesta.length}/5000 caracteres`}
                    />

                    <Select
                        label="Estado"
                        placeholder="Selecciona el estado"
                        data={ESTADOS}
                        {...form.getInputProps("estado")}
                        required
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                            leftSection={<IconSend size={16} />}
                        >
                            Enviar Respuesta
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
