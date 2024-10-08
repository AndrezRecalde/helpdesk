import { useCallback, useEffect, useMemo } from "react";
import { Box, Container, LoadingOverlay } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMantineReactTable } from "mantine-react-table";
import {
    ActionReportPDF,
    FilterFormSearchDates,
    MenuTable_E,
    ModalActividad,
    TableContent,
    TitlePage,
} from "../../components";
import { useActividadStore, useTitlePage, useUiActividad } from "../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const ListActividadesPage = () => {
    useTitlePage("Helpdesk | Mis Actividades");
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
    });

    return (
        <Container size="xl" my="md">
            <TitlePage order={2}>
                Lista de actividades
            </TitlePage>
            <LoadingOverlay
                visible={loadPDF}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />

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
