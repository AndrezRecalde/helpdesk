import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { InvEquipoAsignacionForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useInvConceptoStore,
    useInvEquipoStore,
    useInvUiEquipo,
    useUsersStore,
} from "../../../../hooks";

export const InvEquipoAsignacionModal = () => {
    //const { activateInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { isOpenModalAssignEquipo, modalActionAssignEquipo } =
        useInvUiEquipo();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadInvConceptos, startClearInvConceptos } = useInvConceptoStore();

    const form = useForm({
        initialValues: {
            id: null,
            usuario_id: null,
            direccion_id: null,
            concepto_id: null,
            observacion: "",
        },
        validate: {
            usuario_id: isNotEmpty(
                "Por favor seleccione un usuario responsable"
            ),
            direccion_id: isNotEmpty(
                "Por favor seleccione una dirección o gestión"
            ),
            concepto_id: isNotEmpty("Por favor seleccione un estado de uso"),
        },
        transformValues: (values) => ({
            ...values,
            id: Number(values.id) || null,
            usuario_id: Number(values.usuario_id) || null,
            direccion_id: Number(values.direccion_id),
            concepto_id: Number(values.concepto_id) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalAssignEquipo) {
            startLoadUsersGeneral({});
            startLoadDirecciones();
            startLoadInvConceptos();
        }

 /*        return () => {
            clearUsers();
            clearDirecciones();
            startClearInvConceptos();
        }; */
    }, [isOpenModalAssignEquipo]);

    const handleCloseModal = () => {
        /* if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        } */
        modalActionAssignEquipo(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalAssignEquipo}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Asignación Responsabilidad
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEquipoAsignacionForm form={form} />
        </Modal>
    );
};
