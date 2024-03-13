import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { FormAsignarSoporte } from "../../../components";
import { useSoporteStore, useTecnicoStore, useUiSoporte } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";

export const ModalAsignarSoporte = () => {
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalAsignarSoporte, modalActionAsignarSoporte } = useUiSoporte();

    const form = useForm({
        initialValues: {
            //id_usu_tecnico: null,
            id_tipo_soporte:  null,
            id_area_tic: null,
            //id_estado: 5,
            id_usu_tecnico_asig: null,
        },
        validate: {
            id_tipo_soporte: isNotEmpty("Por favor seleccione una opción"),
            id_area_tic: isNotEmpty("Por favor seleccione una opción"),
            //id_estado: isNotEmpty("Por favor seleccione una opción"),
            id_usu_tecnico_asig: isNotEmpty("Por favor seleccione un técnico")
        }
    })

    useEffect(() => {
        startLoadTecnicos();

      return () => {
        clearTecnicos();
      }
    }, [])


    const handleCloseModal = () => {
        modalActionAsignarSoporte(0);
        setActivateSoporte(null);
    }

    return (
        <Modal
            opened={isOpenModalAsignarSoporte}
            onClose={handleCloseModal}
            title="Asignar soporte"
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
           <FormAsignarSoporte form={form} />
        </Modal>
    );
};
