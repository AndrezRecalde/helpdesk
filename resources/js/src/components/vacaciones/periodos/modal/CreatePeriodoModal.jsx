import { Divider, Modal } from "@mantine/core";
import { PeriodoForm, TextSection } from "../../../../components";
import { useUiPeriodo } from "../../../../hooks";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

export const CreatePeriodoModal = () => {
    const { isOpenModalAddPeriodo, modalActionAddPeriodo } = useUiPeriodo();

    const form = useForm({
        initialValues: {
            usuario: null, // o "" si usas string por defecto
            anios: [], // array de años seleccionados, ej: [2023, 2024]
        },

        validate: {
            usuario: (value) => (value ? null : "Usuario es requerido"),
            anios: (value) =>
                value.length > 0 ? null : "Debe seleccionar al menos un año",
        },

        transformValues: (values) => ({
            cdgo_usrio: Number(values.usuario),
            anios: values.anios
                .map((date) => {
                    const year = dayjs(date).year();
                    return isNaN(year) ? null : year;
                })
                .filter(Boolean), // Elimina posibles nulls
        }),
    });

    const handleCloseModal = () => {
        modalActionAddPeriodo(false);
    };

    return (
        <Modal
            opened={isOpenModalAddPeriodo}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Crear Periodo Vacacional
                </TextSection>
            }
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Divider my="xs" />
            <PeriodoForm form={form} />
        </Modal>
    );
};
