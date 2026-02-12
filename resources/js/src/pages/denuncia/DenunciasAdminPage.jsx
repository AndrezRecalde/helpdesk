import { useEffect } from "react";
import {
    Container,
    Title,
    Stack,
    Paper,
    Group,
    Text,
    Select,
    Button,
    Grid,
    Card,
    Drawer,
} from "@mantine/core";
import {
    IconFilter,
    IconRefresh,
    IconAlertCircle,
    IconClock,
    IconCheck,
    IconX,
} from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDenunciaStore, useUiDenuncia, useTitlePage } from "../../hooks";
import {
    DenunciasAdminTable,
    ModalDetalleDenuncia,
    ModalResponderDenuncia,
} from "../../components";

const ESTADOS = [
    { value: "", label: "Todos los estados" },
    { value: "PENDIENTE", label: "Pendiente" },
    { value: "EN_PROCESO", label: "En Proceso" },
    { value: "RESUELTO", label: "Resuelto" },
    { value: "RECHAZADO", label: "Rechazado" },
];

const TIPOS = [
    { value: "", label: "Todos los tipos" },
    { value: "ACOSO", label: "Acoso" },
    { value: "ABUSO", label: "Abuso de Autoridad" },
    { value: "CORRUPCION", label: "Corrupción" },
    { value: "OTRO", label: "Otro" },
];

const DenunciasAdminPage = () => {
    useTitlePage("Gestión de Denuncias");
    const {
        startLoadDenuncias,
        startLoadEstadisticas,
        clearDenuncias,
        estadisticas,
    } = useDenunciaStore();
    const {
        openedDrawerFiltros,
        handleOpenDrawerFiltros,
        handleCloseDrawerFiltros,
    } = useUiDenuncia();

    const form = useForm({
        initialValues: {
            estado: "",
            tipo_denuncia: "",
            anio: null,
            page: 1,
        },
    });

    useEffect(() => {
        loadData();
        startLoadEstadisticas();
        return () => clearDenuncias();
    }, []);

    const loadData = (page = 1) => {
        const filterData = {
            estado: form.values.estado || undefined,
            tipo_denuncia: form.values.tipo_denuncia || undefined,
            anio: form.values.anio ? form.values.anio.getFullYear() : undefined,
            page,
        };
        startLoadDenuncias(filterData);
    };

    const handleApplyFilters = () => {
        form.setFieldValue("page", 1);
        loadData(1);
        const anio = form.values.anio ? form.values.anio.getFullYear() : null;
        startLoadEstadisticas(anio);
        handleCloseDrawerFiltros();
    };

    const handleClearFilters = () => {
        form.reset();
        loadData(1);
        startLoadEstadisticas();
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
                            <Title order={2}>Gestión de Denuncias</Title>
                            <Text size="sm" c="dimmed" mt={4}>
                                Administra y responde las denuncias recibidas
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
                        </Group>
                    </Group>
                </Paper>

                {estadisticas && (
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <div>
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            tt="uppercase"
                                            fw={700}
                                        >
                                            Total
                                        </Text>
                                        <Text size="xl" fw={700}>
                                            {estadisticas.total}
                                        </Text>
                                    </div>
                                    <IconAlertCircle size={32} color="gray" />
                                </Group>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <div>
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            tt="uppercase"
                                            fw={700}
                                        >
                                            Pendientes
                                        </Text>
                                        <Text size="xl" fw={700} c="yellow">
                                            {estadisticas.por_estado
                                                ?.pendientes || 0}
                                        </Text>
                                    </div>
                                    <IconClock size={32} color="orange" />
                                </Group>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <div>
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            tt="uppercase"
                                            fw={700}
                                        >
                                            Resueltas
                                        </Text>
                                        <Text size="xl" fw={700} c="green">
                                            {estadisticas.por_estado
                                                ?.resueltas || 0}
                                        </Text>
                                    </div>
                                    <IconCheck size={32} color="green" />
                                </Group>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <div>
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            tt="uppercase"
                                            fw={700}
                                        >
                                            Rechazadas
                                        </Text>
                                        <Text size="xl" fw={700} c="red">
                                            {estadisticas.por_estado
                                                ?.rechazadas || 0}
                                        </Text>
                                    </div>
                                    <IconX size={32} color="red" />
                                </Group>
                            </Card>
                        </Grid.Col>
                    </Grid>
                )}

                <Paper p="md" withBorder>
                    <DenunciasAdminTable onPageChange={handlePageChange} />
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

                    <Select
                        label="Estado"
                        placeholder="Selecciona un estado"
                        data={ESTADOS}
                        {...form.getInputProps("estado")}
                    />

                    <Select
                        label="Tipo de Denuncia"
                        placeholder="Selecciona un tipo"
                        data={TIPOS}
                        {...form.getInputProps("tipo_denuncia")}
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

            <ModalDetalleDenuncia />
            <ModalResponderDenuncia />
        </Container>
    );
};

export default DenunciasAdminPage;
