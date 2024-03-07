import { Modal } from "@mantine/core";
import { useUiUser } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { FormResetPwdUser } from "../forms/FormResetPwdUser";

export const ModalResetPwdUser = () => {
    const { isOpenModalResetPwd, modalActionResetPwd } = useUiUser();

    const form = useForm({
        initialValues: {
            paswrd: ""
        },
        validate: {
            paswrd: isNotEmpty("Por favor seleccione la contraseña por defecto")
        }
    })

    const handleCloseModal = () => {
        modalActionResetPwd(0);
    }

    return (
        <Modal
            opened={isOpenModalResetPwd}
            onClose={handleCloseModal}
            title="Resetear contraseña"
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormResetPwdUser form={form} />
        </Modal>
    );
};
