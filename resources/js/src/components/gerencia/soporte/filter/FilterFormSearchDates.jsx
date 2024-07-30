import { Box, Fieldset, SimpleGrid, Text } from "@mantine/core";
import { BtnSubmit } from "../../..";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";

export const FilterFormSearchDates = ({
    title= "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
    return (
        <Fieldset mt={20} mb={10} legend={<Text>{title}</Text>}>
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
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        //dateParser={dateParser}
                        withAsterisk
                        valueFormat="YYYY-MM-DD"
                        label="Fecha final"
                        placeholder="Seleccione fecha de fin"
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} fontSize={18} loading={isLoading}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
