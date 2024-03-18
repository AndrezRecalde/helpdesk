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
import { useDashGerenciaStore } from "../../../hooks";

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
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Chart.js Horizontal Bar Chart",
            },
        },
    };

    const labels = soportesForAreas?.map(soporte => soporte.area_tic);

    const data = {
        labels,
        datasets: [
            {
                label: "Total pendientes",
                data: soportesForAreas?.map(soporte => soporte.total_pendientes),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Total atendidas",
                data: soportesForAreas?.map(soporte => soporte.total_atendidos),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Total finalizadas",
                data: soportesForAreas?.map(soporte => soporte.total_finalizados),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Total anuladas",
                data: soportesForAreas?.map(soporte => soporte.total_anuladas),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
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
