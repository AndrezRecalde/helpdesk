import { useState, useEffect } from "react";
import {
    Modal,
    TextInput,
    Textarea,
    Select,
    Switch,
    Button,
    Stack,
    Text,
    FileInput,
    Group,
    Badge,
    Alert,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import {
    IconMessageReport,
    IconUpload,
    IconAlertCircle,
    IconEyeOff,
    IconEye,
} from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";
import Swal from "sweetalert2";

const TIPOS_DENUNCIA = [
    { value: "ACOSO", label: "Acoso Laboral o Sexual" },
    { value: "ABUSO", label: "Abuso de Autoridad" },
    { value: "CORRUPCION", label: "Actos de Corrupción" },
    { value: "OTRO", label: "Otro" },
];

export const ModalCrearDenuncia = () => {
    const {
        startCrearDenuncia,
        startLoadMisDenuncias,
        isLoading,
        cedulaVerificada,
        resetCedulaVerificada,
        message,
        errores,
    } = useDenunciaStore();
    const { openedModalCrearDenuncia, handleCloseModalCrearDenuncia } =
        useUiDenuncia();

    const [archivos, setArchivos] = useState([]);

    const form = useForm({
        initialValues: {
            cedula: "",
            tipo_denuncia: "",
            descripcion: "",
            mostrar_informacion: false,
        },
        validate: {
            cedula: (value) => {
                if (!value) return "La cédula es requerida";
                if (!/^\d{10}$/.test(value))
                    return "La cédula debe tener 10 dígitos";
                return null;
            },
            tipo_denuncia: isNotEmpty("Selecciona el tipo de denuncia"),
            descripcion: (value) => {
                if (!value) return "La descripción es requerida";
                if (value.length < 20)
                    return "La descripción debe tener al menos 20 caracteres";
                if (value.length > 5000)
                    return "La descripción no puede exceder 5000 caracteres";
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
                title: "Error al Crear Denuncia",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("cedula", values.cedula);
        formData.append("tipo_denuncia", values.tipo_denuncia);
        formData.append("descripcion", values.descripcion);
        formData.append(
            "mostrar_informacion",
            values.mostrar_informacion ? "1" : "0",
        );

        // Agregar archivos
        archivos.forEach((archivo, index) => {
            formData.append(`archivos[${index}]`, archivo);
        });

        const result = await startCrearDenuncia(formData);
        if (result) {
            // Recargar la lista de denuncias después de crear una nueva
            await startLoadMisDenuncias();
            handleClose();
        }
    };

    const handleClose = () => {
        form.reset();
        setArchivos([]);
        resetCedulaVerificada();
        handleCloseModalCrearDenuncia();
    };

    const handleFileChange = (files) => {
        if (files && files.length > 0) {
            const newFiles = Array.from(files).slice(0, 3 - archivos.length);
            setArchivos([...archivos, ...newFiles]);
        }
    };

    const removeFile = (index) => {
        setArchivos(archivos.filter((_, i) => i !== index));
    };

    return (
        <Modal
            opened={openedModalCrearDenuncia}
            onClose={handleClose}
            title="Reportar Abuso o Irregularidad"
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Información Importante"
                        color="blue"
                        variant="light"
                    >
                        Tu denuncia será tratada con total confidencialidad.
                        Puedes elegir si deseas mostrar tu identidad a los
                        administradores.
                    </Alert>

                    <TextInput
                        label="Número de Cédula"
                        placeholder="1234567890"
                        maxLength={10}
                        {...form.getInputProps("cedula")}
                        required
                        description="Confirma tu número de cédula"
                    />

                    <Select
                        label="Tipo de Denuncia"
                        placeholder="Selecciona el tipo"
                        data={TIPOS_DENUNCIA}
                        {...form.getInputProps("tipo_denuncia")}
                        required
                    />

                    <Textarea
                        label="Descripción Detallada"
                        placeholder="Describe la situación con el mayor detalle posible..."
                        minRows={5}
                        maxRows={10}
                        {...form.getInputProps("descripcion")}
                        required
                        description={`${form.values.descripcion.length}/5000 caracteres (mínimo 20)`}
                    />

                    <Switch
                        label="Mostrar mi información a los administradores"
                        description="Si desactivas esta opción, tu identidad permanecerá anónima"
                        {...form.getInputProps("mostrar_informacion", {
                            type: "checkbox",
                        })}
                        thumbIcon={
                            form.values.mostrar_informacion ? (
                                <IconEye size={12} />
                            ) : (
                                <IconEyeOff size={12} />
                            )
                        }
                    />

                    <div>
                        <Text size="sm" fw={500} mb={5}>
                            Archivos Adjuntos (Opcional)
                        </Text>
                        <Text size="xs" c="dimmed" mb={10}>
                            Puedes adjuntar hasta 3 archivos (imágenes, PDF,
                            DOCX). Máximo 10MB por archivo.
                        </Text>

                        {archivos.length < 3 && (
                            <FileInput
                                placeholder="Seleccionar archivo"
                                leftSection={<IconUpload size={16} />}
                                accept="image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFileChange}
                                multiple
                            />
                        )}

                        {archivos.length > 0 && (
                            <Stack mt="sm" gap="xs">
                                {archivos.map((file, index) => (
                                    <Group key={index} justify="space-between">
                                        <Group gap="xs">
                                            <Badge size="sm" variant="light">
                                                {file.name}
                                            </Badge>
                                            <Text size="xs" c="dimmed">
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </Text>
                                        </Group>
                                        <Button
                                            size="xs"
                                            variant="subtle"
                                            color="red"
                                            onClick={() => removeFile(index)}
                                        >
                                            Eliminar
                                        </Button>
                                    </Group>
                                ))}
                            </Stack>
                        )}
                    </div>

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="subtle"
                            loading={isLoading}
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                            leftSection={<IconMessageReport size={16} />}
                        >
                            Enviar Denuncia
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
