import { useEffect } from "react";
import { Container, Divider } from "@mantine/core";
import {
    FilterFormSearchDates,
    TableMarcacionRelojOnline,
    TitlePage,
} from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMarcacionStore, useTitlePage } from "../../hooks";
import dayjs from "dayjs";

const MarcacionesBiometricos = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadMarcacionesBiometricos, clearMarcaciones } =
        useMarcacionStore();
    useTitlePage("Intranet | Marcaciones");

    const form = useForm({
        initialValues: {
            fecha_inicio: null,
            fecha_fin: null,
            asi_id_reloj: usuario.asi_id_reloj,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
        transformValues: (values) => ({
            asi_id_reloj: String(values.asi_id_reloj),
            fecha_inicio: values.fecha_inicio
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: values.fecha_fin
                ? dayjs(values.fecha_fin).format("YYYY-MM-DD")
                : null,
        }),
    });

    useEffect(() => {
        //console.log(form.getTransformedValues());
        startLoadMarcacionesBiometricos(form.getTransformedValues());
        return () => {
            clearMarcaciones();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        startLoadMarcacionesBiometricos(form.getTransformedValues());
    };

    return (
        <Container size="xl">
            <TitlePage order={1}>Marcaciones Biometricos</TitlePage>
            <Divider my="md" />
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar marcaciones"
            />

            <TableMarcacionRelojOnline usuario={usuario} />
        </Container>
    );
};

export default MarcacionesBiometricos;
