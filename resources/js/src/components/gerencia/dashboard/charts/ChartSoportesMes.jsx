import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "@mantine/core";
import { useDashGerenciaStore } from "../../../../hooks";

export const ChartSoportesMes = () => {
    const { soportesPorMes } = useDashGerenciaStore();

    const options = {
        chart: {
            type: "line",
            backgroundColor: "transparent",
            borderRadius: 8,
        },
        title: {
            text: "Soportes por Mes",
            align: "center",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        xAxis: {
            categories: soportesPorMes?.map((soporte) => soporte.nombre_mes),
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#333",
                },
            },
        },
        yAxis: {
            title: {
                text: "Total Soportes",
                style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                },
            },
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#666",
                },
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            backgroundColor: "#fff",
            borderColor: "#ddd",
            borderRadius: 8,
            shadow: true,
            style: {
                color: "#333",
                fontSize: "12px",
            },
            pointFormat: "<b>{point.category}</b>: {point.y} soportes",
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: true,
                    radius: 5,
                    symbol: "circle",
                },
                dataLabels: {
                    enabled: true,
                    format: "{y}",
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#000",
                        textOutline: "none",
                    },
                },
            },
        },
        legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            itemStyle: {
                fontSize: "12px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        series: [
            {
                name: "Total Soportes",
                data: soportesPorMes?.map((soporte) => soporte.total_soportes),
                //color: "rgba(24, 248, 166, 1)",
                lineColor: Highcharts.getOptions().colors[16],
                color: Highcharts.getOptions().colors[6],
                fillOpacity: 0.5,
                lineWidth: 3,
                marker: {
                    fillColor: "rgba(24, 248, 166, 1)",
                    lineColor: "#fff",
                    lineWidth: 2,
                },
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
