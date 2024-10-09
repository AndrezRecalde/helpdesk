import { useEffect } from "react";
import { Box, Container, LoadingOverlay, SimpleGrid } from "@mantine/core";
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
    DashInfoStats,
} from "../../../components";

export const DashGerenciaPage = () => {
    useTitlePage("Helpdesk | Dashboard");
    const { isLoading, startLoadDashboard, clearDashboard } =
        useDashGerenciaStore();
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
            <Box pos="relative">
                <TitlePage order={2}>
                    Panel de Soporte Técnico
                </TitlePage>
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <DashSoporteStats />
                <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                    <DashInfoStats />
                    <ChartPieSoportes />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                    <ChartSoportesMes />
                    <ChartBarSoportes />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                    <ChartDesempTecnicos />
                </SimpleGrid>
            </Box>
        </Container>
    );
};
