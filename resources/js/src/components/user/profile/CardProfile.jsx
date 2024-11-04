import { Badge, Box, Card, Group, SimpleGrid, Skeleton } from "@mantine/core";
import {
    BtnSubmit,
    MenuSeleccion,
    ProfileForm,
    TextSection,
} from "../../../components";
import { IconDeviceImacUp } from "@tabler/icons-react";
import { useAuthStore, useTecnicoStore } from "../../../hooks";
import { Roles } from "../../../layouts/appshell/navbar/navlinks/navLinks";

export const CardProfile = ({ usuario, handleAction }) => {
    const year = new Date();
    const { isLoading, profile } = useAuthStore();

    const { infoSoportes: totalTecnicossSoportes } = useTecnicoStore();

    const itemsTic = totalTecnicossSoportes?.map((stat, i) => (
        <div key={i}>
            <SimpleGrid cols={{ base: 3, sm: 3, lg: 5 }}>
                <div>
                    <TextSection tt="" ta="center" fz={18} fw={500}>
                        {stat.total_soportes}
                    </TextSection>
                    <TextSection
                        tt=""
                        ta="center"
                        fz={14}
                        fw={500}
                        color="dimmed"
                    >
                        Total Soportes
                    </TextSection>
                </div>
                <div>
                    <TextSection tt="" ta="center" fz={18} fw={500}>
                        {stat.total_asignados}
                    </TextSection>
                    <TextSection
                        tt=""
                        ta="center"
                        fz={14}
                        fw={500}
                        color="dimmed"
                    >
                        Total Asignados
                    </TextSection>
                </div>
                <div>
                    <TextSection tt="" ta="center" fz={18} fw={500}>
                        {stat.total_atendidos}
                    </TextSection>
                    <TextSection
                        tt=""
                        ta="center"
                        fz={14}
                        fw={500}
                        color="dimmed"
                    >
                        Total Atendidos
                    </TextSection>
                </div>
                <div>
                    <TextSection tt="" ta="center" fz={18} fw={500}>
                        {stat.total_finalizados}
                    </TextSection>
                    <TextSection
                        tt=""
                        ta="center"
                        fz={14}
                        fw={500}
                        color="dimmed"
                    >
                        Total Finalizados
                    </TextSection>
                </div>
                <div>
                    <TextSection tt="" ta="center" fz={18} fw={500}>
                        {stat.total_anulados}
                    </TextSection>
                    <TextSection
                        tt=""
                        ta="center"
                        fz={14}
                        fw={500}
                        color="dimmed"
                    >
                        Total Anulados
                    </TextSection>
                </div>
            </SimpleGrid>
        </div>
    ));

    return (
        <Card withBorder shadow="sm" radius="md" p="lg" mt={20} mb={20} sx={{ position: "static", height: "50" }}>
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
                {usuario.role_id === 1 || usuario.role_id === 2 ? (
                    <div>
                        <Group justify="space-between">
                            <TextSection fw={700} tt="" fz={16} color="dimmed">
                                Soportes
                            </TextSection>
                            <TextSection fw={700} tt="" fz={16} color="dimmed">
                                {year.getFullYear()}
                            </TextSection>
                        </Group>
                        <Group mt="md" justify="center" gap={70}>
                            {itemsTic}
                        </Group>
                    </div>
                ) : null}

                {usuario.role === Roles.GERENTE ||
                usuario.role === Roles.TECNICO ? (
                    <Box component="form" onSubmit={handleAction}>
                        <BtnSubmit IconSection={IconDeviceImacUp}>
                            Gestionar soportes
                        </BtnSubmit>
                    </Box>
                ) : (
                    <MenuSeleccion />
                )}
            </Card.Section>
        </Card>
    );
};
