import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
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

const ListPermisosPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        startLoadPermisos,
        clearPermisos,
        permisos,
        message,
        errores,
        isExport,
    } = usePermisoStore();
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

    useEffect(() => {
        if (isExport === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isExport]);

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
        <Container size="xxl">
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
            <Divider my="md" />
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

export default ListPermisosPage;
