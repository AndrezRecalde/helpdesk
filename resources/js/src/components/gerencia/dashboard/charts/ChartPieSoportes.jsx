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
                height: 450,
                spacing: [20, 20, 20, 20],
            },
            title: {
                text: `Estados de Soportes Técnicos`,
                align: "center",
                style: {
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    letterSpacing: "0.5px",
                },
                margin: 25,
            },
            subtitle: {
                text: `Período ${new Date().getFullYear()} • Total: ${totalSoportes.toLocaleString(
                    "es-ES",
                )} casos`,
                align: "center",
                style: {
                    fontSize: "13px",
                    color: "#666666",
                    fontWeight: "400",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                },
                y: 35,
            },
            credits: {
                enabled: false,
            },
            accessibility: {
                enabled: true,
                point: {
                    valueSuffix: " soportes",
                },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                borderColor: "#e0e0e0",
                borderRadius: 10,
                borderWidth: 1,
                shadow: {
                    color: "rgba(0, 0, 0, 0.12)",
                    offsetX: 0,
                    offsetY: 4,
                    opacity: 0.2,
                    width: 8,
                },
                style: {
                    color: "#1a1a1a",
                    fontSize: "13px",
                    fontWeight: "500",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                },
                padding: 12,
                pointFormat:
                    '<div style="padding: 4px 0;">' +
                    '<span style="color:{point.color}; font-size: 16px;">●</span> ' +
                    '<span style="font-weight: 600; color: #1a1a1a;">{point.name}</span><br/>' +
                    '<span style="color: #666;">Cantidad:</span> <span style="font-weight: 700; color: #000;">{point.y}</span><br/>' +
                    '<span style="color: #666;">Porcentaje:</span> <span style="font-weight: 700; color: #000;">{point.percentage:.1f}%</span>' +
                    "</div>",
                useHTML: true,
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    shadow: {
                        color: "rgba(0, 0, 0, 0.08)",
                        offsetX: 0,
                        offsetY: 3,
                        opacity: 0.25,
                        width: 6,
                    },
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b><br>{point.percentage:.1f}%",
                        distance: 20,
                        style: {
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#1a1a1a",
                            textOutline: "2px #ffffff",
                            fontFamily:
                                "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        connectorColor: "#999999",
                        connectorWidth: 1.5,
                        connectorPadding: 8,
                    },
                    showInLegend: true,
                    states: {
                        hover: {
                            brightness: 0.08,
                            halo: {
                                size: 8,
                                opacity: 0.25,
                            },
                        },
                        inactive: {
                            opacity: 0.4,
                        },
                        select: {
                            color: null,
                            borderColor: "#1a1a1a",
                            borderWidth: 3,
                        },
                    },
                    animation: {
                        duration: 1200,
                        easing: "easeOutQuart",
                    },
                    slicedOffset: 12,
                    size: "85%",
                },
            },
            legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                itemStyle: {
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#333333",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                },
                itemHoverStyle: {
                    color: "#000000",
                },
                itemMarginBottom: 8,
                symbolRadius: 8,
                symbolHeight: 12,
                symbolWidth: 12,
                symbolPadding: 8,
                padding: 15,
            },
            series: [
                {
                    name: "Soportes",
                    colorByPoint: true,
                    innerSize: "0%",
                    data:
                        data?.map((soporte) => ({
                            name: soporte.estado,
                            y: soporte.total_estados,
                            color: soporte.color,
                            borderColor: "#ffffff",
                            sliced: false,
                        })) || [],
                },
            ],
        }),
        [data, totalSoportes],
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
