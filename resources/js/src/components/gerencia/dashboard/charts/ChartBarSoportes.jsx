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
import { useDashGerenciaStore } from "../../../../hooks";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const ChartBarSoportes = () => {

    const { soportesForAreas } = useDashGerenciaStore();

    const options = {
        indexAxis: "y",
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 14, //this change the font size
                        weight: "italic",
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 14, //this change the font size
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
                text: "Desempeño de Áreas",
                font: {
                    size: 16,
                    weight: "italic",
                },
            },
        },
    };

    const labels = soportesForAreas?.map(soporte => soporte.area_tic);

    const data = {
        labels,
        datasets: [
           /*{
                label: "Total pendientes",
                data: soportesForAreas?.map(soporte => soporte.total_pendientes),
                backgroundColor: "rgba(239, 233, 49, 0.66)",
                borderColor: "rgba(246, 238, 70, 1)"
            }, */
            {
                label: "Total asignados",
                data: soportesForAreas?.map(soporte => soporte.total_asignados),
                backgroundColor: "rgba(248, 123, 3, 0.66)",
                borderColor: "rgba(245, 147, 55, 1)",
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
                label: "Sin cerrar",
                data: soportesForAreas?.map(soporte => soporte.total_atendidos),
                backgroundColor: "rgba(4, 115, 253, 0.66)",
                borderColor: "rgba(30, 166, 238, 1)",
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
                data: soportesForAreas?.map(soporte => soporte.total_finalizados),
                backgroundColor: "rgba(1, 250, 82, 0.66)",
                borderColor: "rgba(47, 239, 111, 1)",
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
                data: soportesForAreas?.map(soporte => soporte.total_anuladas),
                backgroundColor: "rgba(250, 9, 9, 0.66)",
                borderColor: "rgba(228, 65, 65, 1)",
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
        <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                Soportes por subprocesos
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Bar options={options} data={data} />
            </Card.Section>
        </Card>
    );
};
