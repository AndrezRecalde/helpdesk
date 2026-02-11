import { useEffect, useRef } from "react";
import { Card, Group } from "@mantine/core";
import {
    ActionReportPDF,
    ChartDesempTecnicos,
    ResumenDesempenoArea,
    ResumenDesempenoEstados,
    TableDesempenoTecnicos,
    TableEfectividadAreas,
    TableEfectividadTecnicos,
    TableIndicadorEficacia,
    TextSection,
} from "../../../../components";
import { useIndicadorStore } from "../../../../hooks";
import Swal from "sweetalert2";

export const CardIndicadores = ({ handleExportPDF }) => {
    const { isLoadingPDF } = useIndicadorStore();
    const chartTecnicosRef = useRef(null);
    const chartAreasRef = useRef(null);

    //una carga de Swal mientras se genera el PDF
    useEffect(() => {
        if (isLoadingPDF) {
            Swal.fire({
                title: "Generando PDF...",
                text: "Por favor espere",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close();
        }
    }, [isLoadingPDF]);

    const handleExportPDFWithCharts = async (e) => {
        e.preventDefault();

        try {
            // Capturar ambos gráficos como base64
            const chartTecnicosImage = chartTecnicosRef.current
                ? await chartTecnicosRef.current.exportChart()
                : null;

            const chartAreasImage = chartAreasRef.current
                ? await chartAreasRef.current.exportChart()
                : null;

            // Llamar al handler original con las imágenes
            handleExportPDF(e, chartTecnicosImage, chartAreasImage);
        } catch (error) {
            console.error("Error capturing charts:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron capturar los gráficos. Intente nuevamente.",
            });
        }
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt={20}>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <TextSection fw={700} tt="" fz={20}>
                        Reporte de indicadores
                    </TextSection>
                    <ActionReportPDF
                        handleExportDataPDF={handleExportPDFWithCharts}
                    />
                </Group>
            </Card.Section>
            <Card.Section inheritPadding py="xs">
                <ResumenDesempenoEstados />
                <ResumenDesempenoArea ref={chartAreasRef} />

                <TableDesempenoTecnicos />
                <ChartDesempTecnicos ref={chartTecnicosRef} />

                <TableEfectividadAreas />
                <TableEfectividadTecnicos />

                <TableIndicadorEficacia />
            </Card.Section>
        </Card>
    );
};
