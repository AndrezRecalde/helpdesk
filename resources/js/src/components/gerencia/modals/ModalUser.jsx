import { Modal } from "@mantine/core";
import { useUiUser } from "../../../hooks";
import { FormUser } from "../../../components";

export const ModalUser = ({ title }) => {
    const { isOpenModalAddUser, modalActionUser } = useUiUser();

    const handleCloseModal = () => {
        modalActionUser(0);
    }
    return (
        <Modal
            opened={isOpenModalAddUser}
            onClose={handleCloseModal}
            title={title}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormUser />
        </Modal>
    );
};
