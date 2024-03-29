import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
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
    BtnSection,
} from "../../components";
import { useDireccionStore, useSoporteStore, useTitlePage, useUiSoporte } from "../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export const SoportesPage = () => {
    useTitlePage("Helpdesk | Soportes");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { soportes, message, errores, clearSoportes } = useSoporteStore();
    const { modalActionAddSolicitud, modalActionCreateSoporte } =
        useUiSoporte();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            anio: dayjs(),
            id_direccion: null,
            numero_sop: "",
            switch_role: false,
            id_usu_tecnico_asig: usuario.cdgo_usrio,
        },
        validate: {
            anio: isNotEmpty("Por favor ingresar el año"),
        },
        transformValues: (values) => ({
            ...values,
            id_direccion: Number(values.id_direccion) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
        }),
    });

    const { switch_role } = form.values;

    const handleOpenModalSolicitud = () => {
        modalActionAddSolicitud(1);
    };

    const handleOpenModalSoporte = () => {
        console.log("clic");
        modalActionCreateSoporte(1);
    };

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
            clearSoportes();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
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
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Gestión De Soportes
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes {soportes.length ?? 0} soportes
                </TextSection>
                {usuario.role_id === 1 ? (
                    <BtnAddActions
                        handleOpenModalSolicitud={handleOpenModalSolicitud}
                        handleOpenModalSoporte={handleOpenModalSoporte}
                    >
                        Crear nuevo
                    </BtnAddActions>
                ) : (
                    <BtnSection handleAction={handleOpenModalSoporte}>
                        Agregar soporte
                    </BtnSection>
                )}
            </Group>
            <FilterFormSoportes form={form} />
            {soportes.length !== 0 ? (
                <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                    <Card.Section>
                        <SoportesTable />
                    </Card.Section>
                </Card>
            ) : null}
            <ModalSolicitudAdminSoporte />
            <ModalCreateSoporte role={switch_role} />
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico />
        </Container>
    );
};
