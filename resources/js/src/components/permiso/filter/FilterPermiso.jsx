import { Box, Fieldset, Group, Stack, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../components";
import { IconSearch } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import classes from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterPermiso = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
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
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="md"
                >
                    <Group justify="end">
                        <YearPickerInput
                            required
                            placeholder="Seleccione el año"
                            {...form.getInputProps("anio")}
                            maxDate={new Date()}
                        />
                    </Group>
                    <TextInput
                        label="Número de permiso"
                        placeholder="Digita el número de soporte"
                        {...form.getInputProps("idper_permisos")}
                        classNames={classes}
                    />
                    <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                        Buscar
                    </BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
