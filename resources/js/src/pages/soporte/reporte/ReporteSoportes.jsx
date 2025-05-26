import { useEffect, useMemo } from "react";
import { Container, Divider } from "@mantine/core";
import {
    ActionReportPDF,
    FilterFormSearchDates,
    TableContent,
    TitlePage,
} from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useSoporteStore, useTitlePage } from "../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ReporteSoportes = () => {
    useTitlePage("Helpdesk | Reporte");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        isLoading,
        loadPDF,
        soportes,
        startLoadActividadesSoporte,
        startExportActividadesSoportes,
        clearSoportes,
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
        transformValues: (values) => ({
            fecha_inicio: dayjs(values.fecha_inicio) || "",
            fecha_fin: dayjs(values.fecha_fin).add(1, "day") || "",
        }),
    });

    const { fecha_inicio, fecha_fin } = form.values;

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop", //normal accessorKey
                header: "No. Soporte",
                size: 80
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"),
                header: "Fecha",
                size: 80
            },
            {
                accessorKey: "incidente", //normal accessorKey
                header: "Actividad realizada",
            },
            {
                accessorFn: (row) => (
                    <div dangerouslySetInnerHTML={{ __html: row.solucion }} />
                ),
                header: "Solucion de la actividad",
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
            clearSoportes();
        };
    }, [fecha_inicio, fecha_fin]);

    useEffect(() => {
        return () => {
            clearSoportes();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).format("YYYY-MM-DD");
        const fecha_f = dayjs(fecha_fin).add(1, "days").format("YYYY-MM-DD");
        startLoadActividadesSoporte(fecha_i, fecha_f, usuario.cdgo_usrio);
    };

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).format("YYYY-MM-DD");
        const fecha_f = dayjs(fecha_fin).add(1, "days").format("YYYY-MM-DD");
        startExportActividadesSoportes(fecha_i, fecha_f, usuario.cdgo_usrio);
    };

    const table = useMantineReactTable({
        columns,
        data: soportes,
        renderTopToolbarCustomActions: ({ table }) => (
            <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
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

    return (
        <Container size="xl">
            <TitlePage order={2}>Reporte de soportes</TitlePage>
            <Divider my="md" />
            <FilterFormSearchDates
                title="Filtrar lista de mis soportes"
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
            {soportes.length !== 0 ? <TableContent table={table} /> : null}
        </Container>
    );
};

export default ReporteSoportes;
