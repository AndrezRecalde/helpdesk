import { useEffect } from "react";
import { Box, Group, NumberInput, Stack, Textarea } from "@mantine/core";
import { AlertSection, BtnSubmit, TextSection } from "../../../../components";
import { usePeriodoStore, useUiPeriodo } from "../../../../hooks";
import { IconInfoCircle } from "@tabler/icons-react";

export const PeriodoEditForm = ({ form }) => {
    const { modalActionEditPeriodo } = useUiPeriodo();
    const { activatePeriodo, startUpdatePeriodo } = usePeriodoStore();

    useEffect(() => {
        if (activatePeriodo !== null) {
            form.setValues({
                id: activatePeriodo.id || null,
                dias_tomados: activatePeriodo.dias_tomados || 0,
                observacion: activatePeriodo.observacion || "",
            });
            return;
        }
    }, [activatePeriodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdatePeriodo(form.getTransformedValues());
        //console.log(form.getTransformedValues());
        form.reset();
        modalActionEditPeriodo(false);
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
                <AlertSection
                    variant="light"
                    color="blue"
                    icon={IconInfoCircle}
                    title="Info"
                >
                    <strong>Importante:</strong> Revisar la disponibilidad de
                    los días en el período que se va a modificar.
                </AlertSection>
                <NumberInput
                    required
                    label="Dias Tomados"
                    placeholder="Ingrese los dias tomados en el periodo"
                    allowNegative={false}
                    {...form.getInputProps("dias_tomados")}
                />
                <Textarea
                    resize="vertical"
                    label="Observación"
                    placeholder="Ingrese alguna observación acerca de este periodo"
                    {...form.getInputProps("observacion")}
                />
                <BtnSubmit>Editar Periodo</BtnSubmit>
            </Stack>
        </Box>
    );
};
