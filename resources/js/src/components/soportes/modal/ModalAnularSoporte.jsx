import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import { FormAnularSoporte, TextSection } from "../../../components";

export const ModalAnularSoporte = () => {
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalAnularSoporte, modalActionAnularSoporte } =
        useUiSoporte();

    const form = useForm({
        initialValues: {
            obs_anulado: "",
        },
        validate: {
            obs_anulado: isNotEmpty(
                "Por favor señale la razón de la anulación"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionAnularSoporte(0);
        setActivateSoporte(null);
    };

    return (
        <Modal
            opened={isOpenModalAnularSoporte}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fw={700} fz={16}>
                    Anular soporte
                </TextSection>
            }
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
