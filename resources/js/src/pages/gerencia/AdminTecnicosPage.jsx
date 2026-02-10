import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    ModalAddTecnico,
    TecnicosTable,
    TextSection,
    TitlePage,
} from "../../components";
import { useTecnicoStore, useTitlePage, useUiTecnico } from "../../hooks";
import { IconPencilPlus } from "@tabler/icons-react";

const AdminTecnicosPage = () => {
    useTitlePage("Gestionar Técnicos - Helpdesk");
    const { tecnicos, startLoadTecnicosAdmin, clearTecnicos } =
        useTecnicoStore();
    const { toggleModalTecnico } = useUiTecnico();

    useEffect(() => {
        startLoadTecnicosAdmin();

        return () => {
            clearTecnicos();
        };
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        toggleModalTecnico();
    };

    return (
        <Container size="xl">
            <Group justify="space-between" mb={20}>
                <div>
                    <TitlePage order={2}>Gestión de técnicos</TitlePage>
                    <TextSection fw={700} tt="" fz={16}>
                        {`Tienes ${tecnicos.length} técnicos activados`}
                    </TextSection>
                </div>
                <BtnSection
                    handleAction={handleOpenModal}
                    IconSection={IconPencilPlus}
                >
                    Agregar Técnico
                </BtnSection>
            </Group>

            <TecnicosTable />

            <ModalAddTecnico />
        </Container>
    );
};

export default AdminTecnicosPage;
