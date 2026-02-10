import { useEffect, useState } from "react";
import {
    Modal,
    Text,
    Stack,
    Group,
    Badge,
    Loader,
    Alert,
    Progress,
} from "@mantine/core";
import { useUiAreaTic, useAreaTicStore } from "../../../hooks";
import { useTecnicoAreaStore } from "../../../hooks/tecnicoArea/useTecnicoAreaStore";
import { IconAlertCircle, IconChartBar } from "@tabler/icons-react";

export const ModalEstadisticasArea = () => {
    const { modalEstadisticasArea, modalCloseEstadisticasArea } =
        useUiAreaTic();
    const { activateArea, setActivateArea } = useAreaTicStore();
    const { startLoadEstadisticasArea, isLoading } = useTecnicoAreaStore();
    const [estadisticas, setEstadisticas] = useState([]);

    useEffect(() => {
        if (modalEstadisticasArea && activateArea) {
            loadEstadisticas();
        }
    }, [modalEstadisticasArea, activateArea]);

    const loadEstadisticas = async () => {
        if (activateArea) {
            const stats = await startLoadEstadisticasArea(
                activateArea.id_areas_tic,
            );
            setEstadisticas(stats);
        }
    };

    const handleCloseModal = () => {
        modalCloseEstadisticasArea();
        setEstadisticas([]);
        setActivateArea(null);
    };

    const totalTicketsActivos = estadisticas.reduce(
        (sum, stat) => sum + stat.tickets_activos,
        0,
    );

    return (
        <Modal
            opened={modalEstadisticasArea}
            onClose={handleCloseModal}
            title={`Estadísticas - ${activateArea?.nombre}`}
            size="lg"
            centered
        >
            <Stack gap="md">
                <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                        Total de tickets activos en el área
                    </Text>
                    <Badge size="lg" variant="filled">
                        {totalTicketsActivos}
                    </Badge>
                </Group>

                {isLoading ? (
                    <Loader size="sm" />
                ) : estadisticas.length === 0 ? (
                    <Alert icon={<IconAlertCircle size={16} />} color="blue">
                        No hay técnicos asignados a esta área
                    </Alert>
                ) : (
                    <Stack gap="md">
                        {estadisticas.map((stat) => {
                            const porcentajeCarga =
                                totalTicketsActivos > 0
                                    ? (stat.tickets_activos /
                                          totalTicketsActivos) *
                                      100
                                    : 0;

                            return (
                                <div
                                    key={stat.tecnico_id}
                                    style={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "8px",
                                        padding: "16px",
                                    }}
                                >
                                    <Group justify="space-between" mb="xs">
                                        <div>
                                            <Text fw={600} size="sm">
                                                {stat.nombre}
                                            </Text>
                                            {stat.es_principal && (
                                                <Badge
                                                    color="blue"
                                                    size="xs"
                                                    mt={4}
                                                >
                                                    Técnico Principal
                                                </Badge>
                                            )}
                                        </div>
                                        <Group gap="lg">
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <Text size="xs" c="dimmed">
                                                    Activos
                                                </Text>
                                                <Text
                                                    fw={700}
                                                    size="lg"
                                                    c="blue"
                                                >
                                                    {stat.tickets_activos}
                                                </Text>
                                            </div>
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <Text size="xs" c="dimmed">
                                                    Totales
                                                </Text>
                                                <Text fw={700} size="lg">
                                                    {stat.tickets_totales}
                                                </Text>
                                            </div>
                                        </Group>
                                    </Group>

                                    <div>
                                        <Group justify="space-between" mb={4}>
                                            <Text size="xs" c="dimmed">
                                                Carga de trabajo
                                            </Text>
                                            <Text size="xs" fw={600}>
                                                {porcentajeCarga.toFixed(1)}%
                                            </Text>
                                        </Group>
                                        <Progress
                                            value={porcentajeCarga}
                                            color={
                                                porcentajeCarga > 70
                                                    ? "red"
                                                    : porcentajeCarga > 40
                                                      ? "yellow"
                                                      : "green"
                                            }
                                            size="md"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </Stack>
                )}
            </Stack>
        </Modal>
    );
};
