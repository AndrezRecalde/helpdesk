import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiUser } from "../../../../hooks";
import { FormResetPwdUser } from "../../../../components";

export const ModalResetPwdUser = () => {
    const { isOpenModalResetPwd, modalActionResetPwd } = useUiUser();

    const form = useForm({
        initialValues: {
            paswrd: "",
        },
        validate: {
            paswrd: isNotEmpty(
                "Por favor seleccione la contraseña por defecto"
            ),
        },
    });

    const handleCloseModal = () => {
        modalActionResetPwd(0);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalResetPwd}
            onClose={handleCloseModal}
            title="Resetear contraseña"
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormResetPwdUser form={form} />
        </Modal>
    );
};
