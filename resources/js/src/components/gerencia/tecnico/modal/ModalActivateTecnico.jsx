import { Modal } from "@mantine/core";
import { useTecnicoStore, useUiTecnico } from "../../../../hooks";
import { FormDirector, TextSection } from "../../../../components";

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
            title={<TextSection tt="" fw={700} fz={16}>Desactivar Técnico</TextSection>}
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
