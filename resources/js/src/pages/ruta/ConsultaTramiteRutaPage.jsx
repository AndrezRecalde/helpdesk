import { useEffect } from "react";
import { ActionIcon, Container, Divider, Group } from "@mantine/core";
import { useRutaStore, useTitlePage, useUiRuta } from "../../hooks";
import {
    ConsultaTramiteForm,
    DespachosTable,
    FichaIngresoCard,
    InformacionTramiteModal,
    StatInfoDepartamento,
    TitlePage,
} from "../../components";
import { IconHelp } from "@tabler/icons-react";
import { infoSecretaria } from "../../helpers/infoStats";
import Swal from "sweetalert2";

const ConsultaTramiteRutaPage = () => {
    useTitlePage("Consulta tramite");
    const { ingreso, despachos, message, errores } = useRutaStore();
    const { modalActionHelpRuta } = useUiRuta();

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: true,
                confirmButtonColor: "#fb1042",
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xl" my="xl">
            <StatInfoDepartamento infoDepartamento={infoSecretaria} />
            <Group justify="space-between" mt={20}>
                <TitlePage order={2}>Consulta de Trámites</TitlePage>
                <ActionIcon
                    variant="subtle"
                    color="rgba(0, 0, 0, 1)"
                    aria-label="Settings"
                    onClick={() => modalActionHelpRuta(true)}
                >
                    <IconHelp
                        style={{ width: "90%", height: "90%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Group>
            <Divider my="md" />
            <ConsultaTramiteForm />
            {ingreso !== null ? (
                <>
                    <Divider my="md" />
                    <FichaIngresoCard />
                </>
            ) : null}
            {despachos.length > 0 ? (
                <>
                    <Divider my="md" />
                    <DespachosTable />
                </>
            ) : null}

            <InformacionTramiteModal />
        </Container>
    );
};

export default ConsultaTramiteRutaPage;
