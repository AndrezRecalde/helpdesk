import { useEffect, useState } from "react";
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
    Badge,
    Drawer,
    TextInput,
} from "@mantine/core";
import {
    IconFilter,
    IconRefresh,
    IconAlertCircle,
    IconClock,
    IconCheck,
    IconX,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
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

    const [filters, setFilters] = useState({
        estado: "",
        tipo_denuncia: "",
        fecha_desde: null,
        fecha_hasta: null,
        per_page: 15,
    });

    useEffect(() => {
        loadData();
        startLoadEstadisticas();
        return () => clearDenuncias();
    }, []);

    const loadData = () => {
        const filterData = {
            ...filters,
            fecha_desde: filters.fecha_desde
                ? filters.fecha_desde.toISOString().split("T")[0]
                : undefined,
            fecha_hasta: filters.fecha_hasta
                ? filters.fecha_hasta.toISOString().split("T")[0]
                : undefined,
        };
        startLoadDenuncias(filterData);
    };

    const handleApplyFilters = () => {
        loadData();
        handleCloseDrawerFiltros();
    };

    const handleClearFilters = () => {
        setFilters({
            estado: "",
            tipo_denuncia: "",
            fecha_desde: null,
            fecha_hasta: null,
            per_page: 15,
        });
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
                                onClick={loadData}
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
                    <DenunciasAdminTable />
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
                    <Select
                        label="Estado"
                        placeholder="Selecciona un estado"
                        data={ESTADOS}
                        value={filters.estado}
                        onChange={(value) =>
                            setFilters({ ...filters, estado: value || "" })
                        }
                    />

                    <Select
                        label="Tipo de Denuncia"
                        placeholder="Selecciona un tipo"
                        data={TIPOS}
                        value={filters.tipo_denuncia}
                        onChange={(value) =>
                            setFilters({
                                ...filters,
                                tipo_denuncia: value || "",
                            })
                        }
                    />

                    <DatePickerInput
                        label="Fecha Desde"
                        placeholder="Selecciona fecha"
                        value={filters.fecha_desde}
                        onChange={(value) =>
                            setFilters({ ...filters, fecha_desde: value })
                        }
                        clearable
                    />

                    <DatePickerInput
                        label="Fecha Hasta"
                        placeholder="Selecciona fecha"
                        value={filters.fecha_hasta}
                        onChange={(value) =>
                            setFilters({ ...filters, fecha_hasta: value })
                        }
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

            <ModalDetalleDenuncia />
            <ModalResponderDenuncia />
        </Container>
    );
};

export default DenunciasAdminPage;
