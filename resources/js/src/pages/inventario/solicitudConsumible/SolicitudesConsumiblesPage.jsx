import { useEffect } from "react";
import { Container, Stack, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { YearPickerInput } from "@mantine/dates";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { TitlePage } from "../../../components";
import { SolicitudesConsumiblesTable } from "../../../components/inventario/solicitudConsumible/table/SolicitudesConsumiblesTable";
import { SolicitudConsumibleModal } from "../../../components/inventario/solicitudConsumible/modal/SolicitudConsumibleModal";
import { DetalleSolicitudModal } from "../../../components/inventario/solicitudConsumible/modal/DetalleSolicitudModal";
import {
    useSolicitudConsumibleStore,
    useUiSolicitudConsumible,
    useDireccionStore,
    useUsersStore,
    useInvConsumibleStore,
    useTitlePage,
} from "../../../hooks";
import Swal from "sweetalert2";

const SolicitudesConsumiblesPage = () => {
    useTitlePage("Solicitudes de Consumibles - Helpdesk");
    const {
        isLoading,
        isExporting,
        solicitudes,
        pagination,
        activeSolicitud,
        startLoadSolicitudes,
        startExportPDF,
        setActiveSolicitud,
        clearActiveSolicitud,
    } = useSolicitudConsumibleStore();

    const { modalActionSolicitud, modalActionDetalle, isOpenModalDetalle } =
        useUiSolicitudConsumible();
    const { startLoadDirecciones } = useDireccionStore();
    const { startLoadUsers } = useUsersStore();
    const { startLoadInvConsumibles } = useInvConsumibleStore();

    const form = useForm({
        initialValues: {
            departamento_id: null,
            anio: new Date(),
            page: 1,
        },
    });

    useEffect(() => {
        // Cargar datos iniciales
        startLoadDirecciones();
        startLoadUsers({});
        startLoadInvConsumibles({});
        handleLoadSolicitudes();
    }, []);

    const handleLoadSolicitudes = (customValues = {}) => {
        const filters = {
            ...form.values,
            ...customValues,
            anio:
                customValues.anio?.getFullYear() ||
                form.values.anio?.getFullYear(),
        };
        startLoadSolicitudes(filters);
    };

    const handleViewDetalle = (solicitud) => {
        setActiveSolicitud(solicitud);
        modalActionDetalle(true);
    };

    const handleExportPDF = async (id) => {
        await startExportPDF(id);
    };

    const handleRefresh = () => {
        handleLoadSolicitudes();
    };

    const handlePageChange = (page) => {
        form.setFieldValue("page", page);
        handleLoadSolicitudes({ page });
    };

    //Cargar isExporting con Swal
    useEffect(() => {
        if (isExporting) {
            Swal.fire({
                title: "Generando PDF...",
                text: "Por favor espere",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close();
        }
    }, [isExporting]);

    return (
        <Container size="xl" mt="md">
            <Stack gap="lg">
                <Group justify="space-between">
                    <TitlePage order={2}>Solicitudes de Consumibles</TitlePage>
                    <Group>
                        <Button
                            leftSection={<IconRefresh size={18} />}
                            variant="light"
                            onClick={handleRefresh}
                        >
                            Actualizar
                        </Button>
                        <Button
                            leftSection={<IconPlus size={18} />}
                            onClick={() => modalActionSolicitud(true)}
                        >
                            Nueva Solicitud
                        </Button>
                    </Group>
                </Group>

                {/* Filtros */}
                <Group>
                    <YearPickerInput
                        label="Año"
                        placeholder="Seleccione año"
                        {...form.getInputProps("anio")}
                        onChange={(value) => {
                            form.setFieldValue("anio", value);
                            form.setFieldValue("page", 1);
                            handleLoadSolicitudes({ anio: value, page: 1 });
                        }}
                        w={150}
                    />
                </Group>

                {/* Tabla */}
                <SolicitudesConsumiblesTable
                    isLoading={isLoading}
                    solicitudes={solicitudes}
                    pagination={pagination}
                    onViewDetalle={handleViewDetalle}
                    onExportPDF={handleExportPDF}
                    onPageChange={handlePageChange}
                />
            </Stack>

            {/* Modales */}
            <SolicitudConsumibleModal />
            <DetalleSolicitudModal
                opened={isOpenModalDetalle}
                onClose={() => {
                    modalActionDetalle(false);
                    clearActiveSolicitud();
                }}
                solicitud={activeSolicitud}
            />
        </Container>
    );
};

export default SolicitudesConsumiblesPage;
