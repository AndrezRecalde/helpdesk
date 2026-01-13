import { useEffect } from "react";
import { Box, ColorInput, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvEstadoStore, useInvUiEstado } from "../../../../hooks";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const InvEstadoForm = ({ form }) => {
    const { startAddInvEstado, activateInvEstado, setActivateInvEstado } =
        useInvEstadoStore();
    const { modalActionEstado } = useInvUiEstado();

    useEffect(() => {
        if (activateInvEstado !== null) {
            form.setValues({
                ...activateInvEstado,
            });
        }
    }, [activateInvEstado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvEstado(form.getValues());
        if (activateInvEstado !== null) {
            setActivateInvEstado(null);
        }
        form.reset();
        modalActionEstado(false);
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
                <TextInput
                    label="Estado"
                    placeholder="Digite el nombre del estado"
                    {...form.getInputProps("nombre_estado")}
                    classNames={classes}
                />
                <ColorInput
                    label="Color del estado"
                    placeholder="Seleccione un color para el estado"
                    {...form.getInputProps("color")}
                    classNames={classes}
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
