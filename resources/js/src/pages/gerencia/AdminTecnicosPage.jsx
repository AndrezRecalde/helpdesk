import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import { BtnSection, ModalAddTecnico, TecnicosTable, TextSection, TitlePage } from "../../components";
import { useTecnicoStore, useUiTecnico } from "../../hooks";

export const AdminTecnicosPage = () => {

    const { tecnicos, startLoadTecnicosAdmin, clearTecnicos } = useTecnicoStore();
    const { modalActionTecnico } = useUiTecnico();

    useEffect(() => {
        startLoadTecnicosAdmin();

      return () => {
        clearTecnicos();
      }
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        modalActionTecnico(1, false);
    }

    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Gestión De Técnicos
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    {`Tienes ${tecnicos.length} técnicos activados`}
                </TextSection>
                <BtnSection handleAction={handleOpenModal} >Agregar Técnico</BtnSection>
            </Group>
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <TecnicosTable />
                </Card.Section>
            </Card>
            <ModalAddTecnico />
        </Container>
    );
};
