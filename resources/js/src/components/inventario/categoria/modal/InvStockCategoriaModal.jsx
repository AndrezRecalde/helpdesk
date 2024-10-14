import { Modal } from "@mantine/core";
import { InvStockCategoriaForm, TextSection } from "../../../../components";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const InvStockCategoriaModal = () => {
    const { activateCategoria, setActivateInvCategoria } =
        useInvCategoriaStore();
    const { isOpenModalStockInvCategoria, modalActionStockCategoria } =
        useInvUiCategoria();

    const form = useForm({
        initialValues: {
            id: null,
            stock: 0,
        },
        validate: {
            stock: isNotEmpty("Por favor ingrese el stock"),
        },
        transformValues: (values) => ({
            id: Number(values.id) || null,
            stock: Number(values.stock) || 0,
        }),
    });

    const handleCloseModal = () => {
        if (activateCategoria !== null) {
            setActivateInvCategoria(null);
        }
        modalActionStockCategoria(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalStockInvCategoria}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Stock de Categorías
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvStockCategoriaForm form={form} />
        </Modal>
    );
};
