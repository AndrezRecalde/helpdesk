import { Modal } from "@mantine/core";
import { useTecnicoStore, useUiTecnico } from "../../../../hooks";

export const ModalActivateTecnico = () => {

    const { setActivateTecnico } = useTecnicoStore();
    const { isOpenModalActivateTecnico, modalActionActivateTecnico } = useUiTecnico();

    const handleCloseModal = () => {
        modalActionActivateTecnico(0);
        setActivateTecnico(null);
    }

    return (
        <Modal
            opened={isOpenModalActivateTecnico}
            onClose={handleCloseModal}
            title="Desactivar Técnico"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormDirector form={form} />
        </Modal>
    );
};
