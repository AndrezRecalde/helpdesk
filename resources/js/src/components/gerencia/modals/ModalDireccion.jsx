import { Modal } from "@mantine/core";
import { useUiDirector } from "../../../hooks";
import { FormDirector } from "../../../components";
import { useForm } from "@mantine/form";

export const ModalDireccion = () => {
    const { isOpenModalActionDirector, modalActionDirector } = useUiDirector();

    const form = useForm({
        initialValues: {
            id_jefe: null,
            id_encargado: null
        }
    })

    const handleCloseModal = () => {
        modalActionDirector(0);
    }

    return (
        <Modal
            opened={isOpenModalActionDirector}
            onClose={handleCloseModal}
            title="Cambio de director"
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
