import { useEffect } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvConceptoStore, useInvUiConcepto } from "../../../../hooks";

export const InvConceptoForm = ({ form }) => {
    const { startAddInvConcepto, activateConcepto, setActivateInvConcepto } =
        useInvConceptoStore();

    const { modalActionConcepto } = useInvUiConcepto();

    useEffect(() => {
        if (activateConcepto !== null) {
            form.setValues({
                ...activateConcepto,
            });
        }
    }, [activateConcepto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvConcepto(form.getValues());
        if (activateConcepto !== null) {
            setActivateInvConcepto(null);
        }
        form.reset();
        modalActionConcepto(false);
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
                    label="Concepto de estado"
                    placeholder="Digite el nombre el nombre del estado"
                    {...form.getInputProps("nombre_concepto")}
                />
                <BtnSubmit>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
