import { Modal } from "@mantine/core";
import { InvUbicacionForm, TextSection } from "../../../../components";
import { useInvUbicacionStore, useInvUiUbicacion } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvUbicacionModal = () => {

    const { activateUbicacion, setActivateInvUbicacion } = useInvUbicacionStore();
    const { isOpenModalInvUbicacion, modalActionUbicacion } = useInvUiUbicacion();

    const form = useForm({
        initialValues: {
            nombre_edificio: "",
            nombre_ubicacion: "",
        },
        validate: {
            nombre_edificio: isNotEmpty("Por favor ingrese el nombre del edificio"),
            nombre_ubicacion: isNotEmpty("Por favor ingrese la ubicación física"),

        },
    });

    const handleCloseModal = () => {
        if (activateUbicacion !== null) {
            setActivateInvUbicacion(null);
        }
        modalActionUbicacion(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvUbicacion}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Marca
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvUbicacionForm form={form} />
        </Modal>
    );
};
