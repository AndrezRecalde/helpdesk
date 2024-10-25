import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useInvUiEquipo } from "../../../../hooks";
import { InvEquipoDocumentoForm, TextSection } from "../../../../components";

export const InvEquipoDocumentoModal = () => {

    const { isOpenModalAddDocumento, modalActionAddDocumento } = useInvUiEquipo();

    const form = useForm({
        initialValues: {
            nombre_documento: "",
            documento: null
        },
        validate: {
            nombre_documento: isNotEmpty(
                "Debe especificar el código nuevo del equipo"
            ),
            documento: isNotEmpty(
                "Debe especificar el número de serie del equipo"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionAddDocumento(false);
        form.reset();
    }

    return (
        <Modal
            centered
            opened={isOpenModalAddDocumento}
            onClose={handleCloseModal}
            size="md"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Agregar documento
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEquipoDocumentoForm form={form} />
        </Modal>
    );
};
