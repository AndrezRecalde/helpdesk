import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import { AppLogosTable, TitlePage } from "../../components";
import { useAppStore } from "../../hooks";

export const AppLogosPage = () => {
    const { startLoadImagenes, imagenes, startClearImagenes } = useAppStore();

    useEffect(() => {
        if (imagenes !== null || imagenes.length === 0) {
            startLoadImagenes();
        }

        return () => {
            startClearImagenes();
        };
    }, []);

    return (
        <Container size="xl">
            <Group justify="space-between" mb={20}>
                <TitlePage order={2}>
                    Gestión de Imágenes del Aplicativo
                </TitlePage>
            </Group>
            <Divider my="sm" />
            <AppLogosTable />
        </Container>
    );
};
