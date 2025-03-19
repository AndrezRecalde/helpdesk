import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { InvAsignarCustodioForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useUiInvCustodio,
    useUsersStore,
} from "../../../../hooks";

export const InvAsignarCustodioModal = ({
    setActivateElement,
    activateElement,
    startAsignarCustodioFn,
}) => {
    const { isOpenModalAsignarCustodio, modalActionCustodio } =
        useUiInvCustodio();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();

    const form = useForm({
        initialValues: {
            user_id: null,
            direccion_id: null,
        },
        validate: {
            user_id: isNotEmpty("Seleccione al custodio"),
            direccion_id: isNotEmpty("Seleccione la direccion destino"),
        },
        transformValues: (values) => ({
            user_id: Number(values.user_id) || null,
            direccion_id: Number(values.direccion_id) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalAsignarCustodio) {
            startLoadUsersGeneral({});
            startLoadDirecciones();
        }

        return () => {
            clearUsers();
            clearDirecciones();
        };
    }, [isOpenModalAsignarCustodio]);

    const handleCloseModal = () => {
        if (activateElement !== null) {
            setActivateElement(null);
        }
        modalActionCustodio(false);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalAsignarCustodio}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Asignar custodio
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvAsignarCustodioForm
                form={form}
                setActivateElement={setActivateElement}
                activateElement={activateElement}
                startAsignarCustodioFn={startAsignarCustodioFn}
            />
        </Modal>
    );
};
