import { ActionIcon, Card, Group, LoadingOverlay } from "@mantine/core";
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
import { IconFileTypePdf } from "@tabler/icons-react";
import { useIndicadorStore } from "../../../../hooks";

export const CardIndicadores = ({ handleExportPDF }) => {
    const { isLoading } = useIndicadorStore();

    return (
        <>
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Card shadow="sm" padding="lg" radius="md" withBorder mt={20}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <TextSection fw={700} tt="" fz={20}>
                            Reporte de indicadores
                        </TextSection>
                        <ActionReportPDF
                            handleExportDataPDF={handleExportPDF}
                        />
                    </Group>
                </Card.Section>
                <Card.Section inheritPadding py="xs">
                    <ResumenDesempenoEstados />
                    <ResumenDesempenoArea />

                    <TableDesempenoTecnicos />
                    <ChartDesempTecnicos />

                    <TableEfectividadAreas />
                    <TableEfectividadTecnicos />

                    <TableIndicadorEficacia />
                </Card.Section>
            </Card>
        </>
    );
};
