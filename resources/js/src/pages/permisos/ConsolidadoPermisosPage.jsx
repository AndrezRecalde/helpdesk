import { Container, Divider, Group } from "@mantine/core";
import {
    BtnSection,
    FilterDatesPermiso,
    PermisosConsolidadosTable,
    TitlePage,
} from "../../components";
import { IconPdf } from "@tabler/icons-react";
import { usePermisoStore } from "../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";

const ConsolidadoPermisosPage = () => {
    const { startLoadConsolidadosPermisos, startExportConsolidadosPermisos } =
        usePermisoStore();

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

    const handleExport = () => {
        startExportConsolidadosPermisos(form.getTransformedValues());
    };

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2}>Consolidado de Permisos</TitlePage>
                <BtnSection
                    IconSection={IconPdf}
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
