import { Container } from "@mantine/core";
import {
    FilterFormSearchDates,
    TableDesempenoAreas,
    TableDesempenoEstados,
    TableDesempenoTecnicos,
    TitlePage,
} from "../../../components";

export const IndicadorReportPage = () => {
    return (
        <Container size="lg">
            <TitlePage order={2} size="h2">
                Reporte de indicadores
            </TitlePage>
            <FilterFormSearchDates />

            <TableDesempenoEstados />
            <TableDesempenoAreas />
            <TableDesempenoTecnicos />


        </Container>
    );
};
