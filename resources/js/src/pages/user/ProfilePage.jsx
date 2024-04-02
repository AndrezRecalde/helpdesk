import { useEffect } from "react";
import { Badge, Card, Container, Group, SimpleGrid, Skeleton, Text } from "@mantine/core";
import {
    TextSection,
    TitlePage,
    ProfileForm,
    MenuSeleccion,
    BtnSection,
} from "../../components";
import { IconSend } from "@tabler/icons-react";
import { useAuthStore, useTecnicoStore, useTitlePage, useUsersStore } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    useTitlePage("Helpdesk | Perfil");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const navigate = useNavigate();
    const { isLoading, startProfile, profile, clearProfile } = useAuthStore();
    const {
        startLoadInfoUsersSoporte,
        infoSoportes: totalUsersSoportes,
        clearInfoSoportes,
    } = useUsersStore();
    const {
        startLoadInfoTecnicosSoporte,
        infoSoportes: totalTecnicossSoportes,
        clearInfoSoportesTecnico,
    } = useTecnicoStore();

    const year = new Date();

    useEffect(() => {
        startProfile();

        return () => {
            clearProfile();
        };
    }, []);

    useEffect(() => {
        if (usuario?.role === "TECNICO" || usuario?.role === "GERENTE") {
            startLoadInfoTecnicosSoporte(usuario.cdgo_usrio);
            return;
        }
        startLoadInfoUsersSoporte(usuario.cdgo_usrio);

        return () => {
            clearInfoSoportes();
            clearInfoSoportesTecnico();
        };
    }, []);

    const handleAction = () => {
        navigate("/tecnico/soportes");
    }

    const itemsTic = totalTecnicossSoportes?.map((stat, i) => (
        <div key={i}>
            <SimpleGrid cols={{ base: 3, sm: 3, lg: 5 }}>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_soportes}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Soportes
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_asignados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Asignados
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_atendidos}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Atendidos
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_finalizados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Finalizados
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_anulados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Anulados
                    </Text>
                </div>
            </SimpleGrid>
        </div>
    ));

    const itemsUser = totalUsersSoportes?.map((stat, i) => (
        <div key={i}>
            <SimpleGrid cols={3}>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_soportes}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Soportes
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_pendientes}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Pendientes
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_asignados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Asignados
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_atendidos}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Atendidos
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_finalizados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Finalizados
                    </Text>
                </div>
                <div>
                    <Text ta="center" fz="lg" fw={500}>
                        {stat.total_anulados}
                    </Text>
                    <Text ta="center" fz="sm" c="dimmed" lh={1}>
                        Total Anulados
                    </Text>
                </div>
            </SimpleGrid>
        </div>
    ));

    return (
        <Container size="sm">
            <TitlePage order={2} size="h2">
                Perfil
            </TitlePage>
            <Card withBorder shadow="sm" radius="md" p="lg" mt={20} mb={20}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <TextSection fw={700} tt="" fz={16}>
                            Bienvenido al Helpdesk
                        </TextSection>
                        {isLoading ? (
                            <Skeleton
                                height={8}
                                mt={6}
                                width="70%"
                                radius="xl"
                            />
                        ) : (
                            <Badge
                                variant="light"
                                color="orange.7"
                                size="lg"
                                radius="sm"
                            >
                                {profile.role}
                            </Badge>
                        )}
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <ProfileForm />
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <TextSection fw={700} tt="" fz={16}>
                            Soportes
                        </TextSection>
                        <TextSection fw={700} tt="" fz={16}>
                            {year.getFullYear()}
                        </TextSection>
                    </Group>
                    <Group mt="md" justify="center" gap={70}>
                        {usuario?.role_id === 1 || usuario?.role_id === 2 ? itemsTic : itemsUser}
                    </Group>

                    { usuario.role === "GERENTE" ||
                      usuario.role === "TECNICO" ? (
                        <BtnSection fontSize={16} IconSection={IconSend} handleAction={handleAction}>
                            Gestionar soportes
                        </BtnSection>
                    ) : (
                        <MenuSeleccion />
                    )}
                </Card.Section>
            </Card>
        </Container>
    );
};
