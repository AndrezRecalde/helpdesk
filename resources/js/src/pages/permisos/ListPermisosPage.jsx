import { useEffect, useCallback, useMemo, useRef } from "react";
import { Container, Divider, Group, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    BtnSection,
    FilterPermiso,
    ModalAnularPermiso,
    PermisosTable,
    TitlePage,
} from "../../components";
import { usePermisoStore, useStorageField, useTitlePage } from "../../hooks";
import Swal from "sweetalert2";
import { IconChevronsRight, IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ListPermisosPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const navigate = useNavigate();
    const hasLoadedInitialData = useRef(false);

    // Memoizar el usuario
    const usuario = JSON.parse(localStorage.getItem("service_user"));

    const {
        isLoading,
        startLoadPermisos,
        clearPermisos,
        permisos,
        message,
        errores,
        isExport,
    } = usePermisoStore();

    const { setStoragePermisoFields } = useStorageField();

    const form = useForm({
        initialValues: {
            anio: new Date(),
            idper_permisos: "",
        },
        validate: {
            anio: (value) =>
                value instanceof Date && !isNaN(value)
                    ? null
                    : "Fecha inválida",
            idper_permisos: (value) =>
                value === "" || (!isNaN(Number(value)) && Number(value) > 0)
                    ? null
                    : "ID de permiso inválido",
        },
    });

    useEffect(() => {
        // Solo ejecutar una vez
        if (hasLoadedInitialData.current) return;

        if (!usuario?.cdgo_usrio) {
            console.warn("Usuario no encontrado en localStorage");
            return;
        }

        hasLoadedInitialData.current = true;

        // Cargar permisos del año actual
        startLoadPermisos({
            anio: new Date().getFullYear(),
            id_usu_pide: usuario.cdgo_usrio,
        });

        // Cleanup al desmontar
        return () => {
            clearPermisos();
        };
    }, []);

    useEffect(() => {
        // Si isExport está activo, mostrar el loading
        if (isExport) {
            Swal.fire({
                icon: "info",
                title: "Exportando...",
                text: "Un momento por favor, se está exportando",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // Función de limpieza para cerrar cuando isExport cambie
            return () => {
                Swal.close();
            };
        }

        // Si hay errores, mostrarlos
        if (errores) {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: errores,
                confirmButtonText: "Entendido",
            });
            return; // No hay limpieza, el usuario cierra manualmente
        }

        // Si hay un mensaje, mostrarlo
        if (message?.msg) {
            Swal.fire({
                icon: message.status || "success",
                title: message.status === "success" ? "¡Éxito!" : "Información",
                text: message.msg,
                confirmButtonText: "Aceptar",
                timer: 3000,
                timerProgressBar: true,
            });
            return; // No hay limpieza, se cierra con timer o manualmente
        }

        // Si no hay nada que mostrar, cerrar cualquier Swal abierto
        //Swal.close();
    }, [message, errores, isExport]);

    const handleNavigate = useCallback(() => {
        navigate("/intranet/permiso");
    }, [navigate]);

    const handleSubmit = useCallback(
        (e) => {
            e?.preventDefault();

            const validation = form.validate();
            if (validation.hasErrors) {
                return;
            }

            const transformedValues = {
                anio:
                    form.values.anio?.getFullYear() || new Date().getFullYear(),
                idper_permisos: form.values.idper_permisos
                    ? Number(form.values.idper_permisos)
                    : null,
                id_usu_pide: usuario?.cdgo_usrio || null,
            };

            // Guardar en localStorage
            setStoragePermisoFields(transformedValues);

            // Cargar permisos
            startLoadPermisos(transformedValues);
        },
        [
            form.values,
            usuario?.cdgo_usrio,
            setStoragePermisoFields,
            startLoadPermisos,
        ]
    );

    // Manejo de usuario no autenticado
    if (!usuario?.cdgo_usrio) {
        return (
            <Container size="xl">
                <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Error de autenticación"
                    color="red"
                >
                    No se pudo cargar la información del usuario. Por favor,
                    inicia sesión nuevamente.
                </Alert>
            </Container>
        );
    }

    const currentYear =
        form.values.anio?.getFullYear() || new Date().getFullYear();

    return (
        <Container size="xl">
            <Group justify="space-between" mb="md">
                <TitlePage order={2}>Mis permisos - {currentYear}</TitlePage>
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
                isLoading={isLoading}
            />

            {permisos?.length > 0 && <PermisosTable />}

            {!isLoading && permisos?.length === 0 && (
                <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Sin resultados"
                    color="blue"
                    mt="md"
                >
                    No se encontraron permisos con los filtros aplicados.
                </Alert>
            )}

            <ModalAnularPermiso />
        </Container>
    );
};

export default ListPermisosPage;
