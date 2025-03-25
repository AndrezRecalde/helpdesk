import { Modal } from "@mantine/core";
import { InvCategoriaForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useInvCategoriaStore,
    useInvUiCategoria,
} from "../../../../hooks";

export const InvCategoriaModal = () => {
    /* const { startLoadTiposcategorias, startClearTiposcategorias } =
        useInvTipocategoriaStore(); */
    const { activateCategoria, setActivateInvCategoria } =
        useInvCategoriaStore();
    const { isOpenModalInvCategoria, modalActionCategoria } =
        useInvUiCategoria();

    const form = useForm({
        initialValues: {
            tipocategoria_id: null,
            nombre_categoria: "",
        },
        validate: {
            tipocategoria_id: isNotEmpty(
                "Por favor ingrese el tipo de categoría"
            ),
            nombre_categoria: isNotEmpty("Por favor ingrese la categoría"),
        },
        transformValues: (values) => ({
            ...values,
            tipocategoria_id: Number(values.tipocategoria_id) || null,
        }),
    });

    /* useEffect(() => {
        if (isOpenModalInvCategoria) {
            startLoadTiposcategorias();
        }

        return () => {
            startClearTiposcategorias();
        };
    }, [isOpenModalInvCategoria]); */

    const handleCloseModal = () => {
        if (activateCategoria !== null) {
            setActivateInvCategoria(null);
        }
        form.reset();
        modalActionCategoria(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvCategoria}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Categorías
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvCategoriaForm form={form} />
        </Modal>
    );
};
