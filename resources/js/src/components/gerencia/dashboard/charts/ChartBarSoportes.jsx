import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "@mantine/core";
import { useDashGerenciaStore } from "../../../../hooks";

export const ChartBarSoportes = () => {
    const { soportesForAreas } = useDashGerenciaStore();

    const options = {
        chart: {
            type: "bar",
            backgroundColor: "transparent",
        },
        title: {
            text: "Desempeño de Áreas - Tickets",
            style: {
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
            },
        },
        xAxis: {
            categories: soportesForAreas?.map((soporte) => soporte.area_tic),
            title: {
                text: "Áreas de Soporte",
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                },
            },
            labels: {
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "#333",
                },
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Cantidad de Tickets",
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                },
            },
            labels: {
                style: {
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "#333",
                },
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "12px",
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
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                    },
                },
            },
        },
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical",
            itemStyle: {
                fontSize: "14px",
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#333",
            },
        },
        series: [
            {
                name: "Total Asignados",
                data: soportesForAreas?.map(
                    (soporte) => soporte.total_asignados
                ),
                color: "rgba(248, 123, 3, 0.8)",
            },
            {
                name: "Sin Cerrar",
                data: soportesForAreas?.map(
                    (soporte) => soporte.total_atendidos
                ),
                color: "rgba(4, 115, 253, 0.8)",
            },
            {
                name: "Finalizados",
                data: soportesForAreas?.map(
                    (soporte) => soporte.total_finalizados
                ),
                color: "rgba(1, 250, 82, 0.8)",
            },
            {
                name: "Anulados",
                data: soportesForAreas?.map(
                    (soporte) => soporte.total_anuladas
                ),
                color: "rgba(250, 9, 9, 0.8)",
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="lg" mb="sm" p="md">
           {/*  <Card.Section withBorder inheritPadding py="md">
                <TextSection fz={16} fw={700} color="dimmed">
                    Soportes por Subprocesos
                </TextSection>
            </Card.Section> */}
            <Card.Section withBorder inheritPadding py="xs">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Card.Section>
        </Card>
    );
};
