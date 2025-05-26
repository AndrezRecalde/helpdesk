import { Modal } from "@mantine/core";
import { ConsumibleForm, TextSection } from "../../..";
import {
    useInvCategoriaStore,
    useInvConsumibleStore,
    useUiInvConsumible,
} from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export const InvConsumibleModal = () => {
    const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore();
    const { setActivateInvConsumible, activateConsumible } =
        useInvConsumibleStore();
    const { isOpenModalInvConsumible, modalActionConsumible } =
        useUiInvConsumible();

    const form = useForm({
        initialValues: {
            codigo: "",
            nombre_consumible: "",
            tipocategoria_id: null,
            categoria_id: null,
        },
        validate: {
            codigo: isNotEmpty("Por favor ingrese el código del consumible"),
            nombre_consumible: isNotEmpty(
                "Por favor ingrese el nombre del consumible"
            ),
            //tipocategoria_id: isNotEmpty("Por favor seleccione una categoría"),
            categoria_id: isNotEmpty("Por favor seleccione una categoría"),
        },
        transformValues: (values) => ({
            ...values,
            //tipocategoria_id: Number(values.tipocategoria_id) || null,
            categoria_id: Number(values.categoria_id) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalInvConsumible) {
            startLoadInvCategorias({ tipocategoria_id: 2, activo: true });
            return;
        }

        return () => {
            startClearInvCategorias();
        };
    }, [isOpenModalInvConsumible]);

    const handleCloseModal = () => {
        if (activateConsumible !== null) {
            setActivateInvConsumible(null);
        }
        modalActionConsumible(false);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvConsumible}
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
            <ConsumibleForm form={form} />
        </Modal>
    );
};
