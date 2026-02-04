import {
    Modal,
    Stack,
    Text,
    Badge,
    Group,
    Paper,
    Divider,
    Button,
    Alert,
} from "@mantine/core";
import {
    IconCalendar,
    IconFileText,
    IconDownload,
    IconAlertCircle,
} from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";

const getEstadoColor = (estado) => {
    const colors = {
        PENDIENTE: "yellow",
        EN_PROCESO: "blue",
        RESUELTO: "green",
        RECHAZADO: "red",
    };
    return colors[estado] || "gray";
};

const getEstadoLabel = (estado) => {
    const labels = {
        PENDIENTE: "Pendiente",
        EN_PROCESO: "En Proceso",
        RESUELTO: "Resuelto",
        RECHAZADO: "Rechazado",
    };
    return labels[estado] || estado;
};

const getTipoLabel = (tipo) => {
    const labels = {
        ACOSO: "Acoso Laboral o Sexual",
        ABUSO: "Abuso de Autoridad",
        CORRUPCION: "Actos de Corrupción",
        OTRO: "Otro",
    };
    return labels[tipo] || tipo;
};

export const ModalDetalleDenuncia = () => {
    const { activateDenuncia, startDescargarArchivo } = useDenunciaStore();
    const { openedModalDetalleDenuncia, handleCloseModalDetalleDenuncia } =
        useUiDenuncia();

    if (!activateDenuncia) return null;

    const handleDescargarArchivo = (archivo) => {
        startDescargarArchivo(archivo.id, archivo.nombre_original);
    };

    return (
        <Modal
            opened={openedModalDetalleDenuncia}
            onClose={handleCloseModalDetalleDenuncia}
            title="Detalle de Denuncia"
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Stack>
                <Paper p="md" withBorder>
                    <Group justify="space-between" mb="sm">
                        <Text fw={700} size="lg">
                            {activateDenuncia.numero_denuncia}
                        </Text>
                        <Badge
                            size="lg"
                            color={getEstadoColor(activateDenuncia.estado)}
                        >
                            {getEstadoLabel(activateDenuncia.estado)}
                        </Badge>
                    </Group>

                    <Group gap="xs" mb="xs">
                        <IconCalendar size={16} />
                        <Text size="sm" c="dimmed">
                            Fecha:{" "}
                            {new Date(
                                activateDenuncia.fecha_creacion,
                            ).toLocaleDateString("es-EC", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </Text>
                    </Group>

                    <Badge size="sm" variant="light" mb="md">
                        {getTipoLabel(activateDenuncia.tipo_denuncia)}
                    </Badge>
                </Paper>

                <div>
                    <Text fw={600} mb="xs">
                        Descripción:
                    </Text>
                    <Paper p="md" withBorder bg="gray.0">
                        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                            {activateDenuncia.descripcion}
                        </Text>
                    </Paper>
                </div>

                {activateDenuncia.archivos &&
                    activateDenuncia.archivos.length > 0 && (
                        <div>
                            <Text fw={600} mb="xs">
                                Archivos Adjuntos:
                            </Text>
                            <Stack gap="xs">
                                {activateDenuncia.archivos.map((archivo) => (
                                    <Paper key={archivo.id} p="sm" withBorder>
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                <IconFileText size={20} />
                                                <div>
                                                    <Text size="sm" fw={500}>
                                                        {
                                                            archivo.nombre_original
                                                        }
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        {
                                                            archivo.tamano_formateado
                                                        }
                                                    </Text>
                                                </div>
                                            </Group>
                                            <Button
                                                size="xs"
                                                variant="light"
                                                leftSection={
                                                    <IconDownload size={14} />
                                                }
                                                onClick={() =>
                                                    handleDescargarArchivo(
                                                        archivo,
                                                    )
                                                }
                                            >
                                                Descargar
                                            </Button>
                                        </Group>
                                    </Paper>
                                ))}
                            </Stack>
                        </div>
                    )}

                {activateDenuncia.respuesta && (
                    <>
                        <Divider my="md" />
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Respuesta del Administrador"
                            color="blue"
                        >
                            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                                {activateDenuncia.respuesta}
                            </Text>
                            {activateDenuncia.fecha_respuesta && (
                                <Text size="xs" c="dimmed" mt="xs">
                                    Respondido el:{" "}
                                    {new Date(
                                        activateDenuncia.fecha_respuesta,
                                    ).toLocaleDateString("es-EC", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            )}
                        </Alert>
                    </>
                )}

                <Group justify="flex-end">
                    <Button
                        variant="subtle"
                        onClick={handleCloseModalDetalleDenuncia}
                    >
                        Cerrar
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
