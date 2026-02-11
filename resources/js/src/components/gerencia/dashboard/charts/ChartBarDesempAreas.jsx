import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useIndicadorStore } from "../../../../hooks";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

export const ChartBarDesempAreas = () => {
    const { desempenoForAreas } = useIndicadorStore();

    // Validación de datos
    const hasValidData = useMemo(() => {
        return (
            desempenoForAreas &&
            Array.isArray(desempenoForAreas) &&
            desempenoForAreas.length > 0
        );
    }, [desempenoForAreas]);

    // Configuración de opciones memoizada
    const options = useMemo(
        () => ({
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 30,
                    top: 10,
                    bottom: 10,
                },
            },
            scales: {
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 13,
                            weight: "500",
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        color: "#1a1a1a",
                        padding: 8,
                    },
                    border: {
                        display: false,
                    },
                },
                x: {
                    grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                        lineWidth: 1,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: "500",
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        color: "#666666",
                        padding: 6,
                    },
                    border: {
                        display: false,
                    },
                },
            },
            elements: {
                bar: {
                    borderWidth: 0,
                    borderRadius: 6,
                },
            },
            plugins: {
                legend: {
                    position: "top",
                    align: "center",
                    labels: {
                        font: {
                            size: 13,
                            weight: "500",
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        color: "#333333",
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: "circle",
                        boxWidth: 8,
                        boxHeight: 8,
                    },
                },
                title: {
                    display: true,
                    text: "Desempeño por Áreas Técnicas",
                    font: {
                        size: 18,
                        weight: "700",
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                    color: "#1a1a1a",
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    titleColor: "#1a1a1a",
                    bodyColor: "#333333",
                    borderColor: "#e0e0e0",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: "600",
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                    bodyFont: {
                        size: 12,
                        weight: "500",
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                    displayColors: true,
                    boxWidth: 12,
                    boxHeight: 12,
                    boxPadding: 6,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || "";
                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.x !== null) {
                                label += context.parsed.x + " casos";
                            }
                            return label;
                        },
                    },
                },
                datalabels: {
                    color: "#1a1a1a",
                    anchor: "end",
                    align: "end",
                    offset: 4,
                    font: {
                        weight: "600",
                        size: 11,
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                    formatter: (value) => {
                        return value > 0 ? value : "";
                    },
                },
            },
            animation: {
                duration: 1000,
                easing: "easeOutQuart",
            },
        }),
        [],
    );

    // Preparación de datos memoizada
    const chartData = useMemo(() => {
        if (!hasValidData) return { labels: [], datasets: [] };

        const labels = desempenoForAreas.map((area) => area.area_tic);

        // Obtener colores dinámicamente del primer registro (todos tienen los mismos colores)
        const firstArea = desempenoForAreas[0];

        const datasets = [
            {
                label: "Asignados",
                data: desempenoForAreas.map((area) => area.total_asignados),
                backgroundColor: firstArea?.color_asignado,
                borderColor: firstArea?.border_asignado,
                borderWidth: 0,
            },
            {
                label: "Sin Cerrar",
                data: desempenoForAreas.map((area) => area.total_atendidos),
                backgroundColor: firstArea?.color_atendido,
                borderColor: firstArea?.border_atendido,
                borderWidth: 0,
            },
            {
                label: "Finalizados",
                data: desempenoForAreas.map((area) => area.total_finalizados),
                backgroundColor: firstArea?.color_finalizado,
                borderColor: firstArea?.border_finalizado,
                borderWidth: 0,
            },
            {
                label: "Anulados",
                data: desempenoForAreas.map((area) => area.total_anuladas),
                backgroundColor: firstArea?.color_anulado,
                borderColor: firstArea?.border_anulado,
                borderWidth: 0,
            },
        ];

        return { labels, datasets };
    }, [desempenoForAreas, hasValidData]);

    // Manejo de estados vacíos
    if (!hasValidData) {
        return (
            <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Sin datos disponibles"
                    color="blue"
                    variant="light"
                >
                    No hay información de desempeño por áreas para mostrar en
                    este momento.
                </Alert>
            </Card>
        );
    }

    return (
        <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
            <Card.Section withBorder inheritPadding py="sm">
                <Text size="md" fw={600} c="#1a1a1a">
                    Soportes por Áreas Técnicas
                </Text>
            </Card.Section>
            <Card.Section inheritPadding py="md" style={{ height: "500px" }}>
                <Bar options={options} data={chartData} />
            </Card.Section>
            <Card.Section inheritPadding py="xs">
                <Text size="xs" c="dimmed" ta="center">
                    Última actualización:{" "}
                    {new Date().toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </Card.Section>
        </Card>
    );
};
