import { Box, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";
import { useEffect } from "react";
import { useInvUbicacionStore, useInvUiUbicacion } from "../../../../hooks";

export const InvUbicacionForm = ({ form }) => {

    const { startAddInvUbicacion, activateUbicacion, setActivateInvUbicacion } = useInvUbicacionStore();
    const { modalActionUbicacion } = useInvUiUbicacion();

    useEffect(() => {
        if (activateUbicacion !== null) {
            form.setValues({
                ...activateUbicacion,
            });
        }
    }, [activateUbicacion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvUbicacion(form.getValues());
        if (activateUbicacion !== null) {
            setActivateInvUbicacion(null);
        }
        form.reset();
        modalActionUbicacion(false);
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
                    label="Nombre edificio"
                    placeholder="Digite el nombre del edificio o entidad"
                    {...form.getInputProps("nombre_edificio")}
                />
                 <TextInput
                    label="Ubicación física"
                    placeholder="Digite la ubicación física"
                    {...form.getInputProps("nombre_ubicacion")}
                />
                <BtnSubmit fontSize={16} IconSection={IconChecks}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
