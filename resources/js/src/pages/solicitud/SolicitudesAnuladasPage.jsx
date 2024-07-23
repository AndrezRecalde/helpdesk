import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    FilterFormSearchDates,
    SolicitudesAnuladasTable,
    TitlePage,
} from "../../components";
import { useSoporteStore, useTitlePage } from "../../hooks";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export const SolicitudesAnuladasPage = () => {
    useTitlePage("Helpdesk | Soportes Anulados");
    const {
        isLoading,
        soportes,
        startLoadSoportesAnulados,
        clearSoportes,
        errores,
    } = useSoporteStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
        },
        validate: {
            fecha_inicio: isNotEmpty(
                "Por favor seleccione una fecha de inicio"
            ),
            fecha_fin: isNotEmpty("Por favor seleccione una fecha de fin"),
        },
    });

    const { fecha_inicio, fecha_fin } = form.values;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).toDate();
        const fecha_f = dayjs(fecha_fin).add(1, "days").toDate();
        //console.log(fecha_i, fecha_f);
        startLoadSoportesAnulados(fecha_i, fecha_f);
    };

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Solicitudes Anuladas
            </TitlePage>
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
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
