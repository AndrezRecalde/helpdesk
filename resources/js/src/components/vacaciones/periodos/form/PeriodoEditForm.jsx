import { useEffect } from "react";
import { Box, Group, NumberInput, Select, Stack } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { usePeriodoStore, useUsersStore } from "../../../../hooks";

export const PeriodoEditForm = ({ form }) => {
    const { users } = useUsersStore();
    const { activatePeriodo, startUpdatePeriodo } = usePeriodoStore();

    useEffect(() => {
        if (activatePeriodo !== null) {
            form.setValues({
                id: activatePeriodo.id || null,
                dias_tomados: activatePeriodo.dias_tomados || 0,
                observacion: activatePeriodo.observacion || ""
            });
            return;
        }
    }, [activatePeriodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdatePeriodo(form.getTransformedValues())
        //console.log(form.getTransformedValues());
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
                <Group>
                    El periodo a modificar es:
                    <TextSection fw={700}>{activatePeriodo?.anio}</TextSection>
                </Group>
                <NumberInput
                    required
                    label="Dias Tomados"
                    placeholder="Ingrese los dias tomados en el periodo"
                    allowNegative={false}
                    {...form.getInputProps("dias_tomados")}
                />
                <BtnSubmit>Editar Periodo</BtnSubmit>
            </Stack>
        </Box>
    );
};
