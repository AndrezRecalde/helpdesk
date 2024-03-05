import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormSoportes,
    TextSection,
    TitlePage,
    SoportesTable,
    BtnAddActions,
} from "../../components";
import { useSoporteStore } from "../../hooks";
import Swal from "sweetalert2";

export const SoportesPage = () => {
    const { errores } = useSoporteStore();

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Gestión De Soportes
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes 20 soportes
                </TextSection>
                {/* <BtnSection>Agregar soporte</BtnSection> */}
                <BtnAddActions>Crear nueva</BtnAddActions>
            </Group>
            <FilterFormSoportes role={true} />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SoportesTable menu={1} />
                </Card.Section>
            </Card>
        </Container>
    );
};
