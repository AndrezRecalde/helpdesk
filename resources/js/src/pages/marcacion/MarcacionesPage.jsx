import { useEffect } from "react";
import { Container } from "@mantine/core";
import { FilterFormMarcaciones, TableMarcaciones, TitlePage } from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMarcacionStore } from "../../hooks";

export const MarcacionesPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"))
    const { startLoadMarcaciones, clearMarcaciones } = useMarcacionStore();

    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            badgenumber: usuario.u.asi_id_reloj,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin")
        }
    });

    useEffect(() => {


      return () => {
        clearMarcaciones();
      }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadMarcaciones(form.values);
    }


    return (
        <Container size="xl">
            <TitlePage order={1} size="h1">
                Mis marcaciones
            </TitlePage>
            <FilterFormMarcaciones form={form} handleSubmit={handleSubmit} />
            <TableMarcaciones />
        </Container>
    );
};
