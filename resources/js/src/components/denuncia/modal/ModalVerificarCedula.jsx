import { useEffect } from "react";
import { Modal, TextInput, Button, Stack, Text } from "@mantine/core";
import { useForm, isNotEmpty, matches } from "@mantine/form";
import { IconShieldCheck } from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";
import Swal from "sweetalert2";

export const ModalVerificarCedula = () => {
    const { startVerificarCedula, isLoading, message, errores } =
        useDenunciaStore();
    const {
        openedModalVerificarCedula,
        handleCloseModalVerificarCedula,
        handleOpenModalCrearDenuncia,
    } = useUiDenuncia();

    const form = useForm({
        initialValues: {
            cedula: "",
        },
        validate: {
            cedula: (value) => {
                if (!value) return "La cédula es requerida";
                if (!/^\d{10}$/.test(value))
                    return "La cédula debe tener 10 dígitos";
                return null;
            },
        },
    });

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
                title: "Error de Verificación",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

    const handleSubmit = async (values) => {
        const success = await startVerificarCedula(values.cedula);
        if (success) {
            handleCloseModalVerificarCedula();
            form.reset();
            handleOpenModalCrearDenuncia();
        }
    };

    const handleClose = () => {
        form.reset();
        handleCloseModalVerificarCedula();
    };

    return (
        <Modal
            opened={openedModalVerificarCedula}
            onClose={handleClose}
            title="Verificar Identidad"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <Text size="sm" c="dimmed">
                        Por seguridad, necesitamos verificar tu identidad antes
                        de continuar. Ingresa tu número de cédula.
                    </Text>

                    <TextInput
                        label="Número de Cédula"
                        placeholder="1234567890"
                        maxLength={10}
                        {...form.getInputProps("cedula")}
                        leftSection={<IconShieldCheck size={16} />}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        leftSection={<IconShieldCheck size={16} />}
                    >
                        Verificar Cédula
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};
