import { Modal } from "@mantine/core";
import { InvTipocategoriaForm, TextSection } from "../../../../components";
import {
    useInvTipocategoriaStore,
    useInvUiTipocategoria,
} from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvTipocategoriaModal = () => {
    const { activateTipocategoria, setActivateTipocategoria } =
        useInvTipocategoriaStore();
    const { isOpenModalInvTipoCategoria, modalActionTipocategoria } =
        useInvUiTipocategoria();

    const form = useForm({
        initialValues: {
            nombre_tipocategoria: "",
        },
        validate: {
            nombre_tipocategoria: isNotEmpty(
                "Por favor ingrese el tipo de categoría"
            ),
        },
    });

    const handleCloseModal = () => {
        if (activateTipocategoria !== null) {
            setActivateTipocategoria(null);
        }
        modalActionTipocategoria(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvTipoCategoria}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Tipos de categorías
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvTipocategoriaForm form={form} />
        </Modal>
    );
};
