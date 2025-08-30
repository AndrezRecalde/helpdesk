import { Divider, Modal } from "@mantine/core";
import { PeriodoForm, TextSection } from "../../..";
import { usePeriodoStore, useUiPeriodo } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";

export const PeriodoCreateModal = () => {
    const { isOpenModalAddPeriodo, modalActionAddPeriodo } = useUiPeriodo();
    const { startClearCalculoDias } = usePeriodoStore();

    const form = useForm({
        initialValues: {
            is_multiple_anio: false,
            cdgo_usrio: null,
            regimen_laboral_id: null,
            anios: [], // array de años seleccionados, ej: [2023, 2024]
        },

        validate: {
            cdgo_usrio: isNotEmpty("Seleccione un usuario"),
            regimen_laboral_id: isNotEmpty("El usuario no tiene un tipo de contrato"),
            anios: isNotEmpty("Elija al menos un periodo"),
        },

        transformValues: (values) => ({
            cdgo_usrio: Number(values.cdgo_usrio),
            regimen_laboral_id: Number(values.regimen_laboral_id),
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
        startClearCalculoDias();
        form.reset();
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
            size="lg"
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
