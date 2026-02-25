import {
    Accordion,
    Badge,
    Card,
    Group,
    Stack,
    Text,
    ThemeIcon,
    Tooltip,
} from "@mantine/core";
import { IconKey, IconShield, IconShieldCheck } from "@tabler/icons-react";
import { ProfileForm, TextSection } from "../../../components";
import { useAuthStore } from "../../../hooks";

/* Colores por rol */
const ROL_COLOR = {
    GERENTE: "red",
    TIC: "blue",
    TTHH: "teal",
};

export const CardProfile = () => {
    const { profile, isLoading } = useAuthStore();

    const roles = profile?.roles ?? [];
    const permissions = profile?.permissions ?? [];
    const rolLabel = roles.length > 0 ? roles[0] : "USUARIO_GAD";
    const rolColor = ROL_COLOR[rolLabel] ?? "gray";

    return (
        <Card withBorder shadow="sm" radius="md" p="lg" mt={10} mb={10}>
            {/* Encabezado */}
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <TextSection fw={700} tt="" fz={16} color="dimmed">
                        Te damos la bienvenida
                    </TextSection>

                    {/* Roles como badges */}
                    <Group gap={6}>
                        {roles.length === 0 ? (
                            <Badge
                                variant="light"
                                color="gray"
                                size="md"
                                radius="md"
                                leftSection={<IconShield size={13} />}
                            >
                                USUARIO_GAD
                            </Badge>
                        ) : (
                            roles.map((rol) => (
                                <Tooltip
                                    key={rol}
                                    label={`Rol: ${rol}`}
                                    withArrow
                                >
                                    <Badge
                                        variant="light"
                                        color={ROL_COLOR[rol] ?? "gray"}
                                        size="md"
                                        radius="md"
                                        leftSection={
                                            <IconShieldCheck size={13} />
                                        }
                                    >
                                        {rol}
                                    </Badge>
                                </Tooltip>
                            ))
                        )}
                    </Group>
                </Group>
            </Card.Section>

            {/* Datos del perfil */}
            <Card.Section withBorder inheritPadding py="xs">
                <ProfileForm />
            </Card.Section>

            {/* Permisos — solo si tiene al menos uno */}
            {!isLoading && permissions.length > 0 && (
                <Card.Section inheritPadding pt="xs">
                    <Accordion
                        variant="default"
                        chevronPosition="right"
                        styles={{
                            label: { fontSize: 13, fontWeight: 600 },
                            item: { borderBottom: "none" },
                        }}
                    >
                        <Accordion.Item value="permisos">
                            <Accordion.Control
                                icon={
                                    <ThemeIcon
                                        size={22}
                                        radius="xl"
                                        variant="light"
                                        color={rolColor}
                                    >
                                        <IconKey size={13} />
                                    </ThemeIcon>
                                }
                            >
                                <Text size="sm" c="dimmed" fw={600}>
                                    Permisos asignados ({permissions.length})
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={6}>
                                    {permissions.map((perm) => (
                                        <Group key={perm} gap={8} wrap="nowrap">
                                            <Badge
                                                variant="dot"
                                                color={rolColor}
                                                size="sm"
                                                radius="sm"
                                                style={{
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                {perm}
                                            </Badge>
                                        </Group>
                                    ))}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Card.Section>
            )}
        </Card>
    );
};
