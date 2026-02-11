import { useMemo, forwardRef, useImperativeHandle, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useIndicadorStore } from "../../../../hooks";
import html2canvas from "html2canvas";

export const ChartDesempTecnicos = forwardRef((props, ref) => {
    const { desempenoForTecnicos } = useIndicadorStore();
    const chartRef = useRef(null);

    // Validación de datos
    const hasValidData = useMemo(() => {
        return (
            desempenoForTecnicos &&
            Array.isArray(desempenoForTecnicos) &&
            desempenoForTecnicos.length > 0
        );
    }, [desempenoForTecnicos]);

    // Exponer método de exportación al componente padre
    useImperativeHandle(ref, () => ({
        exportChart: async () => {
            try {
                if (chartRef.current && chartRef.current.container) {
                    const chartContainer = chartRef.current.container.current;

                    if (!chartContainer) {
                        throw new Error("Chart container not found");
                    }

                    // Capturar el contenedor del gráfico con html2canvas
                    const canvas = await html2canvas(chartContainer, {
                        backgroundColor: "#ffffff",
                        scale: 2, // Mayor calidad
                        logging: false,
                    });

                    // Convertir canvas a base64
                    const base64 = canvas.toDataURL("image/png");
                    return base64;
                } else {
                    throw new Error("Chart not available");
                }
            } catch (error) {
                throw error;
            }
        },
    }));

    // Configuración del gráfico memoizada
    const options = useMemo(() => {
        if (!hasValidData) return {};

        const categories = desempenoForTecnicos.map(
            (tecnico) => tecnico.tecnico,
        );

        // Obtener colores dinámicamente del primer registro
        const firstTecnico = desempenoForTecnicos[0];

        return {
            chart: {
                type: "bar",
                height: Math.max(500, 70 * desempenoForTecnicos.length),
                backgroundColor: "transparent",
                spacing: [20, 20, 20, 20],
            },
            title: {
                text: "Desempeño por Técnicos",
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
                text: `Distribución de casos por técnico • Año ${new Date().getFullYear()}`,
                align: "center",
                style: {
                    fontSize: "13px",
                    color: "#666666",
                    fontWeight: "400",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                },
            },
            credits: {
                enabled: false,
            },
            xAxis: {
                categories,
                title: {
                    text: "Técnicos",
                    style: {
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333333",
                        fontFamily:
                            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                },
                labels: {
                    style: {
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#1a1a1a",
                        fontFamily:
                            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                },
                gridLineWidth: 0,
                lineWidth: 0,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Cantidad de Casos",
                    style: {
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#333333",
                        fontFamily:
                            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                },
                labels: {
                    style: {
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#666666",
                        fontFamily:
                            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
                },
                gridLineColor: "rgba(0, 0, 0, 0.05)",
                gridLineWidth: 1,
                stackLabels: {
                    enabled: true,
                    style: {
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        fontFamily:
                            "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                    },
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
                useHTML: true,
                headerFormat:
                    '<div style="padding: 4px 0;"><b style="color: #1a1a1a; font-size: 13px;">{point.x}</b><br/>',
                pointFormat:
                    '<span style="color:{point.color}; font-size: 16px;">●</span> ' +
                    '<span style="font-weight: 600; color: #1a1a1a;">{series.name}:</span> ' +
                    '<span style="font-weight: 700; color: #000;">{point.y}</span><br/>' +
                    '<span style="color: #666;">Total:</span> ' +
                    '<span style="font-weight: 700; color: #000;">{point.stackTotal}</span>',
                footerFormat: "</div>",
                style: {
                    fontSize: "13px",
                    fontWeight: "500",
                    fontFamily:
                        "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                },
                padding: 12,
            },
            plotOptions: {
                bar: {
                    stacking: "normal",
                    borderRadius: 5,
                    borderWidth: 0,
                    pointWidth: 28,
                    shadow: {
                        color: "rgba(0, 0, 0, 0.05)",
                        offsetX: 0,
                        offsetY: 2,
                        opacity: 0.15,
                        width: 4,
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#1a1a1a",
                            textOutline: "1px #ffffff",
                            fontFamily:
                                "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        formatter: function () {
                            return this.y > 0 ? this.y : "";
                        },
                    },
                    states: {
                        hover: {
                            brightness: 0.08,
                        },
                        inactive: {
                            opacity: 0.4,
                        },
                    },
                },
            },
            legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
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
                    name: "Asignados",
                    data: desempenoForTecnicos.map((t) => t.total_asignados),
                    color: firstTecnico?.color_asignado,
                },
                {
                    name: "Sin Cerrar",
                    data: desempenoForTecnicos.map((t) => t.total_atendidos),
                    color: firstTecnico?.color_atendido,
                },
                {
                    name: "Finalizados",
                    data: desempenoForTecnicos.map((t) => t.total_finalizados),
                    color: firstTecnico?.color_finalizado,
                },
                {
                    name: "Anulados",
                    data: desempenoForTecnicos.map((t) => t.total_anulados),
                    color: firstTecnico?.color_anulado,
                },
            ],
        };
    }, [desempenoForTecnicos, hasValidData]);

    // Manejo de estados vacíos
    if (!hasValidData) {
        return (
            <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Sin datos disponibles"
                    color="blue"
                    variant="light"
                >
                    No hay información de desempeño por técnicos para mostrar en
                    este momento.
                </Alert>
            </Card>
        );
    }

    return (
        <Card withBorder shadow="sm" radius="lg" mt="sm" mb="xl" p="md">
            <Card.Section withBorder inheritPadding py="sm">
                <Text size="md" fw={600} c="#1a1a1a">
                    Rendimiento de Técnicos
                </Text>
            </Card.Section>
            <Card.Section inheritPadding py="md">
                <HighchartsReact
                    ref={chartRef}
                    highcharts={Highcharts}
                    options={options}
                />
            </Card.Section>
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
});
