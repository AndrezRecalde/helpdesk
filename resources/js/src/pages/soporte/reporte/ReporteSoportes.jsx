import { Container, LoadingOverlay } from "@mantine/core";
import { FilterFormSearchDates, TitlePage } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";

export const ReporteSoportes = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("clic");
    };

    return (
        <Container size="md" my="md">
            <TitlePage order={2} size="h2">
                Reporte de soportes
            </TitlePage>
            <LoadingOverlay
                visible={false} //loadPDF
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />

            <FilterFormSearchDates
                title="Filtrar lista de mis soportes"
                form={form}
                handleSubmit={handleSubmit}
                isLoading={false} //isLoading
            />
            {/* {tableLoad ? <TableContent table={table} /> : null} */}
        </Container>
    );
};
