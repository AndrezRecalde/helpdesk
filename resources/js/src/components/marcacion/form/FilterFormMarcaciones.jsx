import { Box, Fieldset, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { BtnSubmit, TextSection } from "../../../components";

export const FilterFormMarcaciones = ({ form, handleSubmit }) => {
    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={700} fz={16}>
                    Filtrar marcaciones
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Seleccione fecha inicio"
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Seleccione fecha final"
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
