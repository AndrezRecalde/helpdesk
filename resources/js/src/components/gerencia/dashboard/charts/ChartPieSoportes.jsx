import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const ChartPieSoportes = ({ data }) => {
    // Validación de datos
    const hasValidData = useMemo(() => {
        return data && Array.isArray(data) && data.length > 0;
    }, [data]);

    // Cálculo del total para el subtítulo
    const totalSoportes = useMemo(() => {
        if (!hasValidData) return 0;
        return data.reduce((acc, item) => acc + (item.total_estados || 0), 0);
    }, [data, hasValidData]);

    // Configuración del gráfico memoizada
    const options = useMemo(
        () => ({
            chart: {
                type: "pie",
                backgroundColor: "transparent",
                borderRadius: 8,
                height: 400,
            },
            title: {
                text: `Estados de los soportes - ${new Date().getFullYear()}`,
                align: "center",
                style: {
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                },
            },
            subtitle: {
                text: `Total: ${totalSoportes.toLocaleString(
                    "es-ES"
                )} soportes`,
                align: "center",
                style: {
                    fontSize: "14px",
                    color: "#666",
                },
            },
            credits: {
                enabled: false, // Oculta el logo de Highcharts
            },
            accessibility: {
                enabled: true,
                point: {
                    valueSuffix: " soportes",
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                borderColor: "#ddd",
                borderRadius: 8,
                borderWidth: 1,
                shadow: {
                    color: "rgba(0, 0, 0, 0.1)",
                    offsetX: 0,
                    offsetY: 2,
                    opacity: 0.15,
                    width: 3,
                },
                style: {
                    color: "#333",
                    fontSize: "13px",
                },
                pointFormat:
                    '<span style="color:{point.color}">●</span> <b>{point.name}</b><br/>' +
                    "Cantidad: <b>{point.y}</b><br/>" +
                    "Porcentaje: <b>{point.percentage:.1f}%</b>",
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    borderWidth: 3,
                    borderColor: "#fff",
                    shadow: {
                        color: "rgba(0, 0, 0, 0.15)",
                        offsetX: 0,
                        offsetY: 4,
                        opacity: 0.3,
                        width: 5,
                    },
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b><br>{point.percentage:.1f}%",
                        distance: 15,
                        style: {
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#000",
                            textOutline: "2px contrast",
                        },
                        connectorColor: "#666",
                        connectorWidth: 1,
                    },
                    showInLegend: true,
                    states: {
                        hover: {
                            brightness: 0.1,
                        },
                        inactive: {
                            opacity: 0.5,
                        },
                    },
                    // Animación suave
                    animation: {
                        duration: 1000,
                    },
                    // Espaciado entre porciones
                    slicedOffset: 15,
                },
            },
            legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                itemStyle: {
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#333",
                },
                itemHoverStyle: {
                    color: "#000",
                },
                itemMarginBottom: 5,
                symbolRadius: 6,
            },
            series: [
                {
                    name: "Soportes",
                    colorByPoint: true,
                    innerSize: "0%", // Cambiar a '50%' para donut chart
                    data:
                        data?.map((soporte) => ({
                            name: soporte.estado,
                            y: soporte.total_estados,
                            color: soporte.color,
                            borderColor: soporte.border || soporte.color,
                            // Destacar automáticamente el estado con más soportes
                            sliced: false,
                        })) || [],
                },
            ],
        }),
        [data, totalSoportes]
    );

    // Manejo de estados vacíos o inválidos
    if (!hasValidData) {
        return (
            <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Sin datos disponibles"
                    color="blue"
                    variant="light"
                >
                    No hay información de soportes para mostrar en este momento.
                </Alert>
            </Card>
        );
    }

    return (
        <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
            <Card.Section withBorder inheritPadding py="xs">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    immutable={false}
                />
            </Card.Section>

            {/* Información adicional opcional */}
            <Card.Section inheritPadding py="xs">
                <Text size="xs" c="dimmed" ta="center">
                    Última actualización:{" "}
                    {new Date().toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </Card.Section>
        </Card>
    );
};
