import { Box, Select, Stack } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { BtnSubmit } from "../../../elements/buttons/BtnServices";
import { usePeriodoStore, useUsersStore } from "../../../../hooks";

export const PeriodoForm = ({ form }) => {
    const { users } = useUsersStore();
    const { startAddPeriodo } = usePeriodoStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startAddPeriodo(form.getTransformedValues());
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <Select
                    searchable
                    clearable
                    withAsterisk
                    label="Usuario"
                    placeholder="Seleccione el usuario"
                    {...form.getInputProps("usuario")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <YearPickerInput
                    label="Año"
                    placeholder="Seleccione el año"
                    type="multiple"
                    {...form.getInputProps("anios")}
                    clearable
                />
                <BtnSubmit>Guardar Periodo</BtnSubmit>
            </Stack>
        </Box>
    );
};
