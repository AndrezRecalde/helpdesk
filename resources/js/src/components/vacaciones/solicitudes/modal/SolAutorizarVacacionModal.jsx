import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { SolAutorizarForm } from "../form/SolAutorizarForm";
import { usePeriodoStore, useUiVacaciones, useVacacionesStore } from "../../../../hooks";
import { TextSection } from "../../../../components";

export const SolAutorizarVacacionModal = () => {
    const { setActivateVacacion, activateVacacion } = useVacacionesStore();
    const { isOpenModalGestionarVacacion, modalActionGestionarVacacion } = useUiVacaciones();
    const { startLoadPeriodosByUser, startClearPeriodos } = usePeriodoStore();

    useEffect(() => {
      if (isOpenModalGestionarVacacion && activateVacacion !== null) {
        startLoadPeriodosByUser(activateVacacion.cdgo_usrio);
      }

      return () => {
        startClearPeriodos();
      }
    }, [isOpenModalGestionarVacacion, activateVacacion])


    const handleCloseModal = () => {
        modalActionGestionarVacacion(false);
        setActivateVacacion(null);
    };

    return (
        <Modal
            size="xl"
            radius="md"
            opened={isOpenModalGestionarVacacion}
            onClose={handleCloseModal}
            title={<TextSection tt="" fw={500} fz={16}>Autorizar Solicitud</TextSection>}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <SolAutorizarForm />
        </Modal>
    );
};
