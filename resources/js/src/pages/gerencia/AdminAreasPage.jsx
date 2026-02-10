import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import { BtnSection, TitlePage, TextSection } from "../../components";
import { useAreaTicStore, useTitlePage, useUiAreaTic } from "../../hooks";
import { IconBuildingCommunity } from "@tabler/icons-react";
import { AreasTable } from "../../components/areaTic/table/AreasTable";
import { ModalActionArea } from "../../components/areaTic/modal/ModalActionArea";
import { ModalDeleteArea } from "../../components/areaTic/modal/ModalDeleteArea";
import { ModalAsignarTecnicos } from "../../components/areaTic/modal/ModalAsignarTecnicos";
import { ModalEstadisticasArea } from "../../components/areaTic/modal/ModalEstadisticasArea";

const AdminAreasPage = () => {
    useTitlePage("Gestionar Áreas TIC - Helpdesk");
    const { areas, startLoadAreas, clearAreas } = useAreaTicStore();
    const { modalOpenActionAreaTic } = useUiAreaTic();

    useEffect(() => {
        startLoadAreas(true); // true = cargar todas las áreas (activas e inactivas)

        return () => {
            clearAreas();
        };
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        modalOpenActionAreaTic();
    };

    return (
        <Container size="xl">
            <Group justify="space-between" mb={20}>
                <div>
                    <TitlePage order={2}>Gestión de Áreas TIC</TitlePage>
                    <TextSection fw={700} tt="" fz={16}>
                        {`Tienes ${areas.length} áreas registradas`}
                    </TextSection>
                </div>
                <BtnSection
                    handleAction={handleOpenModal}
                    IconSection={IconBuildingCommunity}
                >
                    Agregar Área
                </BtnSection>
            </Group>

            <AreasTable />

            <ModalActionArea />
            <ModalDeleteArea />
            <ModalAsignarTecnicos />
            <ModalEstadisticasArea />
        </Container>
    );
};

export default AdminAreasPage;
