import { Divider, Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { TextSection } from "../../../../components";
import { usePeriodoStore, useUiPeriodo } from "../../../../hooks";
import { PeriodoEditForm } from "../form/PeriodoEditForm";

export const PeriodoEditModal = () => {
    const { isOpenModalEditPeriodo, modalActionEditPeriodo } = useUiPeriodo();
    const { setActivatePeriodo } = usePeriodoStore();

    const form = useForm({
        initialValues: {
            id: null,
            dias_tomados: 0,
            observacion: ""
        },

        validate: {
            dias_tomados: isNotEmpty("Ingrese días tomados"),
        },

        transformValues: (values) => ({
            ...values,
            id: Number(values.id) || null,
            dias_tomados: Number(values.dias_tomados),
        }),
    });

    const handleCloseModal = () => {
        modalActionEditPeriodo(false);
        setActivatePeriodo(null);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalEditPeriodo}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Editar Periodo Vacacional
                </TextSection>
            }
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Divider my="xs" />
            <PeriodoEditForm form={form} />
        </Modal>
    );
};
