import { Modal } from "@mantine/core";
import { InvBajaEquipoForm, TextSection } from "../../../../components";
import { useInvUiEquipo, useSoporteStore } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvBajaEquipoModal = () => {
    //const { setActivateInvEquipo } = useInvEquipoStore();
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalBajaEquipo, modalActionBajaEquipo } = useInvUiEquipo();

    const form_soporte = useForm({
        initialValues: {
            numero_sop: null,
        },
        validate: {
            numero_sop: isNotEmpty(
                "Especifica el número de soporte para poder generar el documento"
            ),
        },
    });

    const form_documento = useForm({
        initialValues: {
            documento: null,
        },
        validate: {
            documento: isNotEmpty(
                "Por favor ingresa el documento firmado por las autoridades correspondientes"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionBajaEquipo(false);
        //setActivateInvEquipo(null);
        setActivateSoporte(null);
        form_soporte.reset();
        form_documento.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalBajaEquipo}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Dar de Baja Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvBajaEquipoForm
                form_soporte={form_soporte}
                form_documento={form_documento}
            />
        </Modal>
    );
};
