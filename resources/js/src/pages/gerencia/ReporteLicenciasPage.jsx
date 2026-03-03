import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Container,
    Divider,
    Fieldset,
    SimpleGrid,
    Select,
    Box,
    Group,
    Button,
} from "@mantine/core";
import { BtnSubmit, TitlePage, TextSection } from "../../components";
import { useContratoStore, useTitlePage } from "../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
    IconAlertCircle,
    IconSearch,
    IconFileTypePdf,
    IconFileTypeXls,
} from "@tabler/icons-react";
import classes from "../../assets/styles/modules/layout/input/LabelsInputs.module.css";

const ReporteLicenciasPage = () => {
    useTitlePage("Reporte de Instalación de Licencias - Helpdesk");
    const {
        isLoading,
        contratos,
        startLoadContratos,
        instalaciones,
        startLoadInstalaciones,
        startExportLicenciasPdf,
        startExportLicenciasExcel,
        clearInstalaciones,
        message,
        errores,
    } = useContratoStore();

    const [licenseOptions, setLicenseOptions] = useState([]);

    const form = useForm({
        initialValues: {
            id_contrato: null,
            id_licencia: null,
        },
        validate: {
            id_contrato: isNotEmpty("Por favor seleccione un contrato"),
        },
    });

    const { id_contrato, id_licencia } = form.values;

    // Fetch Contracts on mount
    useEffect(() => {
        startLoadContratos();
        return () => {
            clearInstalaciones();
        };
    }, []);

    // Get only top 5 contracts for the select
    const contractOptions = useMemo(() => {
        if (!contratos) return [];
        return contratos.slice(0, 5).map((c) => ({
            value: c.id_contrato.toString(),
            label: c.codigo_contrato,
        }));
    }, [contratos]);

    // When Contract changes, update License Options
    useEffect(() => {
        if (id_contrato) {
            const selectedContract = contratos.find(
                (c) => c.id_contrato.toString() === id_contrato.toString(),
            );
            if (selectedContract && selectedContract.licencias) {
                const opts = selectedContract.licencias.map((l) => ({
                    value: l.id_licencia.toString(),
                    label: l.nombre,
                }));
                // Add an option "Todas las Licencias"
                setLicenseOptions([
                    { value: "ALL", label: "Todas las licencias" },
                    ...opts,
                ]);
                // Set default to ALL
                form.setFieldValue("id_licencia", "ALL");
            } else {
                setLicenseOptions([]);
                form.setFieldValue("id_licencia", null);
            }
        } else {
            setLicenseOptions([]);
            form.setFieldValue("id_licencia", null);
        }
    }, [id_contrato]);

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_instalacion).format("YYYY-MM-DD"),
                header: "Fecha Instalación",
                size: 100,
            },
            {
                accessorFn: (row) => row.equipo?.codigo_nuevo,
                header: "Código Equipo",
                size: 100,
            },
            {
                accessorFn: (row) => row.equipo?.usuario?.nmbre_usrio,
                header: "Custodio",
            },
            {
                accessorFn: (row) => row.licencia?.contrato?.codigo_contrato,
                header: "Contrato",
                size: 120,
            },
            {
                accessorFn: (row) => row.licencia?.nombre,
                header: "Tipo Licencia",
                size: 120,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.licencia?.fecha_vencimiento).format("YYYY-MM-DD"),
                header: "Vencimiento Licencia",
                size: 100,
            },
            {
                accessorFn: (row) => row.soporte?.numero_sop,
                header: "No. Soporte",
                size: 100,
            },
        ],
        [instalaciones],
    );

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: true,
                confirmButtonColor: "#38d17b",
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                text: errores,
                showConfirmButton: false,
                confirmButtonColor: "#38d17b",
            });
            return;
        }
    }, [errores]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const licId = id_licencia === "ALL" ? null : id_licencia;
        startLoadInstalaciones(id_contrato, licId);
    };

    const table = useMantineReactTable({
        columns,
        data: instalaciones || [],
        state: { isLoading },
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
        initialState: {
            density: "xs",
        },
    });

    return (
        <Container size="xl">
            <TitlePage order={2}>Reporte de Instalación de Licencias</TitlePage>
            <Divider my="md" />

            <Fieldset
                mt={20}
                mb={20}
                legend={
                    <TextSection tt="" fw={500} fz={16}>
                        Filtrar por Contrato y Licencia
                    </TextSection>
                }
            >
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }} mt={10}>
                        <Select
                            label="Seleccione un Contrato (Últimos 5)"
                            placeholder="Elija un contrato"
                            data={contractOptions}
                            classNames={classes}
                            allowDeselect={false}
                            {...form.getInputProps("id_contrato")}
                        />
                        <Select
                            label="Seleccione Tipo de Licencia"
                            placeholder="Elija una licencia"
                            data={licenseOptions}
                            disabled={
                                !id_contrato || licenseOptions.length === 0
                            }
                            classNames={classes}
                            allowDeselect={false}
                            {...form.getInputProps("id_licencia")}
                        />
                    </SimpleGrid>

                    <Group justify="flex-start" mt="md">
                        <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                            Buscar
                        </BtnSubmit>

                        <Button
                            leftSection={<IconFileTypePdf size={18} />}
                            color="red"
                            variant="light"
                            onClick={() =>
                                startExportLicenciasPdf(
                                    id_contrato,
                                    id_licencia === "ALL" ? null : id_licencia,
                                )
                            }
                            disabled={
                                !instalaciones || instalaciones.length === 0
                            }
                            loading={isLoading}
                        >
                            Exportar PDF
                        </Button>

                        <Button
                            leftSection={<IconFileTypeXls size={18} />}
                            color="green"
                            variant="light"
                            onClick={() =>
                                startExportLicenciasExcel(
                                    id_contrato,
                                    id_licencia === "ALL" ? null : id_licencia,
                                )
                            }
                            disabled={
                                !instalaciones || instalaciones.length === 0
                            }
                            loading={isLoading}
                        >
                            Exportar Excel
                        </Button>
                    </Group>
                </Box>
            </Fieldset>

            {instalaciones && instalaciones.length !== 0 ? (
                <MantineReactTable table={table} />
            ) : (
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="No se encontraron instalaciones"
                    color="blue"
                    variant="light"
                >
                    Aún no ha realizado ninguna búsqueda o no existen registros
                    para los filtros seleccionados.
                </Alert>
            )}
        </Container>
    );
};

export default ReporteLicenciasPage;
