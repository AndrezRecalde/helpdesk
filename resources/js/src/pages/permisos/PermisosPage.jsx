import { useEffect } from "react";
import { Card, Container, Divider, Group, LoadingOverlay } from "@mantine/core";
import { BtnSection, FormSolicitudPermiso, TitlePage } from "../../components";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    useDirectorStore,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import { IconChevronsRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../layouts/appshell/navbar/navlinks/navLinks";

const PermisosPage = () => {
    useTitlePage("Helpdesk | Permisos");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const {
        startLoadDirectores,
        directores,
        isLoading: loadDirectores,
        clearDirectores,
    } = useDirectorStore();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            id_direccion_pide: null,
            id_usu_pide: null,
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
            id_direccion_pide: isNotEmpty("Por favor seleccione la direccion"),
            id_usu_pide: isNotEmpty("Por favor seleccione usuario"),
            id_tipo_motivo: isNotEmpty("Por favor seleccione el motivo"),
            fecha: isNotEmpty("Por favor seleccione la fecha"),
            id_jefe_inmediato: isNotEmpty("Por favor seleccione al jefe"),
            hora_1: isNotEmpty("Seleccione las horas a solicitar"),
            hora_2: isNotEmpty("Seleccione las horas a solicitar"),
            per_observaciones: hasLength(
                { min: 0, max: 200 },
                "La observación admite un minimo de 5 caracteres y máximo 200 caracteres"
            ),
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

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
        };
    }, []);

    useEffect(() => {
        startLoadUsersExtrict(id_direccion_pide);
        form.setFieldValue("id_usu_pide", null);

        return () => {
            clearUsers();
        };
    }, [id_direccion_pide]);

    useEffect(() => {
        if (id_direccion_pide !== null) {
            startLoadDirectores({ cdgo_dprtmnto: id_direccion_pide });
            form.setFieldValue("id_jefe_inmediato", null);
            return;
        }

        return () => {
            clearDirectores();
        };
    }, [id_direccion_pide]);

    useEffect(() => {
        if (usuario.role_id !== 1) {
            form.setValues({
                id_direccion_pide: usuario.cdgo_dprtmnto.toString(),
                id_usu_pide: usuario.cdgo_usrio.toString(),
                id_jefe_inmediato: directores[0]?.id_jefe.toString(),
            });
            return;
        }
    }, [id_direccion_pide, directores]);

    const handleNavigate = () => {
        usuario.role === Roles.GERENTE
            ? navigate("/gerencia/ver-permisos")
            : usuario.role === Roles.TECNICO
            ? navigate("/tecnico/ver-permisos")
            : navigate("/staff/general/ver-permisos");
    };

    return (
        <Container size="md">
            <Group justify="space-between">
                <TitlePage order={2}>
                    Crear Permiso
                </TitlePage>
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
                    visible={
                        usuario.role_id !== 1 && loadDirectores ? true : false
                    }
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <FormSolicitudPermiso
                    form={form}
                    disabled={usuario.role_id === 1 ? false : true}
                />
            </Card>
        </Container>
    );
};


export default PermisosPage;
