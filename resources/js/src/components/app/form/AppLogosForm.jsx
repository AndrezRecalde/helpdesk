import { Box, Stack, TextInput } from "@mantine/core";
import { useAppStore, useUiApp } from "../../../hooks";
import { AlertSection, BtnSubmit } from "../../../components";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect } from "react";

export const AppLogosForm = ({ form }) => {
    const { activateImagenes } = useAppStore();
    const { modalActionApplication } = useUiApp();

    useEffect(() => {
        if (activateImagenes !== null) {
            form.setValues({
                imagen_login: activateImagenes.imagen_login || "",
                imagen_fondo: activateImagenes.imagen_fondo || "",
                imagen_logo: activateImagenes.imagen_logo || "",
            });
            return;
        }
    }, [activateImagenes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.values);
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
                <TextInput
                    label="Imagen Login"
                    placeholder="Ingrese la URL de la imagen"
                />
                <TextInput
                    label="Imagen Fondo"
                    placeholder="Ingrese la URL de la imagen"
                />
                <TextInput
                    label="Imagen Logo"
                    placeholder="Ingrese la URL de la imagen"
                />
                <BtnSubmit>Realizar Cambio</BtnSubmit>
            </Stack>
        </Box>
    );
};
