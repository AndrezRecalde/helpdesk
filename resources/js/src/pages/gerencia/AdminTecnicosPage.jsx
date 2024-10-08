import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import { BtnSection, ModalAddTecnico, TecnicosTable, TextSection, TitlePage } from "../../components";
import { useTecnicoStore, useTitlePage, useUiTecnico } from "../../hooks";
import { IconPencilPlus } from "@tabler/icons-react";

export const AdminTecnicosPage = () => {
    useTitlePage("Helpdesk | Técnicos");
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
        <Container size="xxl">
            <TitlePage order={2}>
                Gestión De Técnicos
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    {`Tienes ${tecnicos.length} técnicos activados`}
                </TextSection>
                <BtnSection handleAction={handleOpenModal} IconSection={IconPencilPlus}>Agregar Técnico</BtnSection>
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
