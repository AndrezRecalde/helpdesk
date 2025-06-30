import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useTecnicoStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { FormSolicitudAdminSoporte, TextSection } from "../../../components";

export const ModalSolicitudAdminSoporte = () => {
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { isOpenModalAddSolicitud, modalActionAddSolicitud } = useUiSoporte();
    const { startLoadDirecciones, direcciones } = useDireccionStore();

    const form = useForm({
        initialValues: {
            numero_escrito: "",
            id_area_tic: "5",
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: "3",
            id_usu_tecnico_asig: null,
            incidente: "",

            can_tecnico: false,
        },
        validate: {
            id_area_tic: isNotEmpty("Por favor seleccione una opción"),
            id_direccion: isNotEmpty("Por favor seleccione una opción"),
            id_usu_recibe: isNotEmpty("Por favor seleccione un usuario"),
            id_tipo_soporte: isNotEmpty("Por favor seleccione un tipo"),
            incidente: isNotEmpty("Por favor digite la incidencia"),
        },
        transformValues: (values) => ({
            ...values,
            id_area_tic: Number(values.id_area_tic) || null,
            id_direccion: Number(values.id_direccion),
            id_usu_recibe: Number(values.id_usu_recibe) || null,
            id_tipo_soporte: Number(values.id_tipo_soporte) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
        }),
    });
    const { can_tecnico } = form.values;

    useEffect(() => {
        if (isOpenModalAddSolicitud && direcciones.length === 0) {
            startLoadDirecciones();
            return;
        }

        /* return () => {
        clearDirecciones()
      } */
    }, [isOpenModalAddSolicitud]);

    useEffect(() => {
        if (can_tecnico) {
            startLoadTecnicos();
            return;
        }

        return () => {
            clearTecnicos();
        };
    }, [can_tecnico]);

    useEffect(() => {
        if (isOpenModalAddSolicitud) {
            startLoadUsersGeneral({});
            return;
        }
        //form.setFieldValue("id_usu_recibe", null);

        return () => {
            clearUsers();
        };
    }, [isOpenModalAddSolicitud]);

    const handleCloseModal = () => {
        modalActionAddSolicitud(0);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalAddSolicitud}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Realizar solicitud
                </TextSection>
            }
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormSolicitudAdminSoporte form={form} />
        </Modal>
    );
};
