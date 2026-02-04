import { useEffect } from "react";
import {
    Container,
    Title,
    Button,
    Stack,
    Paper,
    Group,
    Text,
} from "@mantine/core";
import { IconPlus, IconShieldCheck } from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia, useTitlePage } from "../../hooks";
import {
    ModalVerificarCedula,
    ModalCrearDenuncia,
    ModalDetalleDenuncia,
    MisDenunciasTable,
} from "../../components";

const MisDenunciasPage = () => {
    useTitlePage("Mis Denuncias - Intranet");
    const { startLoadMisDenuncias, clearDenuncias } = useDenunciaStore();
    const { handleOpenModalVerificarCedula } = useUiDenuncia();

    useEffect(() => {
        startLoadMisDenuncias();
        return () => clearDenuncias();
    }, []);

    return (
        <Container size="xl" py="xl">
            <Stack>
                <Paper p="md" withBorder>
                    <Group justify="space-between" align="center">
                        <div>
                            <Title order={2}>Mis Denuncias</Title>
                            <Text size="sm" c="dimmed" mt={4}>
                                Consulta el estado de tus denuncias y reportes
                            </Text>
                        </div>
                        <Button
                            leftSection={<IconShieldCheck size={16} />}
                            onClick={handleOpenModalVerificarCedula}
                        >
                            Nueva Denuncia
                        </Button>
                    </Group>
                </Paper>

                <Paper p="md" withBorder>
                    <MisDenunciasTable />
                </Paper>
            </Stack>

            <ModalVerificarCedula />
            <ModalCrearDenuncia />
            <ModalDetalleDenuncia />
        </Container>
    );
};

export default MisDenunciasPage;
