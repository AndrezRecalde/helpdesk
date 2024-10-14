import { Modal } from "@mantine/core";
import { InvDeleteEquipoForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvDeleteEquipoModal = () => {

    const { isOpenModalDeleteEquipo, modalActionDeleteEquipo } = useInvUiEquipo();
    const { setActivateInvEquipo } = useInvEquipoStore();

    const form = useForm({
        initialValues: {
            codigo: "",
            serie: ""
        },
        validate: {
            codigo: isNotEmpty(
                "Debe especificar el código nuevo del equipo"
            ),
            serie: isNotEmpty(
                "Debe especificar el número de serie del equipo"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionDeleteEquipo(false);
        setActivateInvEquipo();
        form.reset();
    }

    return (
        <Modal
            centered
            opened={isOpenModalDeleteEquipo}
            onClose={handleCloseModal}
            size="md"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Eliminar Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvDeleteEquipoForm form={form} />
        </Modal>
    );
};
