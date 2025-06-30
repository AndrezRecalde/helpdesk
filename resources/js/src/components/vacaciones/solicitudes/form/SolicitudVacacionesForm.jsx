import { Box, Group, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    BtnSubmit,
    FechasVacacionesField,
    JefesVacacionesField,
    MotivosVacacionesField,
} from "../../..";
import { useVacacionesStore } from "../../../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const SolicitudVacacionesForm = () => {
    const { startSolicitarVacaciones } = useVacacionesStore();
    const form = useForm({
        initialValues: {
            cdgo_usrio: null,
            fecha_solicitud: new Date(),
            fecha_inicio: new Date(),
            fecha_fin: null,
            fecha_retorno: null,
            dias_solicitados: 0,
            motivo_id: "2",
            direccion_id: null,
            tiene_jefe: false,
            tiene_director: false,
            jefe_id: null,
            director_id: null,
        },

        validate: {
            cdgo_usrio: isNotEmpty(
                "Por favor seleccione el usuario solicitante"
            ),
            fecha_inicio: isNotEmpty("Por favor seleccione la fecha inicio"),
            fecha_fin: isNotEmpty("Por favor seleccione la fecha final"),
            fecha_retorno: isNotEmpty(
                "Por favor seleccione la fecha de retorno"
            ),
            motivo_id: (value) =>
                value.length > 0 ? null : "Seleccione al menos un motivo",
        },
        transformValues: (values) => ({
            ...values,
            fecha_solicitud: dayjs(values.fecha_solicitud).isValid()
                ? dayjs(values.fecha_solicitud).format("YYYY-MM-DD")
                : null,
            cdgo_usrio: Number(values.cdgo_usrio) || null,
            fecha_inicio: dayjs(values.fecha_inicio).isValid()
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: dayjs(values.fecha_fin).isValid()
                ? dayjs(values.fecha_fin).format("YYYY-MM-DD")
                : null,
            fecha_retorno: dayjs(values.fecha_retorno).isValid()
                ? dayjs(values.fecha_retorno).format("YYYY-MM-DD")
                : null,
            motivo_id: Number(values.motivo_id) || null, // Convertir a número
            direccion_id: Number(values.direccion_id) || null,
            jefe_id: Number(values.jefe_id) || null,
            director_id: Number(values.director_id) || null,
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        Swal.fire({
            text: "¿Estas seguro de crear la ficha de vacaciones?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#04dbad",
            cancelButtonColor: "#F8285A",
            confirmButtonText: "Si, Confirmar",
            cancelButtonText: "No, cancelarlo",
        }).then((result) => {
            if (result.isConfirmed) {
                startSolicitarVacaciones(form.getTransformedValues());
                form.reset();
                //console.log(message.idper_permisos)
            }
        });
    };
    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack align="stretch" justify="center" gap="md">
                <FechasVacacionesField form={form} classes={classes} />
                <MotivosVacacionesField form={form} />
                <JefesVacacionesField form={form} classes={classes} />
                <Group justify="flex-end">
                    <BtnSubmit fullwidth={false}>Solicitar</BtnSubmit>
                </Group>
            </Stack>
        </Box>
    );
};
