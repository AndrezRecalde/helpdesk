import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { InvConceptoForm, TextSection } from "../../../../components";
import { useInvConceptoStore, useInvUiConcepto } from "../../../../hooks";

export const InvConceptoModal = () => {

    const { activateConcepto, setActivateInvConcepto } = useInvConceptoStore();
    const { isOpenModalInvConcepto, modalActionConcepto } = useInvUiConcepto();

    const form = useForm({
        initialValues: {
            nombre_concepto: "",
        },
        validate: {
            nombre_concepto: isNotEmpty("Por favor ingrese el estado"),
        },
    });

    const handleCloseModal = () => {
        if (activateConcepto !== null) {
            setActivateInvConcepto(null);
        }
        form.reset();
        modalActionConcepto(false);
    }

    return (
        <Modal
            centered
            opened={isOpenModalInvConcepto}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Concepto de Estado
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvConceptoForm form={form} />
        </Modal>
    );
};
