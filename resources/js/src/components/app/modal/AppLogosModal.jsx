import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useAppStore, useUiApp } from "../../../hooks";
import { AppLogosForm } from "../../../components";

export const AppLogosModal = () => {
    const { isOpenModalImagenes, modalActionApplication } = useUiApp();
    const { setActivateImagenes } = useAppStore();

    const form = useForm({
        initialValues: {
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
        <Modal
            opened={isOpenModalImagenes}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Cambio de Imagenes del Aplicativo
                </TextSection>
            }
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <AppLogosForm form={form} />
        </Modal>
    );
};
