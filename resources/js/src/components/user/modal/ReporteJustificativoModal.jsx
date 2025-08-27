import { Modal } from "@mantine/core";
import { ReporteJustificativoForm, TextSection } from "../../../components";
import { useUiMarcacion } from "../../../hooks";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";

export const ReporteJustificativoModal = () => {
    const { isOpenModalGenerarReporte, modalActionGenerarReporte } =
        useUiMarcacion();

    const form = useForm({
        initialValues: {
            numero_memorando: null,
            fechas: [], // array de años seleccionados, ej: [2023, 2024]
        },

        validate: {
            numero_memorando: (value) =>
                value.length === 0 ? "Por favor ingrese el número de MEMO" : null,
            fechas: (value) =>
                value.length === 0 ? "Seleccione al menos una fecha" : null,
        },
        transformValues: (values) => ({
            numero_memorando: Number(values.numero_memorando) || null,
            fechas: values.fechas.map((f) =>
                f ? dayjs(f).format("YYYY-MM-DD") : null
            ),
        }),
    });

    const handleCloseModal = () => {
        modalActionGenerarReporte(false);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalGenerarReporte}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Generar Justificativo de Marcación
                </TextSection>
            }
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <ReporteJustificativoForm form={form} />
        </Modal>
    );
};
