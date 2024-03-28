import { useEffect } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useDashGerenciaStore } from "../../../hooks";
import {
    ChartSoportesMes,
    ChartBarSoportes,
    ChartPieSoportes,
    DashInfoStats,
    DashSoporteStats,
    TitlePage,
} from "../../../components";

export const DashGerenciaPage = () => {
    useDocumentTitle("Soportes");
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
