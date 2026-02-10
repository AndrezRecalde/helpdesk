import { useEffect, useState } from "react";
import {
    SimpleGrid,
    Card,
    Text,
    Group,
    Badge,
    Popover,
    Stack,
    rem,
} from "@mantine/core";
import { IconTrophyFilled } from "@tabler/icons-react";
import { useTecnicoStore } from "../../../hooks";

export const TopTecnicosStats = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { estadisticas, isLoadingEstadisticas, loadEstadisticas } =
        useTecnicoStore();
    const [openedPopover, setOpenedPopover] = useState(null);

    // Solo mostrar si es TIC_GERENTE (role_id = 1)
    if (usuario.role_id !== 1) {
        return null;
    }

    useEffect(() => {
        loadEstadisticas();

        // Auto-refresh cada 30 segundos
        /* const interval = setInterval(() => {
            loadEstadisticas();
        }, 30000);

        return () => clearInterval(interval); */
    }, []);

    if (isLoadingEstadisticas && estadisticas.length === 0) {
        return null; // O un skeleton loader si prefieres
    }

    if (estadisticas.length === 0) {
        return null; // No mostrar nada si no hay datos
    }

    const getMedalColor = (index) => {
        if (index === 0) return "yellow.6"; // Oro
        if (index === 1) return "gray.5"; // Plata
        if (index === 2) return "orange.7"; // Bronce
        return "blue.6";
    };

    const getMedalIcon = (index) => {
        if (index < 3) return <IconTrophyFilled size={24} />;
        return `#${index + 1}`;
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
                {estadisticas.map((tecnico, index) => (
                    <Card
                        key={tecnico.tecnico_id}
                        shadow="xs"
                        padding="md"
                        radius="md"
                        withBorder
                        style={{
                            borderColor:
                                index < 3
                                    ? `var(--mantine-color-${getMedalColor(index).split(".")[0]}-3)`
                                    : undefined,
                            borderWidth: index < 3 ? "2px" : "1px",
                        }}
                    >
                        <Stack gap="xs" align="center">
                            {/* Posición */}
                            <Text
                                size="xs"
                                fw={700}
                                c={getMedalColor(index)}
                                style={{ fontSize: rem(25) }}
                            >
                                {getMedalIcon(index)}
                            </Text>

                            {/* Nombre del Técnico */}
                            <Text
                                size="sm"
                                fw={500}
                                ta="center"
                                lineClamp={2}
                                style={{ minHeight: rem(40) }}
                            >
                                {tecnico.nombre}
                            </Text>

                            {/* Total con Popover */}
                            <Popover
                                variant="default"
                                width={220}
                                position="bottom"
                                withArrow
                                shadow="md"
                                opened={openedPopover === tecnico.tecnico_id}
                                onChange={(opened) =>
                                    setOpenedPopover(
                                        opened ? tecnico.tecnico_id : null,
                                    )
                                }
                            >
                                <Popover.Target>
                                    <Badge
                                        size="md"
                                        variant="default"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setOpenedPopover(
                                                openedPopover ===
                                                    tecnico.tecnico_id
                                                    ? null
                                                    : tecnico.tecnico_id,
                                            )
                                        }
                                    >
                                        {tecnico.total} tickets
                                    </Badge>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Stack gap="xs">
                                        <Text size="sm" fw={700} ta="center">
                                            Desglose de Tickets
                                        </Text>
                                        <Group justify="space-between">
                                            <Text size="sm">Asignados:</Text>
                                            <Badge color="blue" variant="light">
                                                {tecnico.asignados}
                                            </Badge>
                                        </Group>
                                        <Group justify="space-between">
                                            <Text size="sm">Sin Cerrar:</Text>
                                            <Badge
                                                color="yellow"
                                                variant="light"
                                            >
                                                {tecnico.sin_cerrar}
                                            </Badge>
                                        </Group>
                                        <Group justify="space-between">
                                            <Text size="sm">Finalizados:</Text>
                                            <Badge
                                                color="green"
                                                variant="light"
                                            >
                                                {tecnico.finalizados}
                                            </Badge>
                                        </Group>
                                    </Stack>
                                </Popover.Dropdown>
                            </Popover>
                        </Stack>
                    </Card>
                ))}
            </SimpleGrid>
        </Card>
    );
};
