import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "@mantine/core";
import { useIndicadorStore } from "../../../../hooks";

export const ChartDesempTecnicos = () => {
    const { desempenoForTecnicos } = useIndicadorStore();

    const categories = desempenoForTecnicos?.map((tecnico) => tecnico.tecnico.toUpperCase());

    const options = {
        chart: {
            type: "bar",
            height: 70 * 10,
            backgroundColor: "transparent",
        },
        title: {
            text: "Desempeño de Técnicos",
            style: {
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
            },
        },
        xAxis: {
            categories,
            title: {
                text: "Técnicos",
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                },
            },
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: "italic",
                    color: "#333",
                },
                margin: 40, // Mayor separación entre categorías y barras
                step: 1,
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Total de Casos",
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                },
            },
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: "italic",
                    color: "#333",
                },
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontSize: "14px", // Aumentado el tamaño del número en la barra
                    fontWeight: "bold",
                    color: "black",
                },
            },
        },
        tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "#aaa",
            borderRadius: 8,
            shadow: true,
            useHTML: true,
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat:
                "<span style='color:{point.color}'>●</span> {series.name}: <b>{point.y}</b><br/>Total: <b>{point.stackTotal}</b>",
            style: {
                fontSize: "13px",
                fontStyle: "italic",
            },
        },
        plotOptions: {
            bar: {
                stacking: "normal",
                borderRadius: 4,
                pointWidth: 25, // Aumento del ancho de las barras
                margin: 20,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "14px", // Aumento del tamaño de los números en las barras
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                    },
                },
            },
        },
        legend: {
            align: "center",
            verticalAlign: "top",
            layout: "horizontal",
            itemStyle: {
                fontSize: "14px",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#333",
            },
        },
        series: [
            {
                name: "Total asignados",
                data: desempenoForTecnicos?.map((t) => t.total_asignados),
                color: "rgba(248, 123, 3, 0.66)",
            },
            {
                name: "Sin Cerrar",
                data: desempenoForTecnicos?.map((t) => t.total_atendidos),
                color: "rgba(4, 115, 253, 0.66)",
            },
            {
                name: "Total finalizadas",
                data: desempenoForTecnicos?.map((t) => t.total_finalizados),
                color: "rgba(1, 250, 82, 0.66)",
            },
            {
                name: "Total anuladas",
                data: desempenoForTecnicos?.map((t) => t.total_anuladas),
                color: "rgba(250, 9, 9, 0.66)",
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="lg" mb="sm" p="md">
            <Card.Section withBorder inheritPadding py="xs">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Card.Section>
        </Card>
    );
};
