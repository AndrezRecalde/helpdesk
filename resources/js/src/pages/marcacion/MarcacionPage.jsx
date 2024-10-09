import { Container } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    FilterFormMarcaciones,
    TableMarcacion,
    TitlePage,
} from "../../components";
import dayjs from "dayjs";
import { useMarcacionStore } from "../../hooks";

export const MarcacionPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadMarcaciones } = useMarcacionStore();

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
        <Container size="xxl">
            <TitlePage order={1}>
                Mis marcaciones
            </TitlePage>
            <FilterFormMarcaciones form={form} handleSubmit={handleSubmit} />

            <TableMarcacion />
        </Container>
    );
};
