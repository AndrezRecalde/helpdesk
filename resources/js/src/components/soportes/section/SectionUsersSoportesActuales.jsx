import { useEffect } from "react";
import { Container } from "@mantine/core";
import {
    AlertSection,
    SoportesUsersTable,
    TitlePage,
} from "../../../components";
import { useSoporteStore } from "../../../hooks";
import { IconInfoCircle } from "@tabler/icons-react";

export const SectionUsersSoportesActuales = ({ tabValue }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadSoportesActualesUsuarios, clearSoportes } =
        useSoporteStore();

    useEffect(() => {
        if (tabValue === "actuales") {
            startLoadSoportesActualesUsuarios(usuario.cdgo_usrio);
            return;
        }

        return () => {
            clearSoportes();
        };
    }, [tabValue]);

    return (
        <Container size="xl" my={20}>
            <TitlePage order={2} size="h2">
                Seguimiento de Soportes
            </TitlePage>
            <AlertSection
                variant="light"
                color="teal"
                radius="md"
                title=""
                icon={IconInfoCircle}
            >
                Se visualizan el seguimiento de los soportes del día actual
            </AlertSection>
            <SoportesUsersTable />
        </Container>
    );
};
