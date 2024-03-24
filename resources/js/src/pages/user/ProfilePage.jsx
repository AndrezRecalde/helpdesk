import { useEffect } from "react";
import { Badge, Card, Container, Group, Skeleton, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {
    TextSection,
    TitlePage,
    ProfileForm,
    BtnSubmit,
} from "../../components";
import { IconSend } from "@tabler/icons-react";
import { useAuthStore, useTecnicoStore, useUsersStore } from "../../hooks";

const stats = [
    { value: "34K", label: "Total Soportes" },
    { value: "187", label: "En Ejecución" },
    { value: "1.6K", label: "Cerrados" },
];

export const ProfilePage = () => {
    useDocumentTitle("Profile");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, startProfile, profile, clearProfile } = useAuthStore();
    const {
        startLoadInfoUsersSoporte,
        infoSoportes: totalUsersSoportes,
        clearUsers,
    } = useUsersStore();
    const {
        startLoadInfoTecnicosSoporte,
        infoSoportes: totalTecnicossSoportes,
        clearTecnicos,
    } = useTecnicoStore();

    const year = new Date();

    useEffect(() => {
        startProfile();

        return () => {
            clearProfile();
        };
    }, []);

    useEffect(() => {
        if (usuario?.role === "TECNICO") {
            startLoadInfoTecnicosSoporte();
            return;
        }
        startLoadInfoUsersSoporte();

        return () => {
            clearUsers();
            clearTecnicos();
        };
    }, []);

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
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
                        {items}
                    </Group>

                    {usuario.role === "GERENTE" ||
                    usuario.role === "TECNICO" ? (
                        <BtnSubmit fontSize={16} IconSection={IconSend}>
                            Agregar soporte
                        </BtnSubmit>
                    ) : (
                        <BtnSubmit fontSize={16} IconSection={IconSend}>
                            Solicitar soporte
                        </BtnSubmit>
                    )}
                </Card.Section>
            </Card>
        </Container>
    );
};
