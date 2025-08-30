import { Drawer } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useAppStore, useUiApp } from "../../../hooks";
import { AppLogosForm, TextSection } from "../../../components";

export const AppLogosModal = () => {
    const { isOpenModalImagenes, modalActionApplication } = useUiApp();
    const { setActivateImagenes } = useAppStore();

    const form = useForm({
        initialValues: {
            id: null,
            imagen_login: "",
            imagen_fondo: "",
            imagen_logo: "",
        },
        validate: {
            imagen_login: isNotEmpty("Por favor seleccione un usuario"),
            imagen_fondo: isNotEmpty("Por favor seleccione un usuario"),
            imagen_logo: isNotEmpty("Por favor seleccione un usuario"),
        },
    });

    const handleCloseModal = () => {
        form.reset();
        setActivateImagenes(null);
        modalActionApplication(false);
    };

    return (
        <Drawer
            offset={8}
            radius="md"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            transitionProps={{
                transition: "slide-right",
                duration: 150,
                timingFunction: "linear",
            }}
            opened={isOpenModalImagenes}
            onClose={handleCloseModal}
            closeOnClickOutside={false}
            closeOnEscape={false}
            position="right"
            size="lg"
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Cambio de Imagenes del Aplicativo
                </TextSection>
            }
        >
            <AppLogosForm form={form} />
        </Drawer>
    );
};
