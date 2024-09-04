import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    BtnSection,
    FilterPermisoAdmin,
    ModalAnularPermiso,
    PermisosTable,
    TitlePage,
} from "../../components";
import {
    useDireccionStore,
    usePermisoStore,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { IconChevronsRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ListPermisosAdminPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const { startLoadPermisos, permisos, clearPermisos, message, errores } =
        usePermisoStore();
    const navigate = useNavigate();
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
            //id_direccion_pide: Number(values.id_direccion_pide),
            id_usu_pide: Number(values.id_usu_pide) || null,
            idper_permisos: Number(values.idper_permisos) || null,
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

    const handleNavigate = () => {
        navigate("/gerencia/permiso");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadPermisos(form.getTransformedValues());
    };

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2} size="h2">
                    Lista de permisos - Administrador
                </TitlePage>
                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleNavigate}
                >
                    Crear permiso
                </BtnSection>
            </Group>
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
