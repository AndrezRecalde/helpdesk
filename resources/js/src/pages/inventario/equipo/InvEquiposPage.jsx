import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormEquipos,
    InvEquipoAsignacionModal,
    InvEquipoModal,
    InvEquipoTable,
    InvViewEquipoModal,
    TitlePage,
} from "../../../components";
import { IconCopyPlus } from "@tabler/icons-react";
import { useInvUiEquipo } from "../../../hooks";

export const InvEquiposPage = () => {
    const { modalActionEquipo } = useInvUiEquipo();

    const handleAgregar = () => {
        modalActionEquipo(true);
    }

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2} size="h2">
                    Inventario de Equipos
                </TitlePage>
                <BtnSection
                    IconSection={IconCopyPlus}
                    handleAction={handleAgregar}
                >
                    Agregar
                </BtnSection>
            </Group>
            <FilterFormEquipos />
            <InvEquipoTable />

            <InvViewEquipoModal />
            <InvEquipoAsignacionModal />
            <InvEquipoModal />
        </Container>
    );
};
