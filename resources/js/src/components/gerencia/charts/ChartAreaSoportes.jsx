import { Card } from "@mantine/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: "Dataset 2",
            data: labels.map(() =>
                Math.floor(Math.random() * (1000 - 0 + 1) + 0)
            ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 34, 122, 0.5)",
        },
    ],
};

export const ChartAreaSoportes = () => {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
                Soportes por mes
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Line options={options} data={data} />
            </Card.Section>
        </Card>
    );
};
