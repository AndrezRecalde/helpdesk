import { useEffect } from "react";
import { Drawer, Modal } from "@mantine/core";
import { FormCreateSoporte } from "../../../components";
import {
    useDiagnosticoStore,
    useEquipoStore,
    useTecnicoStore,
    useTipoSolicitudStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { useForm } from "@mantine/form";

export const ModalCreateSoporte = ({ role }) => {
    const user = JSON.parse(localStorage.getItem("service_user"));
    const { isOpenModalCreateSoporte, modalActionCreateSoporte } =
        useUiSoporte();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { tecnicos, startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { startLoadTiposSolicitudes, clearTiposSolicitudes } =
        useTipoSolicitudStore();

    const { startLoadDiagnosticos, clearDiagnosticos } = useDiagnosticoStore();
    const { startLoadEquiposInformaticos, clearEquiposInformaticos } = useEquipoStore();

    const form = useForm({
        initialValues: {
            id_tipo_solicitud: null,
            numero_escrito: "",
            fecha_ini: new Date(),
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: null,
            incidente: "",
            id_area_tic: null,
            id_estado: null, //cambiarlo a asignado o finalizado o ATENDIDO
            id_usu_tecnico_asig: null,
            id_equipo: null,

            terminado: false,
        },
    });

    const { id_direccion } = form.values;

    useEffect(() => {
        startLoadTiposSolicitudes();
        startLoadDiagnosticos();
        startLoadEquiposInformaticos();

        return () => {
            clearTiposSolicitudes();
            clearDiagnosticos();
            clearEquiposInformaticos();
        };
    }, []);

    useEffect(() => {
        if (role) {
            startLoadTecnicos(user.cdgo_usrio);
            form.setFieldValue(
                "id_usu_tecnico_asig",
                user?.cdgo_usrio.toString()
            );
        } else {
            startLoadTecnicos();
        }

        return () => {
            clearTecnicos();
        };
    }, [role]);

    useEffect(() => {
        startLoadUsersExtrict(id_direccion);
        form.setFieldValue("id_usu_recibe", null);

        return () => {
            clearUsers();
        };
    }, [id_direccion]);

    const handleCloseModal = () => {
        modalActionCreateSoporte(0);
        form.reset();
    };

    return (
        <Drawer
            offset={8}
            radius="md"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            transitionProps={{
                transition: "slide-right",
                duration: 150,
                timingFunction: "linear",
            }}
            opened={isOpenModalCreateSoporte}
            onClose={handleCloseModal}
            position="right"
            size="lg"
            title="Crear soporte"
        >
            <FormCreateSoporte form={form} role={role} />
        </Drawer>
    );
};
