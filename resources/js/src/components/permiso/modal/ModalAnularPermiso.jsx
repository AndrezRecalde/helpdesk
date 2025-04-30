import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { usePermisoStore, useUiPermiso } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormAnularPermiso } from "../../../components";

export const ModalAnularPermiso = () => {
    const { activatePermiso, setActivatePermiso } = usePermisoStore();
    const { isOpenModalAnularPermiso, modalActionAnularPermiso } =
        useUiPermiso();

    const form = useForm({
        initialValues: {
            idper_permisos: "",
            per_observacion_anulado: "",
        },
        validate: {
            per_observacion_anulado: isNotEmpty(
                "Por favor señale el motivo de su anulación"
            ),
        },
    });

    useEffect(() => {
        if (activatePermiso !== null) {
            form.setFieldValue(
                "idper_permisos",
                activatePermiso?.idper_permisos
            );
        }
    }, [activatePermiso]);

    const handleCloseModal = () => {
        if (activatePermiso !== null) {
            setActivatePermiso(null);
        }
        form.reset();
        modalActionAnularPermiso(0);
    };

    return (
        <Modal
            opened={isOpenModalAnularPermiso}
            onClose={handleCloseModal}
            title="Anular Permiso"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormAnularPermiso form={form} />
        </Modal>
    );
};
