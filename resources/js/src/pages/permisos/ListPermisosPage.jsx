import { useEffect, useCallback, useRef, useMemo } from "react";
import { Container, Divider, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    AlertSection,
    BtnSection,
    CardInfoStatsUser,
    FilterPermiso,
    ModalAnularPermiso,
    PermisosTable,
    TitlePage,
} from "../../components";
import { usePermisoStore, useStorageField, useTitlePage } from "../../hooks";
import { IconChevronsRight, IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Constantes fuera del componente
const CURRENT_YEAR = new Date().getFullYear();
const STORAGE_KEY = "service_user";

// Utilidad para obtener el usuario de forma segura
const getStoredUser = () => {
    try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
};

// Validadores separados para mejor mantenibilidad
const validators = {
    anio: (value) =>
        value instanceof Date && !isNaN(value.getTime())
            ? null
            : "Fecha inválida",
    idper_permisos: (value) =>
        value === "" || (!isNaN(Number(value)) && Number(value) > 0)
            ? null
            : "ID de permiso inválido",
};

const ListPermisosPage = () => {
    useTitlePage("Helpdesk | Lista Permisos");
    const navigate = useNavigate();
    const hasLoadedInitialData = useRef(false);

    // Memoizar el usuario para evitar re-parseos innecesarios
    const usuario = useMemo(() => getStoredUser(), []);

    const {
        isLoading,
        startLoadPermisos,
        startLoadInfoPermisos,
        clearPermisos,
        permisos,
        activateStatsUsuarioPermiso,
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
        validate: validators,
    });

    // Efecto de inicialización
    useEffect(() => {
        if (hasLoadedInitialData.current || !usuario?.cdgo_usrio) return;

        hasLoadedInitialData.current = true;

        const loadInitialData = async () => {
            try {
                await Promise.all([
                    startLoadInfoPermisos(usuario.cdgo_usrio, CURRENT_YEAR),
                    startLoadPermisos({
                        anio: CURRENT_YEAR,
                        id_usu_pide: usuario.cdgo_usrio,
                    }),
                ]);
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };

        loadInitialData();

        return () => {
            clearPermisos();
        };
    }, []);

    // Efecto para manejar alertas y exportación
    useEffect(() => {
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
            return () => Swal.close();
        }

        if (errores) {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: errores,
                confirmButtonText: "Entendido",
            });
            return;
        }

        if (message?.msg) {
            Swal.fire({
                icon: message.status || "success",
                title: message.status === "success" ? "¡Éxito!" : "Información",
                text: message.msg,
                confirmButtonText: "Aceptar",
                timer: 3000,
                timerProgressBar: true,
            });
        }
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
                anio: form.values.anio?.getFullYear() || CURRENT_YEAR,
                idper_permisos: form.values.idper_permisos
                    ? Number(form.values.idper_permisos)
                    : null,
                id_usu_pide: usuario?.cdgo_usrio || null,
            };

            setStoragePermisoFields(transformedValues);
            startLoadInfoPermisos(usuario?.cdgo_usrio, transformedValues.anio);
            startLoadPermisos(transformedValues);
        },
        [form, usuario?.cdgo_usrio, setStoragePermisoFields, startLoadPermisos],
    );

    // Early return para usuario no autenticado
    if (!usuario?.cdgo_usrio) {
        return (
            <Container size="xl">
                <AlertSection
                    icon={IconAlertCircle}
                    title="Error de autenticación"
                    color="red"
                >
                    No se pudo cargar la información del usuario. Por favor,
                    inicia sesión nuevamente.
                </AlertSection>
            </Container>
        );
    }

    const currentYear = form.values.anio?.getFullYear() || CURRENT_YEAR;
    const hasPermisos = permisos?.length > 0;
    const showEmptyState = !isLoading && permisos?.length === 0;

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

            {(activateStatsUsuarioPermiso ?? activateStatsUsuarioPermiso?.total_permisos > 0) ? (
                <CardInfoStatsUser year={currentYear} />
            ) : null}

            <FilterPermiso
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar permisos"
                isLoading={isLoading}
            />

            {hasPermisos && (
                <>
                    <PermisosTable />
                </>
            )}

            {showEmptyState && (
                <AlertSection
                    icon={IconAlertCircle}
                    title="Sin resultados"
                    color="blue"
                    mt="md"
                >
                    No se encontraron permisos con los filtros aplicados.
                </AlertSection>
            )}

            <ModalAnularPermiso />
        </Container>
    );
};

export default ListPermisosPage;
