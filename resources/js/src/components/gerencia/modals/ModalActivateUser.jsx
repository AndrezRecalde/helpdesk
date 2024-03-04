import { Modal } from "@mantine/core";
import { FormActiveUser } from "../../../components";
import { useUiUser } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";


export const ModalActivateUser = () => {
    const { isOpenModalActiveUser, modalActionActiveUser } = useUiUser();

    const form = useForm({
        initialValues: {
            actvo: null
        },
        validate: {
            actvo: isNotEmpty("Por favor ingrese un estado para el usuario")
        }
    })


    const handleCloseModal = () => {
        modalActionActiveUser(0);
    }

    return (
        <Modal
            opened={isOpenModalActiveUser}
            onClose={handleCloseModal}
            title="Activar/Desactivar Usuario"
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormActiveUser form={form} />
        </Modal>
    );
};
