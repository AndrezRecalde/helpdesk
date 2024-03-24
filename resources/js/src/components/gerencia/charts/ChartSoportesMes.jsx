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
import { useDashGerenciaStore } from "../../../hooks";

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



export const ChartSoportesMes = () => {
    const { soportesPorMes } = useDashGerenciaStore();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Total Soportes por Mes",
            },
        },
    };

    const labels = soportesPorMes?.map(soporte => soporte.nombre_mes);

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Total Soportes",
                data: soportesPorMes?.map(soporte => soporte.total_soportes),
                borderColor: "rgba(24, 248, 166, 1)",
                backgroundColor: "rgba(24, 248, 166, 0.55)",
            },
        ],
    };


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
