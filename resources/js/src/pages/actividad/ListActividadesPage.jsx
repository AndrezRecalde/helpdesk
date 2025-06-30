import { useCallback, useEffect, useMemo } from "react";
import { Container, Divider, Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMantineReactTable } from "mantine-react-table";
import {
    ActionReportPDF,
    BtnSection,
    FilterFormSearchDates,
    MenuTable_E,
    ModalActividad,
    TableContent,
    TitlePage,
} from "../../components";
import { useActividadStore, useTitlePage, useUiActividad } from "../../hooks";
import { IconChevronsRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ListActividadesPage = () => {
    useTitlePage("Helpdesk | Mis Actividades");
    const navigate = useNavigate();
    const srv_user = JSON.parse(localStorage.getItem("service_user"));
    const { modalActionActividad } = useUiActividad();

    const {
        isLoading,
        tableLoad,
        loadPDF,
        actividades,
        startLoadActividades,
        startExportPDFActividades,
        startClearActividades,
        setActivateActividad,
        errores,
        message,
    } = useActividadStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
    });

    const { fecha_inicio, fecha_fin } = form.values;

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => row.fecha, //normal accessorKey
                header: "Fecha",
                size: 80,
            },
            {
                accessorFn: (row) => (
                    <div dangerouslySetInnerHTML={{ __html: row.actividad }} />
                ),
                header: "Actividad",
                size: 200,
            },
            {
                accessorKey: "usuario", //normal accessorKey
                header: "Funcionario",
                size: 80,
            },
        ],
        [actividades]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadActividades(
            srv_user.cdgo_usrio,
            dayjs(fecha_inicio).format("YYYY-MM-DD"),
            dayjs(fecha_fin).format("YYYY-MM-DD")
        );
    };

    const handleEditActividad = useCallback(
        (selected) => {
            setActivateActividad(selected);
            modalActionActividad(1);
        },
        [actividades]
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("fecha_inicio") ||
            !errors.hasOwnProperty("fecha_fin")
        ) {
            startExportPDFActividades(
                srv_user.cdgo_usrio,
                dayjs(fecha_inicio).format("YYYY-MM-DD"),
                dayjs(fecha_fin).format("YYYY-MM-DD")
            );
        }
    };

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
        if (loadPDF === true) {
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
    }, [loadPDF]);

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, [fecha_inicio, fecha_fin]);

    useEffect(() => {
        return () => {
            startClearActividades();
        };
    }, []);

    const table = useMantineReactTable({
        columns,
        data: actividades,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
        ),
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEditActividad} />
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    const handleAction = () => {
        navigate("/intranet/agregar-actividad");
    };

    return (
        <Container size="xl" my="md">
            <Group justify="space-between">
                <TitlePage order={2}>Lista de actividades</TitlePage>

                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleAction}
                >
                    Crear actividad
                </BtnSection>
            </Group>
            <Divider my="md" />
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                title="Filtrar por fechas"
            />
            {tableLoad ? <TableContent table={table} /> : null}
            <ModalActividad fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
        </Container>
    );
};

export default ListActividadesPage;
