import { Box, FileInput, Stack, TextInput } from "@mantine/core";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import { BtnSubmit } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";

export const InvEquipoDocumentoForm = ({ form }) => {
    const { activateInvEquipo, startGuardarArchivo } = useInvEquipoStore();
    const { modalActionAddDocumento } = useInvUiEquipo();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getValues())
        startGuardarArchivo(activateInvEquipo, form.getValues());
        form.reset();
        modalActionAddDocumento(false);
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
                    label="Nombre documento"
                    placeholder="Digite el nombre del documento"
                    {...form.getInputProps("nombre_documento")}
                />
                <FileInput
                    label="Documento"
                    placeholder="Agregar documento"
                    {...form.getInputProps("documento")}
                />
                <BtnSubmit
                    fontSize={16}
                    IconSection={IconChecks}
                >
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
