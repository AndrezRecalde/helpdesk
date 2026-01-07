import { useEffect, useMemo, useCallback, useRef } from "react";
import { Card, Container, Divider, Group, LoadingOverlay } from "@mantine/core";
import {
    AlertSection,
    BtnSection,
    FormSolicitudPermiso,
    TitlePage,
} from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useDirectorStore,
    usePermisoStore,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import { IconChevronsRight, IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../helpers/dictionary";
import Swal from "sweetalert2";

const PermisosPage = () => {
    useTitlePage("Helpdesk | Permisos");

    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const isInitialMount = useRef(true);

    const { message, errores, isExport, startCardPermigo } = usePermisoStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const {
        startLoadDirectores,
        directores,
        isLoading: loadDirectores,
        clearDirectores,
    } = useDirectorStore();

    const navigate = useNavigate();

    // Verificar si el usuario puede editar
    const canEdit = useMemo(
        () =>
            usuario.role === Roles.TIC_GERENTE ||
            usuario.role === Roles.NOM_ASISTENCIA,
        [usuario.role]
    );

    const form = useForm({
        initialValues: {
            id_direccion_pide: !canEdit
                ? usuario.cdgo_dprtmnto?.toString()
                : null,
            id_usu_pide: !canEdit ? usuario.cdgo_usrio?.toString() : null,
            id_tipo_motivo: "1",
            fecha: new Date(),
            per_fecha_salida: null,
            per_fecha_llegada: null,
            id_jefe_inmediato: null,
            hora_1: "",
            hora_2: "",
            per_observaciones: "",
        },
        validate: {
            id_direccion_pide: isNotEmpty("Por favor seleccione la dirección"),
            id_usu_pide: isNotEmpty("Por favor seleccione usuario"),
            id_tipo_motivo: isNotEmpty("Por favor seleccione el motivo"),
            fecha: isNotEmpty("Por favor seleccione la fecha"),
            id_jefe_inmediato: isNotEmpty("Por favor seleccione al jefe"),
            hora_1: (value, values) => {
                if (!value) return "Seleccione la hora de inicio";
                const hora1 = parseFloat(value);
                const hora2 = parseFloat(values.hora_2);
                if (hora2 && hora1 > hora2) {
                    return "La hora de inicio no puede ser mayor que la hora de fin";
                }
                return null;
            },
            hora_2: (value, values) => {
                if (!value) return "Seleccione la hora de fin";
                const hora1 = parseFloat(values.hora_1);
                const hora2 = parseFloat(value);
                if (hora1 && hora2 < hora1) {
                    return "La hora de fin no puede ser menor que la hora de inicio";
                }
                if (hora1 && hora2 - hora1 > 4) {
                    return "El intervalo entre las horas no debe exceder 4 horas";
                }
                return null;
            },
            per_observaciones: (value, values) => {
                const tipoMotivo = Number(values.id_tipo_motivo);

                if (tipoMotivo === 3) {
                    if (!value || value.trim().length === 0) {
                        return "Las observaciones son obligatorias para este tipo de motivo";
                    }
                    if (value.trim().length < 5) {
                        return "Las observaciones deben tener al menos 5 caracteres";
                    }
                }

                if (value && value.length > 350) {
                    return "Las observaciones no pueden exceder 350 caracteres";
                }

                return null;
            },
        },
        transformValues: (values) => ({
            ...values,
            id_direccion_pide: Number(values.id_direccion_pide),
            id_usu_pide: Number(values.id_usu_pide) || null,
            id_jefe_inmediato: Number(values.id_jefe_inmediato) || null,
            id_tipo_motivo: Number(values.id_tipo_motivo) || null,
        }),
    });

    const { id_direccion_pide } = form.values;

    // Cargar direcciones al montar
    useEffect(() => {
        startLoadDirecciones();
        return () => clearDirecciones();
    }, []);

    // Cargar usuarios cuando cambia la dirección
    useEffect(() => {
        if (id_direccion_pide) {
            startLoadUsersExtrict(id_direccion_pide);

            // Solo limpiar si es usuario privilegiado Y no es el montaje inicial
            if (canEdit && !isInitialMount.current) {
                form.setFieldValue("id_usu_pide", null);
            }
        }
        return () => clearUsers();
    }, [id_direccion_pide]);

    // Cargar directores cuando cambia la dirección
    useEffect(() => {
        if (id_direccion_pide !== null) {
            startLoadDirectores({ cdgo_dprtmnto: id_direccion_pide });

            // Solo limpiar si es usuario privilegiado Y no es el montaje inicial
            if (canEdit && !isInitialMount.current) {
                form.setFieldValue("id_jefe_inmediato", null);
            }
        }
        return () => clearDirectores();
    }, [id_direccion_pide]);

    // Setear el jefe inmediato automáticamente cuando se cargan los directores
    useEffect(() => {
        if (
            !canEdit &&
            directores.length > 0 &&
            !form.values.id_jefe_inmediato
        ) {
            form.setFieldValue(
                "id_jefe_inmediato",
                directores[0]?.id_jefe?.toString()
            );
        }
    }, [directores, canEdit]);

    // Marcar que ya no es el montaje inicial después del primer render
    useEffect(() => {
        isInitialMount.current = false;
    }, []);

    // Manejar mensaje de éxito
    useEffect(() => {
        if (message?.msg) {
            Swal.fire({
                text: `${message.msg}, ¿Deseas imprimir el permiso? `,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, imprimir!",
                cancelButtonText: "No, gracias",
            }).then((result) => {
                if (result.isConfirmed && message.idper_permisos) {
                    startCardPermiso(message.idper_permisos);
                }
            });
        }
    }, [message]);

    // Manejar errores
    useEffect(() => {
        if (errores) {
            Swal.fire({
                icon: "error",
                text: errores,
                showConfirmButton: true,
                confirmButtonColor: "#20c997",
            });
        }
    }, [errores]);

    // Manejar estado de exportación
    useEffect(() => {
        if (isExport) {
            Swal.fire({
                icon: "info",
                text: "Un momento por favor, se está exportando el documento.. .",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close();
        }
    }, [isExport]);

    const handleNavigate = useCallback(() => {
        navigate("/intranet/ver-permisos");
    }, [navigate]);

    return (
        <Container size="md">
            <Group justify="space-between" mb="md">
                <TitlePage order={2}>Crear Permiso</TitlePage>
                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleNavigate}
                >
                    Ver permisos
                </BtnSection>
            </Group>

            <Divider my="md" />

            <Card withBorder shadow="sm" radius="sm" mt={20} mb={20}>
                <LoadingOverlay
                    visible={!canEdit && loadDirectores}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <FormSolicitudPermiso form={form} disabled={!canEdit} />
            </Card>

            <AlertSection
                variant="light"
                color="orange. 7"
                title="Información"
                mt={5}
                mb={20}
                icon={IconInfoCircle}
            >
                <p>
                    <strong>
                        Si necesita cancelar un permiso, siga estos pasos:
                    </strong>
                </p>
                <p>
                    <strong>1.</strong> Vaya a la sección{" "}
                    <strong>"Ver Mis Permisos"</strong>.
                </p>
                <p>
                    <strong>2.</strong> Seleccione el permiso que desea anular y
                    haga la solicitud de cancelación.
                </p>
                <p>
                    <strong>3.</strong> Luego, diríjase a la oficina de{" "}
                    <strong>Recursos Humanos</strong> con la ficha impresa del
                    permiso para finalizar el proceso.
                </p>
            </AlertSection>
        </Container>
    );
};

export default PermisosPage;
