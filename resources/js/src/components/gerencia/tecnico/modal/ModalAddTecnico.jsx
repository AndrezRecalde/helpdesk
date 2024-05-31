import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormAddTecnico } from "../../..";
import { useTecnicoStore, useUiTecnico, useUsersStore } from "../../../../hooks";
import Swal from "sweetalert2";

export const ModalAddTecnico = () => {
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { setActivateTecnico, message, errores } = useTecnicoStore();
    const { isOpenModalAddTecnico, modalActionTecnico } = useUiTecnico();

    const form = useForm({
        initialValues: {
            cdgo_usrio: null,
            roles: null,
        },
        validate: {
            cdgo_usrio: isNotEmpty("Por favor seleccione un usuario"),
            //roles: isNotEmpty("Por favor seleccione un role"),
        },
        transformValues: (values) => ({
            cdgo_usrio: Number(values.cdgo_usrio) || null,
            roles: Number(values.roles) || null,
        }),
    });

    useEffect(() => {
        startLoadUsersGeneral({ cdgo_direccion: null });

        return () => {
            clearUsers();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    const handleCloseModal = () => {
        modalActionTecnico(0);
        setActivateTecnico(null);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalAddTecnico}
            onClose={handleCloseModal}
            title="Gestionar Técnico"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormAddTecnico form={form} />
        </Modal>
    );
};
