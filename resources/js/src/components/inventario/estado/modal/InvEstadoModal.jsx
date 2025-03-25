import { Modal } from "@mantine/core";
import { InvEstadoForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useInvEstadoStore, useInvUiEstado } from "../../../../hooks";

export const InvEstadoModal = () => {

    const { activateInvEstado, setActivateInvEstado } = useInvEstadoStore();
    const { isOpenModalInvEstado, modalActionEstado } = useInvUiEstado();

    const form = useForm({
        initialValues: {
            nombre_estado: "",
            color: ""
        },
        validate: {
            nombre_estado: isNotEmpty("Por favor ingrese la marca"),
            color: isNotEmpty("Por favor ingrese el color")
        },
    });

    const handleCloseModal = () => {
        if (activateInvEstado !== null) {
            setActivateInvEstado(null);
        }
        form.reset();
        modalActionEstado(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvEstado}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Estado del Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEstadoForm form={form} />
        </Modal>
    );
};
