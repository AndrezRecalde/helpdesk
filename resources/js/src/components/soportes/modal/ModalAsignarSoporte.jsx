import { Modal } from "@mantine/core";
import { FormAsignarSoporte } from "../../../components";
import { useSoporteStore, useUiSoporte, useUsersStore } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect } from "react";

export const ModalAsignarSoporte = () => {
    const current_user = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
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
        startLoadUsersGeneral({ cdgo_direccion: current_user.cdgo_dprtmnto });

      return () => {
        clearUsers();
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
