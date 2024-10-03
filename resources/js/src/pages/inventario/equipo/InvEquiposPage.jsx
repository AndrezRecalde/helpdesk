import { Container } from "@mantine/core";
import { FilterFormEquipos, InvEquipoTable, TitlePage } from "../../../components";

export const InvEquiposPage = () => {
    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Inventario de Equipos
            </TitlePage>
            <FilterFormEquipos />
            <InvEquipoTable />
        </Container>
    );
};
