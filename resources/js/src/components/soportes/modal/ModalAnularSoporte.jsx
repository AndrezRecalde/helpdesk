import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import { FormAnularSoporte } from "../../../components";


export const ModalAnularSoporte = () => {
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalAnularSoporte, modalActionAnularSoporte } = useUiSoporte();

    const form = useForm({
        initialValues: {
            id_estado: 2,
            obs_anulado: ""
        },
        validate: {
            obs_anulado: isNotEmpty("Por favor señale la razón de la anulación")
        }
    })

    const handleCloseModal = () => {
        modalActionAnularSoporte(0);
        setActivateSoporte(null);
    }


    return (
        <Modal
            opened={isOpenModalAnularSoporte}
            onClose={handleCloseModal}
            title="Anular soporte"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormAnularSoporte form={form} />
        </Modal>
    );
};
