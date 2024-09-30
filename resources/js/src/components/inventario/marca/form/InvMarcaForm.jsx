import { useEffect } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvMarcaStore, useInvUiMarca } from "../../../../hooks";
import { IconChecks } from "@tabler/icons-react";

export const InvMarcaForm = ({ form }) => {
    const { startAddInvMarca, activateInvMarca, setActivateInvMarca } =
        useInvMarcaStore();
    const { modalActionMarca } = useInvUiMarca();

    useEffect(() => {
        if (activateInvMarca !== null) {
            form.setValues({
                ...activateInvMarca,
            });
        }
    }, [activateInvMarca]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvMarca(form.getValues());
        if (activateInvMarca !== null) {
            setActivateInvMarca(null);
        }
        form.reset();
        modalActionMarca(false);
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
                    placeholder="Digite el nombre el nombre de la marca"
                    {...form.getInputProps("nombre_marca")}
                />
                <BtnSubmit fontSize={16} IconSection={IconChecks}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
