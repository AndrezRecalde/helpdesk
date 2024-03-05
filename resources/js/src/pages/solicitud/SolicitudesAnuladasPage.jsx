import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import {
    FilterFormSearchSoli,
    SolicitudesAnuladasTable,
    TitlePage,
} from "../../components";
import { useSoporteStore } from "../../hooks";
import Swal from "sweetalert2";

export const SolicitudesAnuladasPage = () => {
    const { soportes, clearSoportes, errores } = useSoporteStore();

    useEffect(() => {
        return () => {
            clearSoportes();
        };
    }, []);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 5500,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Solicitudes Anuladas
            </TitlePage>
            <FilterFormSearchSoli />
            {soportes.length !== 0 ? (
                <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                    <Card.Section>
                        <SolicitudesAnuladasTable />
                    </Card.Section>
                </Card>
            ) : null}
        </Container>
    );
};
