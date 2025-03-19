import { Box, Fieldset, Select, SimpleGrid, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../components";
import { IconSearch } from "@tabler/icons-react";
import classes from '../../../assets/styles/modules/layout/input/LabelsInputs.module.css'

export const FilterDatesPermiso = ({ form, fnAction }) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        fnAction(form.getTransformedValues());
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    Filtrar permisos
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="md"
                >
                    <SimpleGrid cols={{ base: 3, sm: 3, md: 3, lg: 3 }} mt={10}>
                        <DateInput
                            clearable
                            valueFormat="YYYY-MM-DD"
                            label="Desde"
                            placeholder="Seleccione fecha inicio"
                            classNames={classes}
                            {...form.getInputProps("fecha_inicio")}
                        />
                        <DateInput
                            clearable
                            valueFormat="YYYY-MM-DD"
                            label="Hasta"
                            placeholder="Seleccione fecha final"
                            classNames={classes}
                            {...form.getInputProps("fecha_fin")}
                        />
                        <Select
                            required
                            label="Motivo"
                            placeholder="Seleccione un motivo"
                            data={[
                                { label: "PERSONAL", value: "1" },
                                { label: "OFICIAL", value: "3" },
                            ]}
                            nothingFoundMessage="Nada encontrado..."
                            classNames={classes}
                            {...form.getInputProps("motivo_id")}
                        />
                    </SimpleGrid>
                    <BtnSubmit IconSection={IconSearch}>Buscar</BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
