import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDirectorStore, useUiDirector } from "../../../../hooks";
import { FormDirector, TextSection } from "../../../../components";

export const ModalDireccion = () => {
    const { setClearActivateDirectores } = useDirectorStore();
    const { isOpenModalActionDirector, modalActionDirector } = useUiDirector();

    const form = useForm({
        initialValues: {
            id_jefe: null,
            id_encargado: null,
        },
        validate: {
            id_jefe: isNotEmpty("Por favor seleccione un usuario"),
            id_encargado: isNotEmpty("Por favor seleccione un usuario"),
        },
    });

    const handleCloseModal = () => {
        modalActionDirector(0);
        setClearActivateDirectores();
    };

    return (
        <Modal
            opened={isOpenModalActionDirector}
            onClose={handleCloseModal}
            title={<TextSection tt="" fz={16} fw={700}>Cambio de director</TextSection>}
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormDirector form={form} />
        </Modal>
    );
};
