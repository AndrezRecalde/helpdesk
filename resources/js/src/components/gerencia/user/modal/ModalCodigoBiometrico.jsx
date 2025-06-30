import { Modal } from "@mantine/core";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { hasLength, useForm } from "@mantine/form";
import { TextSection, FormCodigoBiometrico } from "../../../../components";

export const ModalCodigoBiometrico = () => {
    const { setActivateUser } = useUsersStore();
    const { isOpenModalCodigoBiometrico, modalActionCodigoBiometrico } =
        useUiUser();

    const form = useForm({
        initialValues: {
            asi_id_reloj: "",
        },
        validate: {
            asi_id_reloj: hasLength(
                { min: 9, max: 9 },
                "Por favor ingrese el código 9 dígitos"
            ),
        },
    });

    const handleCloseModal = () => {
        setActivateUser(null);
        form.reset();
        modalActionCodigoBiometrico(false);
    };

    return (
        <Modal
            opened={isOpenModalCodigoBiometrico}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fw={700} fz={16}>
                    Código biométrico
                </TextSection>
            }
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormCodigoBiometrico form={form} />
        </Modal>
    );
};
