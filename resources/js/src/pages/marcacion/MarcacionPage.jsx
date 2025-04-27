import { Container, Divider } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    FilterFormSearchDates,
    TableMarcacion,
    TitlePage,
} from "../../components";
import { useMarcacionStore, useTitlePage } from "../../hooks";
import dayjs from "dayjs";

const MarcacionPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadMarcaciones } = useMarcacionStore();
    useTitlePage("Intranet | Marcacion");

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            asi_id_reloj: usuario.asi_id_reloj,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
        transformValues: (values) => ({
            asi_id_reloj: String(values.asi_id_reloj),
            fecha_inicio: dayjs(values.fecha_inicio).format("YYYY-MM-DD"),
            fecha_fin: dayjs(values.fecha_fin).format("YYYY-MM-DD"),
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcaciones(form.getTransformedValues());
        //console.log(form.getTransformedValues());
    };

    return (
        <Container size="xl">
            <TitlePage order={1}>Mis marcaciones</TitlePage>
            <Divider my="md" />
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar marcaciones"
            />

            <TableMarcacion />
        </Container>
    );
};

export default MarcacionPage;
