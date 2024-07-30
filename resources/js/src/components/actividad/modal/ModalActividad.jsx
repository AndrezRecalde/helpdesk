import { Modal } from "@mantine/core";
import { ActividadForm, TextSection } from "../../../components";
import { useActividadStore, useUiActividad } from "../../..//hooks";

export const ModalActividad = ({ fecha_inicio, fecha_fin }) => {

   const { isOpenModalActividad, modalActionActividad } = useUiActividad();
   const { setClearActivateActividad } = useActividadStore();

   const handleCloseModal = () => {
    setClearActivateActividad();
    modalActionActividad(0);
   }


    return (
        <Modal
            opened={isOpenModalActividad}
            onClose={handleCloseModal}
            title={<TextSection tt="" fz={16} fw={700}>Actividad</TextSection>}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            size="lg"
        >
            <ActividadForm fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
        </Modal>
    );
};
