import { useEffect } from "react";
import { Container, Divider } from "@mantine/core";
import {
    AlertSection,
    FilterFormSearchDates,
    TableMarcacionRelojOnline,
    TitlePage,
} from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMarcacionStore, useTitlePage } from "../../hooks";
import dayjs from "dayjs";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

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
            <AlertSection
                mt={20}
                mb={0}
                variant="light"
                color="red.7"
                title="¿No puedes visualizar tus marcaciones?"
                icon={IconAlertCircle}
            >
                Si no puedes visualizar tus marcaciones puedes reportar a la{" "}
                <Link to="/intranet/solicitud-soporte">administración</Link>
            </AlertSection>
        </Container>
    );
};

export default MarcacionesBiometricos;
