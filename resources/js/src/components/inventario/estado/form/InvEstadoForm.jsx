import { useEffect } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";
import { useInvEstadoStore, useInvUiEstado } from "../../../../hooks";


export const InvEstadoForm = ({ form }) => {

   const { startAddInvEstado, activateInvEstado, setActivateInvEstado } = useInvEstadoStore();
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
                    label="Marca"
                    placeholder="Digite el nombre del estado"
                    {...form.getInputProps("nombre_estado")}
                />
                <BtnSubmit fontSize={16} IconSection={IconChecks}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
