import { Modal } from "@mantine/core";
import { InvTransferirPerifericoForm, TextSection } from "../../../../components";
import { useInvEquipoStore, useInvPerifericoStore, useInvUiPeriferico } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvTransferirPerifericoModal = () => {
    const { startClearEquipoFromTransfer } = useInvEquipoStore();
    const { setActivateInvPeriferico } = useInvPerifericoStore();
    const { isOpenModalTransferirPeriferico, modalActionTransferirPeriferico } =
        useInvUiPeriferico();

    const form = useForm({
        initialValues: {
            codigo_nuevo: "",
        },
        validate: {
            codigo_nuevo: isNotEmpty(
                "Por favor ingrese el código nuevo del equipo destino"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionTransferirPeriferico(false);
        startClearEquipoFromTransfer(null);
        setActivateInvPeriferico(null);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalTransferirPeriferico}
            onClose={handleCloseModal}
            size="md"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Transferir Componente
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvTransferirPerifericoForm form={form} />
        </Modal>
    );
};
