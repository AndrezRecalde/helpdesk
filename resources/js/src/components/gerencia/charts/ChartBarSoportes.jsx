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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() =>
                Math.floor(Math.random() * (1000 - 0 + 1) + 0)
            ),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() =>
                Math.floor(Math.random() * (1000 - 0 + 1) + 0)
            ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};
export const ChartBarSoportes = () => {
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
