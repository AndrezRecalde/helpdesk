import { Modal } from "@mantine/core";
import { useUiContrato, useContratoStore } from "../../../hooks";
import { FormContrato } from "../form/FormContrato";

export const ModalContrato = () => {
    const { isOpenModalContrato, modalActionContrato } = useUiContrato();
    const { activeContrato } = useContratoStore();

    return (
        <Modal
            opened={isOpenModalContrato}
            onClose={() => modalActionContrato(0)}
            title={activeContrato ? "ACTUALIZAR CONTRATO" : "NUEVO CONTRATO"}
            centered
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormContrato />
        </Modal>
    );
};
