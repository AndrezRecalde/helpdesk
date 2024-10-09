import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    BtnSection,
    FilterPermiso,
    ModalAnularPermiso,
    PermisosTable,
    TitlePage,
} from "../../components";
import { usePermisoStore, useTitlePage } from "../../hooks";
import Swal from "sweetalert2";
import { IconChevronsRight } from "@tabler/icons-react";
import { Roles } from "../../layouts/appshell/navbar/navlinks/navLinks";
import { useNavigate } from "react-router-dom";

export const ListPermisosPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadPermisos, clearPermisos, permisos, message, errores } =
        usePermisoStore();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            idper_permisos: "",
        },
        transformValues: (values) => ({
            idper_permisos: Number(values.idper_permisos) || null,
        }),
    });

    const { idper_permisos } = form.values;

    useEffect(() => {
        if (usuario.role_id !== 1) {
            startLoadPermisos({ id_usu_pide: usuario?.cdgo_usrio });
        }
        return () => {
            clearPermisos();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: true,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                text: errores,
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    const handleNavigate = () => {
        usuario.role === Roles.GERENTE
            ? navigate("/gerencia/permiso")
            : usuario.role === Roles.TECNICO
            ? navigate("/tecnico/permiso")
            : navigate("/gad/d/permiso");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadPermisos({
            id_usu_pide: usuario?.cdgo_usrio,
            idper_permisos: idper_permisos,
        });
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>
                    Lista de permisos - {new Date().getFullYear()}
                </TitlePage>
                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleNavigate}
                >
                    Crear permiso
                </BtnSection>
            </Group>
            <FilterPermiso
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar permisos"
            />
            {permisos.length !== 0 ? <PermisosTable /> : null}
            <ModalAnularPermiso />
        </Container>
    );
};
