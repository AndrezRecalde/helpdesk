import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { useCargoStore, useEmpresaStore, useSexoStore, useTipoContratoStore, useTipoUsuarioStore, useUiUser } from "../../../hooks";
import { StepperUser } from "../../../components";

export const ModalUser = ({ title }) => {
    const { isOpenModalAddUser, modalActionUser } = useUiUser();
    const { startLoadEmpresas, clearEmpresas } = useEmpresaStore();
    const { startLoadTipoSexo, clearTipoSexo } = useSexoStore();
    //const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadCargos, clearCargos } = useCargoStore();
    const { startLoadTiposUsuarios, clearTiposUsuarios } = useTipoUsuarioStore();
    const { startLoadTiposContratos, clearTiposContratos } = useTipoContratoStore();

    useEffect(() => {
        startLoadEmpresas();
        startLoadTipoSexo();
        //startLoadDirecciones();
        startLoadCargos();
        startLoadTiposUsuarios();
        startLoadTiposContratos();

      return () => {
        clearEmpresas();
        clearTipoSexo();
        //clearDirecciones();
        clearCargos();
        clearTiposUsuarios();
        clearTiposContratos();
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
