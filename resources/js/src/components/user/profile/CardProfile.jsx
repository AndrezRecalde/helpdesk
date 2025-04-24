import { Badge, Box, Card, Group, SimpleGrid, Skeleton } from "@mantine/core";
import {
    AlertSection,
    BtnSection,
    BtnSubmit,
    MenuSeleccion,
    ProfileForm,
    TextSection,
} from "../../../components";
import {
    IconDeviceImacUp,
    IconFingerprint,
    IconInfoCircle,
} from "@tabler/icons-react";
import { useAuthStore, useTecnicoStore } from "../../../hooks";
import { Roles } from "../../../helpers/dictionary";
import { useNavigate } from "react-router-dom";

export const CardProfile = ({ usuario, handleAction, handleMarcacion }) => {
    const year = new Date();
    const { isLoading, profile } = useAuthStore();
    const navigate = useNavigate();

    const { infoSoportes: totalTecnicossSoportes } = useTecnicoStore();

    const itemsTic = totalTecnicossSoportes?.map((stat, i) => (
        <div key={i}>
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }}>
                <AlertSection
                    variant="light"
                    color="orange.5"
                    title="Soportes Asignados"
                    icon={IconInfoCircle}
                >
                    <TextSection fw={700} fz={18} color="orange.7">
                        {stat.total_asignados}
                    </TextSection>
                </AlertSection>
                <AlertSection
                    variant="light"
                    color="green.5"
                    title="Soportes Atendidos"
                    icon={IconInfoCircle}
                >
                    <TextSection fw={700} fz={18} color="green.7">
                        {stat.total_atendidos}
                    </TextSection>
                </AlertSection>
            </SimpleGrid>
        </div>
    ));

    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            mt={20}
            mb={20}
            sx={{ position: "static", height: "50" }}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <TextSection fw={700} tt="" fz={16} color="dimmed">
                        Te damos la bienvenida
                    </TextSection>
                    {isLoading ? (
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    ) : (
                        <Badge
                            variant="light"
                            color="orange.7"
                            size="lg"
                            radius="md"
                        >
                            {profile?.role}
                        </Badge>
                    )}
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <ProfileForm />
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {usuario.role === Roles.TIC_GERENTE ||
                usuario.role === Roles.TIC_TECNICO ? (
                    <div>
                        <Group justify="space-between">
                            <TextSection fw={700} tt="" fz={16} color="dimmed">
                                Soportes
                            </TextSection>
                            <TextSection fw={700} tt="" fz={16} color="dimmed">
                                {year.getFullYear()}
                            </TextSection>
                        </Group>
                        <Group mt="md" justify="center">
                            {itemsTic}
                        </Group>
                    </div>
                ) : null}

                {usuario.role === Roles.TIC_GERENTE ||
                usuario.role === Roles.TIC_TECNICO ? (
                    <Box component="form" onSubmit={handleAction}>
                        <BtnSubmit IconSection={IconDeviceImacUp}>
                            Gestionar soportes
                        </BtnSubmit>
                    </Box>
                ) : (
                    <MenuSeleccion />
                )}
                <Group justify="center">
                    <BtnSection
                        fontSize={16}
                        heigh={50}
                        IconSection={IconFingerprint}
                        handleAction={handleMarcacion}
                    >
                        Ver Marcaciones Biometricos
                    </BtnSection>
                </Group>
            </Card.Section>
        </Card>
    );
};
