import { Card, Container } from "@mantine/core";
import {
    DireccionesTable,
    FilterFormDirecciones,
    ModalDireccion,
    TitlePage,
} from "../../components";
import { useDirectorStore } from "../../hooks";
import { useEffect } from "react";

export const AdminDireccionesPage = () => {
    const { directores, clearDirectores } = useDirectorStore();

    useEffect(() => {
      return () => {
        clearDirectores()
      }
    }, []);


    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Administrar Direcciones
            </TitlePage>
            <FilterFormDirecciones />

            {directores.length !== 0 ? (
                <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                    <Card.Section>
                        <DireccionesTable />
                    </Card.Section>
                </Card>
            ) : null}
            <ModalDireccion />
        </Container>
    );
};
