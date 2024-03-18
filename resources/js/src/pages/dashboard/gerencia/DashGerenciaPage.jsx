import { Container, SimpleGrid } from "@mantine/core";
import {
    ChartSoportesMes,
    ChartBarSoportes,
    ChartPieSoportes,
    DashInfoStats,
    DashSoporteStats,
    TitlePage,
} from "../../../components";
import { useDashGerenciaStore } from "../../../hooks";
import { useEffect } from "react";

export const DashGerenciaPage = () => {
    const { startLoadDashboard, clearDashboard } = useDashGerenciaStore();

    useEffect(() => {
        startLoadDashboard();

      return () => {
        clearDashboard();
      }
    }, [])


    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Panel de Soporte Técnico
            </TitlePage>
            <DashSoporteStats />
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                <DashInfoStats />
                <ChartPieSoportes />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                <ChartSoportesMes />
                <ChartBarSoportes />
            </SimpleGrid>
        </Container>
    );
};
