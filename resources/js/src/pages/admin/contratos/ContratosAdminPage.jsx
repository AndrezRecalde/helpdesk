import { Container, Group, Divider } from "@mantine/core";
import { TitlePage } from "../../../components";
import { ContratosTable } from "../../../components/contratos/table/ContratosTable";
import { ModalContrato } from "../../../components/contratos/modal/ModalContrato";

const ContratosAdminPage = () => {
    return (
        <Container size="xl">
            <Group justify="space-between" mb={20}>
                <TitlePage order={2}>
                    Administración de Contratos de Software
                </TitlePage>
            </Group>
            <Divider my="sm" />
            <ContratosTable />
            <ModalContrato />
        </Container>
    );
};

export default ContratosAdminPage;
