import { useEffect } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import {
    useDashGerenciaStore,
    useIndicadorStore,
    useTitlePage,
} from "../../../hooks";
import {
    ChartSoportesMes,
    ChartBarSoportes,
    ChartPieSoportes,
    DashSoporteStats,
    TitlePage,
    ChartDesempTecnicos,
} from "../../../components";

export const DashGerenciaPage = () => {
    useTitlePage("Helpdesk | Dashboard");
    const { startLoadDashboard, clearDashboard } = useDashGerenciaStore();
    const { startLoadDesempenoTecnicosAnual, clearIndicadores } =
        useIndicadorStore();

    useEffect(() => {
        startLoadDashboard();
        startLoadDesempenoTecnicosAnual();

        return () => {
            clearDashboard();
            clearIndicadores();
        };
    }, []);

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Panel de Soporte Técnico
            </TitlePage>
            <DashSoporteStats />
            {/* <DashInfoStats /> */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                <ChartPieSoportes />
                <ChartDesempTecnicos />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                <ChartSoportesMes />
                <ChartBarSoportes />
            </SimpleGrid>
        </Container>
    );
};
