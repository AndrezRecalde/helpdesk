import { useEffect } from "react";
import { Box, Grid, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BtnSubmit, FormRichText } from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useActividadStore, useUiActividad } from "../../hooks";
import { IconDatabase } from "@tabler/icons-react";
import dayjs from "dayjs";

export const ActividadForm = ({ fecha_inicio, fecha_fin }) => {
    const { activateActividad, startAddActividad } = useActividadStore();
    const { modalActionActividad } = useUiActividad();

    const form = useForm({
        initialValues: {
            actividad: "",
            fecha_actividad: new Date(),
        },

        validate: {
            actividad: isNotEmpty("Por favor ingresa la actividad"),
            fecha_actividad: isNotEmpty(
                "Por favor ingresa la fecha de la actividad"
            ),
        },
    });

    useEffect(() => {
        if (activateActividad !== null) {
            const dt = new Date(activateActividad.fecha_actividad);
            form.setValues({
                ...activateActividad,
                fecha_actividad: dt,
            });
            return;
        }
    }, [activateActividad]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddActividad(form.values, fecha_inicio, fecha_fin);
        //console.log(form.values)
        modalActionActividad(0);
        form.reset();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <DateInput
                        withAsterisk
                        maxDate={dayjs(new Date()).add(1, "month").toDate()}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha de la actividad"
                        placeholder="Registra la fecha"
                        {...form.getInputProps("fecha_actividad")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    {/* <Textarea
                        label="Actividad"
                        withAsterisk
                        description="Registra la actividad"
                        autosize
                        minRows={6}
                        maxRows={8}
                        {...form.getInputProps("actividad")}
                    /> */}
                    <FormRichText form={form} />
                </Grid.Col>
            </Grid>
            <BtnSubmit radius="md" IconSection={IconDatabase}>
                Registrar actividad
            </BtnSubmit>
        </Box>
    );
};
