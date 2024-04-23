import { useEffect } from "react";
import { Container } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    FilterPermisoAdmin,
    ModalAnularPermiso,
    PermisosTable,
    TitlePage,
} from "../../components";
import { useDireccionStore, usePermisoStore, useTitlePage, useUsersStore } from "../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const ListPermisosAdminPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { startLoadPermisos, permisos, clearPermisos, message, errores } =
        usePermisoStore();
    const form = useForm({
        initialValues: {
            anio: dayjs(),
            id_direccion_pide: null,
            id_usu_pide: null,
            idper_permisos: "",
        },
        validate: {
            anio: isNotEmpty("Por favor ingresar el año"),
        },
        transformValues: (values) => ({
            ...values,
            id_direccion_pide: Number(values.id_direccion_pide),
            id_usu_pide: Number(values.id_usu_pide) || null,
            idper_permisos: Number(values.idper_permisos) || null
        }),
    });

    const { id_direccion_pide } = form.values;

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
            clearPermisos();
            form.reset();
        };
    }, []);

    useEffect(() => {
        startLoadUsersExtrict(id_direccion_pide);

        return () => {
            clearUsers();
        };
    }, [id_direccion_pide]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadPermisos(form.getTransformedValues());
    };

    return (
        <Container size="md">
            <TitlePage order={2} size="h2">
                Lista de permisos - Administrador
            </TitlePage>
            <FilterPermisoAdmin
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar permisos"
            />
            {permisos.length !== 0 ? <PermisosTable /> : null}
            <ModalAnularPermiso />
        </Container>
    );
};
