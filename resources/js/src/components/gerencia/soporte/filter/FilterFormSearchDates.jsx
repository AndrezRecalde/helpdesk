import { Box, Fieldset, SimpleGrid } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../..";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterFormSearchDates = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
    const { fecha_inicio } = form.values;
    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    {title}
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        //dateParser={dateParser}
                        withAsterisk
                        valueFormat="YYYY-MM-DD"
                        label="Fecha inicio"
                        placeholder="Seleccione fecha de inicio"
                        classNames={classes}
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        //dateParser={dateParser}
                        minDate={new Date(fecha_inicio)}
                        withAsterisk
                        valueFormat="YYYY-MM-DD"
                        label="Fecha final"
                        placeholder="Seleccione fecha de fin"
                        classNames={classes}
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
