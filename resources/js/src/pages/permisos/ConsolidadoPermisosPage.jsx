import { useEffect, useState } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnSection,
    FilterDatesPermiso,
    PermisosConsolidadosTable,
    TitlePage,
} from "../../components";
import { IconPrinter } from "@tabler/icons-react";
import { usePermisoStore, useTitlePage } from "../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ConsolidadoPermisosPage = () => {
    useTitlePage("Consolidados de Permisos - Helpdesk");
    const {
        isExport,
        startLoadConsolidadosPermisos,
        startExportConsolidadosPermisos,
        clearPermisos,
    } = usePermisoStore();
    const [disabled, setDisabled] = useState(true);

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            motivo_id: "1",
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese la fecha de inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese la fecha final"),
            motivo_id: isNotEmpty("Por favor seleccione un motivo"),
        },
        transformValues: (values) => ({
            fecha_inicio: dayjs(values.fecha_inicio).format("YYYY-MM-DD") || "",
            fecha_fin: dayjs(values.fecha_fin).format("YYYY-MM-DD") || "",
            motivo_id: Number(values.motivo_id) || null,
        }),
    });

    const { fecha_inicio, fecha_fin } = form.values;

    useEffect(() => {
        if (fecha_inicio && fecha_fin) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        return () => {
            setDisabled(true);
        };
    }, [fecha_inicio, fecha_fin]);

    useEffect(() => {
        return () => clearPermisos();
    }, []);

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

    const handleExport = () => {
        startExportConsolidadosPermisos(form.getTransformedValues());
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Consolidado de Permisos</TitlePage>
                <BtnSection
                    disabled={disabled}
                    IconSection={IconPrinter}
                    handleAction={handleExport}
                >
                    Imprimir
                </BtnSection>
            </Group>
            <Divider my="md" />
            <FilterDatesPermiso
                form={form}
                fnAction={startLoadConsolidadosPermisos}
            />

            <PermisosConsolidadosTable />
        </Container>
    );
};

export default ConsolidadoPermisosPage;
