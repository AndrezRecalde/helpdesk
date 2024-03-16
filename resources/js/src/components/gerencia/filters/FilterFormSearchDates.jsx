import { Box, Fieldset, SimpleGrid, Text } from "@mantine/core";
import { BtnSubmit } from "../..";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore } from "../../../hooks";
import dayjs from "dayjs";

export const FilterFormSearchDates = () => {
    const { startLoadSoportesAnulados } = useSoporteStore();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).toDate();
        const fecha_f = dayjs(fecha_fin).add(1, "days").toDate();
        console.log(fecha_i, fecha_f);
        startLoadSoportesAnulados(fecha_i, fecha_f);
    };

    return (
        <Fieldset mt={20} legend={<Text>Filtrar Soportes Anulados</Text>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        //dateParser={dateParser}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha inicio"
                        placeholder="Seleccione fecha de inicio"
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        //dateParser={dateParser}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha final"
                        placeholder="Seleccione fecha de fin"
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
