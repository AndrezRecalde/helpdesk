import { useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    Text,
    Group,
    Badge,
    Progress,
    Stack,
} from "@mantine/core";
import { TitlePage } from "../../components";
import { useTitlePage } from "../../hooks";
import { useTecnicoAreaStore } from "../../hooks/tecnicoArea/useTecnicoAreaStore";
import { IconUsers, IconTicket, IconChartBar } from "@tabler/icons-react";

const DashboardAreasPage = () => {
    useTitlePage("Dashboard Áreas TIC - Helpdesk");
    const { resumenAreas, startLoadResumenAreas } = useTecnicoAreaStore();

    useEffect(() => {
        startLoadResumenAreas();
    }, []);

    const totalAreas = resumenAreas.length;
    const totalTecnicos = resumenAreas.reduce(
        (sum, area) => sum + area.tecnicos_asignados,
        0,
    );
    const totalTickets = resumenAreas.reduce(
        (sum, area) => sum + area.tickets_activos,
        0,
    );

    return (
        <Container size="xl">
            <TitlePage order={2} mb={20}>
                Dashboard de Áreas TIC
            </TitlePage>

            {/* Resumen General */}
            <Grid mb={30}>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group>
                            <IconChartBar size={40} color="#228be6" />
                            <div>
                                <Text size="xs" c="dimmed">
                                    Total Áreas
                                </Text>
                                <Text size="xl" fw={700}>
                                    {totalAreas}
                                </Text>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group>
                            <IconUsers size={40} color="#40c057" />
                            <div>
                                <Text size="xs" c="dimmed">
                                    Técnicos Asignados
                                </Text>
                                <Text size="xl" fw={700}>
                                    {totalTecnicos}
                                </Text>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group>
                            <IconTicket size={40} color="#fa5252" />
                            <div>
                                <Text size="xs" c="dimmed">
                                    Tickets Activos
                                </Text>
                                <Text size="xl" fw={700}>
                                    {totalTickets}
                                </Text>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>
            </Grid>

            {/* Detalles por Área */}
            <Text size="lg" fw={600} mb="md">
                Distribución por Área
            </Text>

            <Grid>
                {resumenAreas.map((area) => {
                    const capacidadPorcentaje =
                        area.tickets_activos > 0
                            ? Math.min((area.tickets_activos / 50) * 100, 100)
                            : 0;

                    return (
                        <Grid.Col
                            key={area.area_id}
                            span={{ base: 12, md: 6, lg: 4 }}
                        >
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <Stack gap="sm">
                                    <Group justify="space-between">
                                        <Text fw={600}>{area.nombre}</Text>
                                        <Badge
                                            color={
                                                area.tiene_capacidad
                                                    ? "green"
                                                    : "red"
                                            }
                                            variant="light"
                                        >
                                            {area.tiene_capacidad
                                                ? "Disponible"
                                                : "Saturado"}
                                        </Badge>
                                    </Group>

                                    <Group justify="space-between">
                                        <Text size="sm" c="dimmed">
                                            Técnicos
                                        </Text>
                                        <Text size="sm" fw={600}>
                                            {area.tecnicos_asignados}
                                        </Text>
                                    </Group>

                                    <Group justify="space-between">
                                        <Text size="sm" c="dimmed">
                                            Tickets Activos
                                        </Text>
                                        <Text size="sm" fw={600} c="blue">
                                            {area.tickets_activos}
                                        </Text>
                                    </Group>

                                    <div>
                                        <Group justify="space-between" mb={4}>
                                            <Text size="xs" c="dimmed">
                                                Capacidad
                                            </Text>
                                            <Text size="xs" fw={600}>
                                                {capacidadPorcentaje.toFixed(0)}
                                                %
                                            </Text>
                                        </Group>
                                        <Progress
                                            value={capacidadPorcentaje}
                                            color={
                                                capacidadPorcentaje > 80
                                                    ? "red"
                                                    : capacidadPorcentaje > 50
                                                      ? "yellow"
                                                      : "green"
                                            }
                                            size="md"
                                        />
                                    </div>

                                    {area.tecnicos &&
                                        area.tecnicos.length > 0 && (
                                            <div>
                                                <Text
                                                    size="xs"
                                                    c="dimmed"
                                                    mb={4}
                                                >
                                                    Distribución de técnicos
                                                </Text>
                                                <Stack gap={4}>
                                                    {area.tecnicos
                                                        .slice(0, 3)
                                                        .map((tecnico) => (
                                                            <Group
                                                                key={
                                                                    tecnico.tecnico_id
                                                                }
                                                                justify="space-between"
                                                                p={4}
                                                                style={{
                                                                    backgroundColor:
                                                                        "#f8f9fa",
                                                                    borderRadius:
                                                                        "4px",
                                                                }}
                                                            >
                                                                <Text size="xs">
                                                                    {
                                                                        tecnico.nombre
                                                                    }
                                                                    {tecnico.es_principal &&
                                                                        " ⭐"}
                                                                </Text>
                                                                <Badge
                                                                    size="xs"
                                                                    variant="filled"
                                                                >
                                                                    {
                                                                        tecnico.tickets_activos
                                                                    }
                                                                </Badge>
                                                            </Group>
                                                        ))}
                                                    {area.tecnicos.length >
                                                        3 && (
                                                        <Text
                                                            size="xs"
                                                            c="dimmed"
                                                            ta="center"
                                                        >
                                                            +
                                                            {area.tecnicos
                                                                .length -
                                                                3}{" "}
                                                            más
                                                        </Text>
                                                    )}
                                                </Stack>
                                            </div>
                                        )}
                                </Stack>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default DashboardAreasPage;
