import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useTecnicoStore, useUiSoporte, useUsersStore } from "../../../hooks";
import { FormSolicitudAdminSoporte } from "../../../components";

export const ModalSolicitudAdminSoporte = () => {
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { isOpenModalAddSolicitud, modalActionAddSolicitud } = useUiSoporte();

    const form = useForm({
        initialValues: {
            numero_escrito: "",
            id_area_tic: null,
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: null,
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
            id_area_tic: Number(values.id_area_tic),
            id_direccion: Number(values.id_direccion),
            id_usu_recibe: Number(values.id_usu_recibe),
            id_tipo_soporte: Number(values.id_tipo_soporte),
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig),
        }),
    });
    const { id_direccion, can_tecnico } = form.values;

    useEffect(() => {
        startLoadTecnicos();

        return () => {
            clearTecnicos();
        };
    }, [can_tecnico]);

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
