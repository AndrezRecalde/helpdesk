import { useEffect, useMemo } from "react";
import { Container, LoadingOverlay } from "@mantine/core";
import {
    ActionReportPDF,
    FilterFormSearchDates,
    TableContent,
    TitlePage,
} from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore } from "../../../hooks";
import Swal from "sweetalert2";
import { useMantineReactTable } from "mantine-react-table";

export const ReporteSoportes = () => {
    const {
        isLoading,
        loadPDF,
        soportes,
        startExportActividadesSoportes,
        message,
        errores,
    } = useSoporteStore();
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

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop", //normal accessorKey
                header: "No. Soporte",
            },
            {
                accessorKey: "fecha_ini",
                header: "Fecha",
            },
            {
                accessorKey: "incidente", //normal accessorKey
                header: "Actividad realizada",
            },
            {
                accessorKey: "usuario_recibe", //normal accessorKey
                header: "Usuario final",
            },
        ],
        [soportes]
    );

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
        console.log("clic");
    };

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        console.log("clic");
    };

    const table = useMantineReactTable({
        columns,
        data: soportes,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
        ),
    });

    return (
        <Container size="lg">
            <TitlePage order={2} size="h2">
                Reporte de soportes
            </TitlePage>
            <LoadingOverlay
                visible={loadPDF} //loadPDF
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />

            <FilterFormSearchDates
                title="Filtrar lista de mis soportes"
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading} //isLoading
            />
            {soportes.length !== 0 ? <TableContent table={table} /> : null}
        </Container>
    );
};
