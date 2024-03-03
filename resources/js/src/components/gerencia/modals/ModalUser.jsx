import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { useEmpresaStore, useUiUser } from "../../../hooks";
import { StepperUser } from "../../../components";

export const ModalUser = ({ title }) => {
    const { isOpenModalAddUser, modalActionUser } = useUiUser();
    const { startLoadEmpresas, clearEmpresas } = useEmpresaStore();

    useEffect(() => {
        startLoadEmpresas();

      return () => {
        clearEmpresas();
      }
    }, [])


    const handleCloseModal = () => {
        modalActionUser(0);
    }
    return (
        <Modal
            opened={isOpenModalAddUser}
            onClose={handleCloseModal}
            title={title}
            size="xl"
            closeOnClickOutside={false}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <StepperUser />
        </Modal>
    );
};
