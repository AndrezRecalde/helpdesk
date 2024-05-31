import { Modal } from "@mantine/core";
import { FormActiveUser } from "../../..";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const ModalActivateUser = () => {
    const { setClearActivateUser } = useUsersStore();
    const { isOpenModalActiveUser, modalActionActiveUser } = useUiUser();

    const form = useForm({
        initialValues: {
            actvo: null,
        },
        validate: {
            actvo: isNotEmpty("Por favor ingrese un estado para el usuario"),
        },
    });

    const handleCloseModal = () => {
        modalActionActiveUser(0);
        setClearActivateUser();
    };

    return (
        <Modal
            centered
            opened={isOpenModalActiveUser}
            onClose={handleCloseModal}
            title="Activar/Desactivar Usuario"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormActiveUser form={form} />
        </Modal>
    );
};
