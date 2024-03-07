import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { FormSolicitudAdminSoporte } from "../../../components";

export const ModalSolicitudAdminSoporte = () => {
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { isOpenModalAddSolicitud, modalActionAddSolicitud } = useUiSoporte();

    const form = useForm({
        initialValues: {
            numero_escrito: "",
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: null,
            incidente: "",
        },
        validate: {
            id_direccion: isNotEmpty("Por favor seleccione una opción"),
            id_usu_recibe: isNotEmpty("Por favor seleccione un usuario"),
            id_tipo_soporte: isNotEmpty("Por favor seleccione un tipo"),
            incidente: isNotEmpty("Por favor digite la incidencia"),
        },
    });
    const { id_direccion } = form.values;

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
        };
    }, []);

    useEffect(() => {
        startLoadUsersExtrict(id_direccion);
        form.setFieldValue("id_usu_recibe", null);

        return () => {
            clearUsers();
        };
    }, [id_direccion]);


    const handleCloseModal = () => {
        modalActionAddSolicitud(0);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalAddSolicitud}
            onClose={handleCloseModal}
            title="Realizar solicitud"
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
