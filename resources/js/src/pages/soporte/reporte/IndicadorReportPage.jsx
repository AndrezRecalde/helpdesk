import { useEffect } from "react";
import { Container, Divider } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    CardIndicadores,
    FilterFormSearchDates,
    TitlePage,
} from "../../../components";
import { useIndicadorStore, useTitlePage } from "../../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const IndicadorReportPage = () => {
    useTitlePage("Helpdesk | Indicadores");
    const {
        isLoading,
        pageLoad,
        startLoadIndicadores,
        startExportPDFIndicadores,
        clearIndicadores,
        errores,
    } = useIndicadorStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
        },
        validate: {
            fecha_inicio: isNotEmpty(
                "Por favor seleccione una fecha de inicio"
            ),
            fecha_fin: isNotEmpty("Por favor seleccione una fecha de fin"),
        },
    });

    const { fecha_inicio, fecha_fin } = form.values;

    useEffect(() => {
        return () => {
            clearIndicadores();
        };
    }, []);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 5500,
            });
            return;
        }
    }, [errores]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).format("YYYY-MM-DD");
        const fecha_f = dayjs(fecha_fin).add(1, "days").format("YYYY-MM-DD");
        //console.log(fecha_i, fecha_f);
        startLoadIndicadores(fecha_i, fecha_f);
    };

    const handleExportPDF = (e) => {
        e.preventDefault();
        const fecha_i = dayjs(fecha_inicio).format("YYYY-MM-DD");
        const fecha_f = dayjs(fecha_fin).add(1, "days").format("YYYY-MM-DD");
        startExportPDFIndicadores(fecha_i, fecha_f);
    };

    return (
        <Container size="xxl">
            <TitlePage order={2}>
                Reporte de indicadores
            </TitlePage>
            <Divider my="md" />
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                title="Filtrar por fechas"
            />

            {pageLoad ? (
                <CardIndicadores handleExportPDF={handleExportPDF} />
            ) : null}
        </Container>
    );
};
