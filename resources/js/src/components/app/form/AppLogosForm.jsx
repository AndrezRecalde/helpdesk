import { Box, Fieldset, Stack, TextInput } from "@mantine/core";
import { useAppStore, useUiApp } from "../../../hooks";
import { AlertSection, BtnSubmit } from "../../../components";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect } from "react";

export const AppLogosForm = ({ form }) => {
    const { activateImagenes, startUpdateImagenes } = useAppStore();
    const { modalActionApplication } = useUiApp();

    useEffect(() => {
        if (activateImagenes !== null) {
            form.setValues({
                id: activateImagenes.id || null,
                imagen_login: activateImagenes.imagen_login || "",
                imagen_fondo: activateImagenes.imagen_fondo || "",
                imagen_logo: activateImagenes.imagen_logo || "",
            });
            return;
        }
    }, [activateImagenes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.values);
        startUpdateImagenes(form.values);
        form.reset();
        modalActionApplication(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <AlertSection
                    variant="light"
                    color="blue"
                    icon={IconInfoCircle}
                    title="Nota"
                >
                    <strong>Importante:</strong> Las imágenes deben estar en
                    formato URL, link que puedes obtener en el central de medios
                    del <strong>Administrador de Wordpress</strong> de la pagina
                    principal de la institución.
                </AlertSection>
                <Fieldset legend="Imagen de Login">
                    <TextInput
                        label="Imagen Login"
                        placeholder="Ingrese la URL de la imagen"
                        {...form.getInputProps("imagen_login")}
                    />
                </Fieldset>
                <Fieldset legend="Imagen de Fondo">
                    <TextInput
                        label="Imagen Fondo"
                        placeholder="Ingrese la URL de la imagen"
                        {...form.getInputProps("imagen_fondo")}
                    />
                </Fieldset>
                <Fieldset legend="Logo de la Aplicación">
                    <TextInput
                        label="Imagen Logo"
                        placeholder="Ingrese la URL de la imagen"
                        {...form.getInputProps("imagen_logo")}
                    />
                </Fieldset>
                <BtnSubmit>Realizar Cambio</BtnSubmit>
            </Stack>
        </Box>
    );
};
