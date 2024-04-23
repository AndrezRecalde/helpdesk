import { useEffect } from "react";
import { Drawer } from "@mantine/core";
import { FormCreateSoporte } from "../../../components";
import {
    useEquipoStore,
    useEstadoStore,
    useSoporteStore,
    useTecnicoStore,
    useTipoSolicitudStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const ModalCreateSoporte = ({ role }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { activateSoporte, setActivateSoporte } = useSoporteStore();
    const { isOpenModalCreateSoporte, modalActionCreateSoporte } =
        useUiSoporte();
    const { users, startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { startLoadTiposSolicitudes, clearTiposSolicitudes } =
        useTipoSolicitudStore();

    const { startLoadEquiposInformaticos, clearEquiposInformaticos } =
        useEquipoStore();
    const { startLoadEstados, clearEstados } = useEstadoStore();

    const form = useForm({
        initialValues: {
            id_estado: activateSoporte?.id_estado.toString()
                ? activateSoporte?.id_estado.toString()
                : "3",
            fecha_ini: new Date(),
            id_tipo_solicitud: activateSoporte?.id_tipo_solicitud
                ? activateSoporte?.id_tipo_solicitud.toString()
                : "1",
            numero_escrito: "",
            id_usu_tecnico_asig: null,
            id_direccion: null,
            id_usu_recibe: null,
            id_tipo_soporte: null,
            id_area_tic: null,
            incidente: "",
            solucion: "",
            id_equipo: null,
            fecha_fin: new Date(),

            activo_informatico: false,
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
           /*  solucion: hasLength(
                { min: 5, max: 350 },
                "La solución debe tener entre 10 y 350 caracteres"
            ), */
            id_equipo: (value, values) =>
                values.id_tipo_soporte == 1 && value === null
                    ? "En soporte a hardware es obligatorio el código del activo"
                    : null,
        },
        transformValues: (values) => ({
            ...values,
            id_estado: Number(values.id_estado) || null,
            fecha_ini: values.fecha_ini.toLocaleString("sv-SE", {
                timeZone: "America/Guayaquil",
            }),
            fecha_fin: values.fecha_fin.toLocaleString("sv-SE", {
                timeZone: "America/Guayaquil",
            }),
            id_tipo_solicitud: Number(values.id_tipo_solicitud) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
            id_direccion: Number(values.id_direccion),
            id_usu_recibe: Number(values.id_usu_recibe) || null,
            id_tipo_soporte: Number(values.id_tipo_soporte) || null,
            id_area_tic: Number(values.id_area_tic) || null,
            id_equipo: Number(values.id_equipo) || null,
        }),
    });

    const { id_direccion, id_usu_recibe } = form.values;

    useEffect(() => {
        if (isOpenModalCreateSoporte) {
            startLoadTiposSolicitudes();
            startLoadEquiposInformaticos();
            startLoadEstados();
        }
        return () => {
            clearTiposSolicitudes();
            clearEquiposInformaticos();
            clearEstados();
        };
    }, [isOpenModalCreateSoporte]);

    useEffect(() => {
        if (activateSoporte !== null) {
            startLoadTecnicos();
            form.setValues({
                ...activateSoporte,
                id_estado: activateSoporte?.id_estado
                    ? activateSoporte?.id_estado?.toString()
                    : null,
                id_tipo_solicitud: activateSoporte?.id_tipo_solicitud
                    ? activateSoporte?.id_tipo_solicitud?.toString()
                    : null,
                numero_escrito: activateSoporte?.numero_escrito
                    ? activateSoporte?.numero_escrito
                    : "",
                id_usu_tecnico_asig: activateSoporte?.id_usu_tecnico_asig
                    ? activateSoporte?.id_usu_tecnico_asig?.toString()
                    : null,
                id_direccion:
                    activateSoporte?.id_direccion ||
                    activateSoporte?.id_direccion == 0
                        ? activateSoporte?.id_direccion?.toString()
                        : null,
                id_usu_recibe: activateSoporte?.id_usu_recibe
                    ? activateSoporte?.id_usu_recibe?.toString()
                    : null
                    ? activateSoporte?.id_usu_recibe?.toString()
                    : null,
                id_tipo_soporte: activateSoporte?.id_tipo_soporte
                    ? activateSoporte?.id_tipo_soporte?.toString()
                    : null,
                id_area_tic: activateSoporte?.id_area_tic
                    ? activateSoporte?.id_area_tic?.toString()
                    : null,
                incidente: activateSoporte?.incidente
                    ? activateSoporte?.incidente
                    : "",
                solucion: activateSoporte?.solucion
                    ? activateSoporte?.solucion
                    : "",
                id_equipo: activateSoporte?.id_equipo
                    ? activateSoporte?.id_equipo?.toString()
                    : null,
                fecha_ini: new Date(activateSoporte?.fecha_ini),
                fecha_fin: new Date(activateSoporte?.fecha_fin),

                activo_informatico: activateSoporte?.id_equipo ? true : false,
            });
            return;
        }
    }, [activateSoporte]);

    useEffect(() => {
        if (activateSoporte === null) {
            if (!role) {
                startLoadTecnicos(usuario.cdgo_usrio);
                form.setFieldValue(
                    "id_usu_tecnico_asig",
                    usuario?.cdgo_usrio.toString()
                );
                return;
            }
        }

        startLoadTecnicos();

        return () => {
            clearTecnicos();
        };
    }, [role, isOpenModalCreateSoporte]);

    useEffect(() => {
        if (isOpenModalCreateSoporte) {
            startLoadUsersGeneral({});
            form.setFieldValue(
                "id_usu_recibe",
                activateSoporte?.id_usu_recibe
                    ? activateSoporte?.id_usu_recibe.toString()
                    : null
            );
            /* if (id_direccion === null) {
                form.setFieldValue("id_usu_recibe", null);
                return;
            } */
            return;
        }

        return () => {
            clearUsers();
        };
    }, [isOpenModalCreateSoporte]);

    useEffect(() => {
        if (id_usu_recibe !== null) {
            const direccion = users?.find(
                (user) => user.cdgo_usrio == id_usu_recibe
            );
            //console.log(direccion?.cdgo_dprtmnto.toString());
            form.setFieldValue(
                "id_direccion",
                direccion
                    ? direccion?.cdgo_dprtmnto.toString()
                    : activateSoporte?.id_direccion.toString()
            );
            return;
        }
        form.setFieldValue("id_direccion", null);
    }, [id_usu_recibe]);

    const handleCloseModal = () => {
        setActivateSoporte(null);
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
            closeOnClickOutside={false}
            closeOnEscape={false}
            position="right"
            size="lg"
            title="Crear soporte"
        >
            <FormCreateSoporte form={form} role={role} />
        </Drawer>
    );
};
