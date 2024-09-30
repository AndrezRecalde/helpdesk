import { Modal } from "@mantine/core";
import { InvMarcaForm, TextSection } from "../../../../components";
import { useInvMarcaStore, useInvUiMarca } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvMarcaModal = () => {
    const { activateInvMarca, setActivateInvMarca } = useInvMarcaStore();
    const { isOpenModalInvMarca, modalActionMarca } = useInvUiMarca();

    const form = useForm({
        initialValues: {
            nombre_marca: "",
        },
        validate: {
            nombre_marca: isNotEmpty("Por favor ingrese la marca"),
        },
    });

    const handleCloseModal = () => {
        if (activateInvMarca !== null) {
            setActivateInvMarca(null);
        }
        modalActionMarca(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvMarca}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Marca
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvMarcaForm form={form} />
        </Modal>
    );
};
