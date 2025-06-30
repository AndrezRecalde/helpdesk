import { useEffect } from "react";
import { Divider, Modal } from "@mantine/core";
import { SolAnulacionForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiVacaciones, useVacacionesStore } from "../../../../hooks";

export const SolAnulacionVacacionModal = () => {
    const { isOpenModalSolAnulacion, modalActionSolAnulacion } = useUiVacaciones();
    const { activateVacacion, setActivateVacacion } = useVacacionesStore();

    const form = useForm({
        initialValues: {
            id: null,
            observaciones_anulado: "",
        },
        validate: {
            observaciones_anulado: isNotEmpty(
                "Por favor señale el motivo de su anulación"
            ),
        },
    });

    useEffect(() => {
        if (activateVacacion !== null) {
            form.setFieldValue(
                "id",
                activateVacacion?.id
            );
        }
    }, [activateVacacion]);

    const handleCloseModal = () => {
        modalActionSolAnulacion(false);
        if (activateVacacion !== null) {
            setActivateVacacion(null);
        }
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalSolAnulacion}
            onClose={handleCloseModal}
            title="Anular Solicitud de Vacación"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <TextSection tt="" fs="italic">Codigo de solicitud: {activateVacacion?.codigo_vacacion}</TextSection>
            <Divider my="md" />
            <SolAnulacionForm form={form} />
        </Modal>
    );
};
