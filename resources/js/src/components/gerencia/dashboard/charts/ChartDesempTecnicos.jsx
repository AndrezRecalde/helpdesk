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
import { Card } from "@mantine/core";
import { TextSection } from "../../../../components";
import { useIndicadorStore } from "../../../../hooks";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const ChartDesempTecnicos = () => {
    const { desempenoForTecnicos } = useIndicadorStore();

    const options = {
        indexAxis: "y",
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    padding: 5,
                    font: {
                        size: 16, //this change the font size
                        weight: "italic",
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 16, //this change the font size
                        weight: "italic",
                    },
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",

                labels: {
                    font: {
                        size: 14,
                        weight: "italic",
                    },
                },
            },
            title: {
                display: true,
                text: "Desempeño de Técnicos",
                font: {
                    size: 22,
                    weight: "italic",
                },
            },
        },
    };

    const labels = desempenoForTecnicos?.map((tecnico) => tecnico.tecnico);

    const data = {
        labels,
        datasets: [
            /* {
                label: "Total pendientes",
                data: desempenoForTecnicos?.map(
                    (tecnico) => tecnico.total_pendientes
                ),
                backgroundColor: "rgba(239, 233, 49, 0.66)",
                borderColor: "rgba(246, 238, 70, 1)",
                borderWidth: 2,
                borderRadius: 2,
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "black",
                    align: "bottom",
                    labels: {
                        title: {
                            font: {
                                weight: "italic",
                                size: 16,
                            },
                        },
                    },
                },
            }, */
            {
                label: "Total asignados",
                data: desempenoForTecnicos?.map(
                    (tecnico) => tecnico.total_asignados
                ),
                backgroundColor: "rgba(248, 123, 3, 0.66)",
                borderColor: "rgba(245, 147, 55, 1)",
                borderWidth: 2,
                borderRadius: 2,
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "black",
                    labels: {
                        title: {
                            font: {
                                weight: "italic",
                                size: 16,
                            },
                        },
                    },
                },
            },
            {
                label: "Sin Cerrar",
                data: desempenoForTecnicos?.map(
                    (tecnico) => tecnico.total_atendidos
                ),
                backgroundColor: "rgba(4, 115, 253, 0.66)",
                borderColor: "rgba(30, 166, 238, 1)",
                borderWidth: 2,
                borderRadius: 2,
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "black",
                    labels: {
                        title: {
                            font: {
                                weight: "italic",
                                size: 16,
                            },
                        },
                    },
                },
            },
            {
                label: "Total finalizadas",
                data: desempenoForTecnicos?.map(
                    (tecnico) => tecnico.total_finalizados
                ),
                backgroundColor: "rgba(1, 250, 82, 0.66)",
                borderColor: "rgba(47, 239, 111, 1)",
                borderWidth: 2,
                borderRadius: 2,
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "black",
                    labels: {
                        title: {
                            font: {
                                weight: "italic",
                                size: 16,
                            },
                        },
                    },
                },
            },
            {
                label: "Total anuladas",
                data: desempenoForTecnicos?.map(
                    (tecnico) => tecnico.total_anuladas
                ),
                backgroundColor: "rgba(250, 9, 9, 0.66)",
                borderColor: "rgba(228, 65, 65, 1)",
                borderWidth: 2,
                borderRadius: 2,
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "black",
                    labels: {
                        title: {
                            font: {
                                weight: "italic",
                                size: 16,
                            },
                        },
                    },
                },
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="md" mt="sm" mb="sm">
            <Card.Section withBorder inheritPadding py="md">
                <TextSection fz={16} fw={700} color="dimmed">
                    Soportes por técnicos
                </TextSection>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Bar options={options} data={data} />
            </Card.Section>
        </Card>
    );
};
