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
import { useIndicadorStore } from "../../../hooks";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ChartDesempTecnicos = () => {
    const { desempenoForTecnicos } = useIndicadorStore();


    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Resumen por areas",
            },
        },
    };

    const labels = desempenoForTecnicos?.map(tecnico => tecnico.tecnico);

    const data = {
        labels,
        datasets: [
            {
                label: "Total pendientes",
                data: desempenoForTecnicos?.map(tecnico => tecnico.total_pendientes),
                backgroundColor: "rgba(239, 233, 49, 0.66)",
                borderColor: "rgba(246, 238, 70, 1)"
            },
            {
                label: "Total atendidas",
                data: desempenoForTecnicos?.map(tecnico => tecnico.total_atendidos),
                backgroundColor: "rgba(4, 115, 253, 0.66)",
                borderColor: "rgba(30, 166, 238, 1)"
            },
            {
                label: "Total finalizadas",
                data: desempenoForTecnicos?.map(tecnico => tecnico.total_finalizados),
                backgroundColor: "rgba(1, 250, 82, 0.66)",
                borderColor: "rgba(47, 239, 111, 1)"
            },
            {
                label: "Total anuladas",
                data: desempenoForTecnicos?.map(tecnico => tecnico.total_anuladas),
                backgroundColor: "rgba(250, 9, 9, 0.66)",
                borderColor: "rgba(228, 65, 65, 1)"
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
