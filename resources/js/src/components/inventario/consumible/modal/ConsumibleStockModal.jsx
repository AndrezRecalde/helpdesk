import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { InvStockConsumibleForm, TextSection } from "../../../../components";
import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";

export const ConsumibleStockModal = () => {
    const { activateConsumible, setActivateInvConsumible } =
        useInvConsumibleStore();
    const { isOpenModalStockInvConsumible, modalActionStockConsumible } =
        useUiInvConsumible();

    const form = useForm({
        initialValues: {
            //id: null,
            stock: 0,
        },
        validate: {
            stock: isNotEmpty("Por favor ingrese el stock"),
        },
        transformValues: (values) => ({
            ...values,
            /* id: Number(values.id) || null, */
            stock: Number(values.stock) || 0,
        }),
    });

    const handleCloseModal = () => {
        if (activateConsumible !== null) {
            setActivateInvConsumible(null);
        }
        modalActionStockConsumible(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalStockInvConsumible}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Stock de Consumibles
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvStockConsumibleForm form={form} />
        </Modal>
    );
};
