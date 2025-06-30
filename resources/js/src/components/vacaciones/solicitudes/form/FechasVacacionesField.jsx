import { useEffect } from "react";
import { Fieldset, NumberInput, SimpleGrid, Stack } from "@mantine/core";
import { TextSection } from "../../../../components";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";

export const FechasVacacionesField = ({ form, classes }) => {
    const { fecha_inicio, fecha_fin, dias_solicitados } = form.values;

    useEffect(() => {
        if (fecha_inicio && fecha_fin) {
            const date_inicio = dayjs(fecha_inicio).startOf("day");
            const date_fin = dayjs(fecha_fin).startOf("day");

            if (date_inicio.isAfter(date_fin)) {
                form.setFieldValue("fecha_fin", null);
                form.setFieldValue("dias_solicitados", 0);
            } else {
                const dias_diff = date_fin.diff(date_inicio, "days");
                form.setFieldValue("dias_solicitados", dias_diff + 1); // incluye ambos días
            }
        } else {
            form.setFieldValue("dias_solicitados", 0);
        }
    }, [fecha_inicio, fecha_fin]);

    return (
        <Fieldset
            legend={
                <TextSection tt="" fz={18} fw={500}>
                    Seleccione las fechas*
                </TextSection>
            }
            p={20}
        >
            <Stack>
                <DateInput
                    withAsterisk
                    minDate={dayjs(new Date()).add(-12, "day").toDate()}
                    maxDate={dayjs(new Date()).add(1, "month").toDate()}
                    valueFormat="YYYY-MM-DD"
                    label="Fecha de Solicitud"
                    placeholder="Registra la fecha"
                    classNames={classes}
                    {...form.getInputProps("fecha_solicitud")}
                />
                <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }}>
                    <DateInput
                        withAsterisk
                        minDate={dayjs().subtract(1, "month").toDate()}
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Registra la fecha"
                        classNames={classes}
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        withAsterisk
                        minDate={
                            fecha_inicio
                                ? dayjs(fecha_inicio).startOf("day").toDate()
                                : undefined
                        }
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Registra la fecha"
                        classNames={classes}
                        {...form.getInputProps("fecha_fin")}
                    />
                    <DateInput
                        withAsterisk
                        minDate={
                            fecha_fin
                                ? dayjs(fecha_fin).add(1, "days").toDate()
                                : new Date()
                        }
                        valueFormat="YYYY-MM-DD"
                        label="Fecha Retorno a la Institución"
                        placeholder="Registra la fecha"
                        classNames={classes}
                        {...form.getInputProps("fecha_retorno")}
                    />
                    <NumberInput
                        withAsterisk
                        label="No. de Días que solicita"
                        defaultValue={5}
                        disabled
                        classNames={classes}
                        {...form.getInputProps("dias_solicitados")}
                    />
                </SimpleGrid>
            </Stack>
        </Fieldset>
    );
};
