import { Card } from "@mantine/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useIndicadorStore } from "../../../hooks";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const ChartPieEficiencia = () => {

    const { desempenoForEstados } = useIndicadorStore();

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 12,
                        weight: "italic",
                    },
                },
            },
            title: {
                display: false,
                text: "Desempeño de Áreas",
                font: {
                    size: 16,
                    weight: "italic",
                },
            },
        },
    };

    const data = {
        labels: desempenoForEstados.map(estado => estado?.estado),
        datasets: [
            {
                label: "Total: ",
                data: desempenoForEstados.map(estado => estado?.total_estados),
                backgroundColor: desempenoForEstados?.map(estado => estado?.color),
                borderColor: desempenoForEstados?.map(estado => estado?.border),
                borderWidth: 1,
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
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="md" mb="sm">
            <Card.Section withBorder inheritPadding py="xs">
                Gráfico de eficiencia de desempeño de áreas
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Pie data={data} height={300} options={options} />
            </Card.Section>
        </Card>
    );
};
