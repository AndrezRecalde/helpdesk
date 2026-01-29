import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
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
    useStorageField,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import { IconChevronsRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ListPermisosAdminPage = () => {
    useTitlePage("Gestionar Permisos - Intranet");
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersExtrict, clearUsers } = useUsersStore();
    const {
        isLoading,
        startLoadPermisos,
        permisos,
        clearPermisos,
        message,
        errores,
        isExport,
    } = usePermisoStore();
    const { setStoragePermisoFields } = useStorageField();
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            anio: dayjs(),
            fecha_inicio: null,
            fecha_fin: null,
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
            fecha_inicio: values.fecha_inicio
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: values.fecha_fin
                ? dayjs(values.fecha_fin).format("YYYY-MM-DD")
                : null,
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
        navigate("/intranet/permiso");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        setStoragePermisoFields(form.getTransformedValues());
        startLoadPermisos(form.getTransformedValues());
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Lista de permisos</TitlePage>
                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleNavigate}
                >
                    Crear permiso
                </BtnSection>
            </Group>
            <Divider my="md" />
            <FilterPermisoAdmin
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                title="Filtrar permisos"
            />
            {permisos.length !== 0 ? <PermisosTable /> : null}
            <ModalAnularPermiso />
        </Container>
    );
};

export default ListPermisosAdminPage;
