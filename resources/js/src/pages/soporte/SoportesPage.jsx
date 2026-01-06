import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    FilterFormSoportes,
    TextSection,
    TitlePage,
    SoportesTable,
    BtnAddActions,
    ModalSolicitudAdminSoporte,
    ModalCreateSoporte,
    ModalAsignarSoporte,
    ModalAnularSoporte,
    ModalDiagnostico,
} from "../../components";
import {
    useDireccionStore,
    useEstadoStore,
    useSoporteStore,
    useStorageField,
    useTitlePage,
    useUiSoporte,
} from "../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconDeviceImacUp, IconMessageUp } from "@tabler/icons-react";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const SoportesPage = () => {
    useTitlePage("Helpdesk | Soportes");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadEstados } = useEstadoStore();
    const { loadPDF, soportes, message, errores, clearSoportes } =
        useSoporteStore();
    const { modalActionAddSolicitud, modalActionCreateSoporte } =
        useUiSoporte();
    const { clearStorageFields } = useStorageField();

    const form = useForm({
        initialValues: {
            fecha_inicio: null,
            fecha_fin: null,
            anio: new Date(),
            id_direccion: null,
            numero_sop: "",
            id_estado: [],
            switch_role: false,
            id_usu_tecnico_asig: usuario.cdgo_usrio,
        },
        validate: {
            anio: isNotEmpty("Por favor ingresar el año"),
            fecha_fin: (value, values) => {
                // Solo validar si ambas fechas están presentes
                if (!values.fecha_inicio || !value) return null;

                const anioInicio = dayjs(values.fecha_inicio).year();
                const anioFin = dayjs(value).year();

                if (anioInicio !== anioFin) {
                    return "El rango de fechas no puede cruzar años";
                }

                if (dayjs(values.fecha_inicio).isAfter(dayjs(value))) {
                    return "La fecha final debe ser posterior a la fecha inicial";
                }

                return null;
            },
        },
        transformValues: (values) => ({
            ...values,
            fecha_inicio: dayjs(values.fecha_inicio).isValid()
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: dayjs(values.fecha_fin).isValid()
                ? dayjs(values.fecha_fin).add(1, "day").format("YYYY-MM-DD")
                : null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
            anio: values.anio.getFullYear(),
            id_estado: values.id_estado.map((id) => Number(id)),
        }),
    });

    const { switch_role } = form.values;

    const handleOpenModalSolicitud = () => {
        modalActionAddSolicitud(1);
    };

    const handleOpenModalSoporte = () => {
        //console.log("clic");
        modalActionCreateSoporte(1);
    };

    useEffect(() => {
        startLoadDirecciones();
        startLoadEstados();

        return () => {
            clearDirecciones();
            clearSoportes();
            clearStorageFields();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#094293",
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        if (loadPDF === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando loadPDF es false
        }
    }, [loadPDF]);

    const menuActions = [
        {
            label: "Nueva Solicitud",
            icon: IconMessageUp,
            onClick: handleOpenModalSolicitud,
            color: "teal",
        },
        {
            label: "Nuevo Soporte",
            icon: IconDeviceImacUp,
            onClick: handleOpenModalSoporte,
            color: "pink",
        },
    ];

    return (
        <Container size="xl">
            <Group justify="space-between">
                <div>
                    <TitlePage order={2}>Gestión De Soportes</TitlePage>
                    <TextSection fw={700} tt="" fz={16}>
                        Tienes {soportes.length ?? 0} soportes
                    </TextSection>
                </div>
                {usuario.role_id === 1 ? (
                    <BtnAddActions actions={menuActions}>
                        Crear nuevo
                    </BtnAddActions>
                ) : null}
            </Group>
            <Divider my="md" />
            <FilterFormSoportes form={form} />
            {soportes.length !== 0 ? <SoportesTable /> : null}
            <ModalSolicitudAdminSoporte />
            <ModalCreateSoporte role={switch_role} />
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico option={2} />
        </Container>
    );
};

export default SoportesPage;
