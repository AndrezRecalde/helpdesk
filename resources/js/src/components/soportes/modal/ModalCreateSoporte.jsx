import { useEffect } from "react";
import { Drawer } from "@mantine/core";
import { FormCreateSoporte, TextSection } from "../../../components";
import {
    useEquipoStore,
    useEstadoStore,
    useSoporteStore,
    useTecnicoStore,
    useTipoSolicitudStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

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

    const convertToString = (value) => (value !== null && value !== undefined ? value.toString() : null);

    const form = useForm({
        initialValues: {
            id_estado: activateSoporte?.id_estado.toString() || "3",
            fecha_ini: new Date(),
            id_tipo_solicitud: activateSoporte?.id_tipo_solicitud || "1",
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
            solucion: hasLength(
                { min: 10, max: 600 },
                "La solución debe tener entre 10 y 500 caracteres"
            ),
            id_equipo: (value, values) =>
                values.id_tipo_soporte == 1 && value === null
                    ? "En soporte a hardware es obligatorio el código del activo"
                    : null,
        },
        transformValues: (values) => ({
            ...values,
            id_estado: Number(values.id_estado) || null,
            fecha_ini: new Date(values.fecha_ini),
            fecha_fin: new Date(values.fecha_fin) || null,
            id_tipo_solicitud: Number(values.id_tipo_solicitud) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
            id_direccion: Number(values.id_direccion),
            id_usu_recibe: Number(values.id_usu_recibe) || null,
            id_tipo_soporte: Number(values.id_tipo_soporte) || null,
            id_area_tic: Number(values.id_area_tic) || null,
            id_equipo: Number(values.id_equipo) || null,
        }),
    });

    const { id_usu_recibe } = form.values;

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

            const {
                id_estado,
                id_tipo_solicitud,
                numero_escrito,
                id_usu_tecnico_asig,
                id_direccion,
                id_usu_recibe,
                id_tipo_soporte,
                id_area_tic,
                incidente,
                solucion,
                id_equipo,
                fecha_ini,
                fecha_fin
            } = activateSoporte;

            form.setValues({
                ...activateSoporte,
                id_estado: convertToString(id_estado),
                id_tipo_solicitud: convertToString(id_tipo_solicitud),
                numero_escrito: numero_escrito || "",
                id_usu_tecnico_asig: convertToString(id_usu_tecnico_asig),
                id_direccion: id_direccion !== undefined && id_direccion !== null ? convertToString(id_direccion) : null,
                id_usu_recibe: convertToString(id_usu_recibe),
                id_tipo_soporte: convertToString(id_tipo_soporte),
                id_area_tic: convertToString(id_area_tic),
                incidente: incidente || "",
                solucion: solucion || "",
                id_equipo: convertToString(id_equipo),
                fecha_ini: fecha_ini ? new Date(fecha_ini) : null,
                fecha_fin: fecha_fin ? new Date(fecha_fin) : null,
                activo_informatico: id_equipo ? true : false,
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
            title={<TextSection tt="" fz={16} fw={700}>Crear soporte</TextSection>}
        >
            <FormCreateSoporte form={form} role={role} />
        </Drawer>
    );
};
