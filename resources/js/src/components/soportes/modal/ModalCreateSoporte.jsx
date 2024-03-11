import { useEffect } from "react";
import { Drawer } from "@mantine/core";
import { FormCreateSoporte } from "../../../components";
import {
    useEquipoStore,
    useEstadoStore,
    useTecnicoStore,
    useTipoSolicitudStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";

export const ModalCreateSoporte = ({ role }) => {
    const user = JSON.parse(localStorage.getItem("service_user"));
    const { isOpenModalCreateSoporte, modalActionCreateSoporte } =
        useUiSoporte();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { startLoadTiposSolicitudes, clearTiposSolicitudes } =
        useTipoSolicitudStore();

    const { startLoadEquiposInformaticos, clearEquiposInformaticos } =
        useEquipoStore();
    const { startLoadEstados, clearEstados } = useEstadoStore();

    const form = useForm({
        initialValues: {
            id_estado: "3",
            fecha_ini: new Date(),
            id_tipo_solicitud: "1",
            numero_escrito: "",
            id_usu_tecnico_asig: null,
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: null,
            id_area_tic: null,
            incidente: "",
            solucion: "",
            id_equipo: null,
            fecha_fi: new Date(),

            terminado: false,
        },
        validate: {
            id_estado: isNotEmpty("Por favor seleccione una opción"),
            fecha_ini: isNotEmpty("Por favor ingrese la fecha de solicitud"),
            id_tipo_solicitud: isNotEmpty(
                "Por favor debe seleccionar una opción "
            ),
            id_usu_tecnico_asig: isNotEmpty("Por favor seleccione un técnico"),
            id_direccion: isNotEmpty(
                "Por favor seleccione la dirección del solicitante"
            ),
            id_usu_recibe: isNotEmpty(
                "Por favor seleccione al usuario solicitante"
            ),
            id_tipo_soporte: isNotEmpty("Por favor ingrese el tipo de soporte"),
            id_area_tic: isNotEmpty("Por favor seleccione el área"),
            incidente: isNotEmpty("Por favor ingrese la incidencia"),
            solucion: (value, values) =>
                values.terminado === true && value.length < 5
                    ? "Por favor ingrese el detalle de la solución"
                    : null,
            id_equipo: (value, values) =>
                values.id_tipo_soporte == 1 && value === null
                    ? "En soporte a hardware es obligatorio el código del activo"
                    : null,
        },
        transformValues: (values) => ({
            ...values,
            id_estado: Number(values.id_estado),
            //fecha_ini: dayjs(values.fecha_ini),
            id_tipo_solicitud: Number(values.id_tipo_solicitud),
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig),
            id_direccion: Number(values.id_direccion),
            id_usu_recibe: Number(values.id_usu_recibe),
            id_tipo_soporte: Number(values.id_tipo_soporte),
            id_area_tic: Number(values.id_area_tic),
            id_equipo: Number(values.id_equipo) || null,
        }),
    });

    const { id_direccion } = form.values;

    useEffect(() => {
        startLoadTiposSolicitudes();
        startLoadEquiposInformaticos();
        startLoadEstados();

        return () => {
            clearTiposSolicitudes();
            clearEquiposInformaticos();
            clearEstados();
        };
    }, []);

    useEffect(() => {
        console.log(role);
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
    }, [role, isOpenModalCreateSoporte]);

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
