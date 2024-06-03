import { Card } from "@mantine/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useDashGerenciaStore } from "../../../../hooks";

ChartJS.register(ArcElement, Tooltip, Legend);



export const ChartPieSoportes = () => {
    const { soportesForEstado } = useDashGerenciaStore();

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
                display: true,
                text: "Desempeño de Áreas",
                font: {
                    size: 16,
                    weight: "italic",
                },
            },
        },
    };

    const data = {
        labels: soportesForEstado?.map(soporte => soporte.estado),
        datasets: [
            {
                label: "Total: ",
                data: soportesForEstado?.map(soporte => soporte?.total_estados),
                backgroundColor: soportesForEstado?.map(soporte => soporte?.color),
                borderColor: soportesForEstado?.map(soporte => soporte?.border),
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="md" mb="sm">
            {/* <Card.Section withBorder inheritPadding py="xs">
                Estados de los soportes - {new Date().getFullYear()}
            </Card.Section> */}
            <Card.Section inheritPadding py="xs">
                <Pie
                    data={data}
                    height={400}
                    options={options}
                />
            </Card.Section>
        </Card>
    );
};
