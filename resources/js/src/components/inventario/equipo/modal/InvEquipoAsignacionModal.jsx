import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { TextSection } from "../../..";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useInvEquipoStore,
    useInvUiEquipo,
    useUsersStore,
} from "../../../../hooks";

export const InvEquipoAsignacionModal = () => {
    const { activateInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { isOpenModalAssignEquipo, modalActionAssignEquipo } =
        useInvUiEquipo();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();

    const form = useForm({
        initialValues: {
            cdgo_usrio: null,
            cdgo_dprtmnto: null,
        },
        validate: {
            tipocategoria_id: isNotEmpty(
                "Por favor ingrese el tipo de categoría"
            ),
            nombre_categoria: isNotEmpty("Por favor ingrese la categoría"),
        },
        transformValues: (values) => ({
            cdgo_usrio: Number(values.cdgo_usrio) || null,
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto),
        }),
    });

    useEffect(() => {
        if (isOpenModalAssignEquipo) {
            startLoadUsersGeneral();
            startLoadDirecciones();
        }

        return () => {
            clearUsers();
            clearDirecciones();
        };
    }, [isOpenModalAssignEquipo]);

    const handleCloseModal = () => {
        if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        }
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
                    Categorías
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEquipoAsignacionForm />
        </Modal>
    );
};
