import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "@mantine/core";

export const ChartPieSoportes = ({ data }) => {

    const options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            borderRadius: 8,
        },
        title: {
            text: `Estados de los soportes - ${new Date().getFullYear()}`,
            align: "center",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        tooltip: {
            backgroundColor: "#fff",
            borderColor: "#ddd",
            borderRadius: 8,
            shadow: true,
            style: {
                color: "#333",
                fontSize: "12px",
            },
            pointFormat: "<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                borderWidth: 2,
                borderColor: "#fff",
                shadow: true,
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.y}",
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#000",
                        textOutline: "none",
                    },
                },
                showInLegend: true,
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
                name: "Total",
                colorByPoint: true,
                data: data?.map((soporte) => ({
                    name: soporte.estado,
                    y: soporte.total_estados,
                    color: soporte.color, // Colores personalizados
                })),
            },
        ],
    };

    return (
        <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
            {/* <Card.Section withBorder inheritPadding py="md">
                <TextSection fz={16} fw={700} color="dimmed">
                    Estados de los soportes - {new Date().getFullYear()}
                </TextSection>
            </Card.Section> */}
            <Card.Section withBorder inheritPadding py="xs">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Card.Section>
        </Card>
    );
};
