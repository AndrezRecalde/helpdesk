import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormEquipos,
    InvEquipoTable,
    InvViewEquipoModal,
    TitlePage,
} from "../../../components";
import { IconPlus } from "@tabler/icons-react";

export const InvEquiposPage = () => {
    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2} size="h2">
                    Inventario de Equipos
                </TitlePage>
                <BtnSection
                    IconSection={IconPlus}
                    handleAction={() => console.log("clic")}
                >
                    Agregar
                </BtnSection>
            </Group>
            <FilterFormEquipos />
            <InvEquipoTable />

            <InvViewEquipoModal />
        </Container>
    );
};
