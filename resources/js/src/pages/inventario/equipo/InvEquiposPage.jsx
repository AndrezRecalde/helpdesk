import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormEquipos,
    InvEquipoAsignacionModal,
    InvEquipoTable,
    InvViewEquipoModal,
    TitlePage,
} from "../../../components";
import { IconCopyPlus } from "@tabler/icons-react";
import { useInvUiConcepto } from "../../../hooks";

export const InvEquiposPage = () => {
    const { modalActionConcepto } = useInvUiConcepto();

    const handleAgregar = () => {
        modalActionConcepto(true);
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
        </Container>
    );
};
