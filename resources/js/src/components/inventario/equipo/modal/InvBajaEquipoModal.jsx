import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { InvBajaEquipoForm, TextSection } from "../../../../components";
import { useInvUiEquipo, useSoporteStore } from "../../../../hooks";

export const InvBajaEquipoModal = () => {
    //const { setActivateInvEquipo } = useInvEquipoStore();
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalBajaEquipo, modalActionBajaEquipo } = useInvUiEquipo();

    const form = useForm({
        initialValues: {
            numero_sop: "",
            fecha_baja: new Date(),
            perifericos: [],
            //documento: null,
        },
        validate: {
            numero_sop: isNotEmpty(
                "Por favor ingresa la fecha de baja del equipo"
            ),
            fecha_baja: isNotEmpty(
                "Por favor ingresa la fecha de baja del equipo"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionBajaEquipo(false);
        //setActivateInvEquipo(null);
        setActivateSoporte(null);
        form.reset();
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
                form={form}
            />
        </Modal>
    );
};
