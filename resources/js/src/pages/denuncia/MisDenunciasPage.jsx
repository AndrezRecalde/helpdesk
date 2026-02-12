import { useEffect } from "react";
import {
    Container,
    Title,
    Button,
    Stack,
    Paper,
    Group,
    Text,
    Drawer,
} from "@mantine/core";
import { IconShieldCheck, IconFilter, IconRefresh } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
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
    const {
        handleOpenModalVerificarCedula,
        openedDrawerFiltros,
        handleOpenDrawerFiltros,
        handleCloseDrawerFiltros,
    } = useUiDenuncia();

    const form = useForm({
        initialValues: {
            anio: null,
            page: 1,
        },
    });

    useEffect(() => {
        loadData();
        return () => clearDenuncias();
    }, []);

    const loadData = (page = 1) => {
        const filterData = {
            anio: form.values.anio ? form.values.anio.getFullYear() : undefined,
            page,
        };
        startLoadMisDenuncias(filterData);
    };

    const handleApplyFilters = () => {
        form.setFieldValue("page", 1);
        loadData(1);
        handleCloseDrawerFiltros();
    };

    const handleClearFilters = () => {
        form.reset();
    };

    const handlePageChange = (newPage) => {
        form.setFieldValue("page", newPage);
        loadData(newPage);
    };

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
                        <Group>
                            <Button
                                variant="light"
                                leftSection={<IconFilter size={16} />}
                                onClick={handleOpenDrawerFiltros}
                            >
                                Filtros
                            </Button>
                            <Button
                                variant="subtle"
                                leftSection={<IconRefresh size={16} />}
                                onClick={() => loadData(form.values.page)}
                            >
                                Actualizar
                            </Button>
                            <Button
                                leftSection={<IconShieldCheck size={16} />}
                                onClick={handleOpenModalVerificarCedula}
                            >
                                Nueva Denuncia
                            </Button>
                        </Group>
                    </Group>
                </Paper>

                <Paper p="md" withBorder>
                    <MisDenunciasTable onPageChange={handlePageChange} />
                </Paper>
            </Stack>

            <Drawer
                opened={openedDrawerFiltros}
                onClose={handleCloseDrawerFiltros}
                title="Filtros"
                position="right"
                size="md"
            >
                <Stack>
                    <YearPickerInput
                        label="Año"
                        placeholder="Selecciona un año"
                        {...form.getInputProps("anio")}
                        clearable
                    />

                    <Group justify="space-between" mt="md">
                        <Button variant="subtle" onClick={handleClearFilters}>
                            Limpiar
                        </Button>
                        <Button onClick={handleApplyFilters}>
                            Aplicar Filtros
                        </Button>
                    </Group>
                </Stack>
            </Drawer>

            <ModalVerificarCedula />
            <ModalCrearDenuncia />
            <ModalDetalleDenuncia />
        </Container>
    );
};

export default MisDenunciasPage;
