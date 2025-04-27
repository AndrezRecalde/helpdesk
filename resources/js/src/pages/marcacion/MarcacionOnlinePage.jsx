import { useEffect } from "react";
import { Container, Divider } from "@mantine/core";
import { MarcacionSection, TextSection, TitlePage } from "../../components";
import { useFechaHoraEcuador, useMarcacionStore } from "../../hooks";
import Swal from "sweetalert2";

const MarcacionOnlinePage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { fecha, hora } = useFechaHoraEcuador();
    const { message, errores, startLoadMarcacionesBiometricos, clearMarcaciones } =
        useMarcacionStore();

    useEffect(() => {
        //console.log(form.getTransformedValues());
        startLoadMarcacionesBiometricos({ asi_id_reloj: usuario.asi_id_reloj });
        return () => {
            clearMarcaciones();
        };
    }, []);

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
                title: "Opps...",
                text: errores,
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="lg">
            <TitlePage order={1}>Marcación Online</TitlePage>
            <Divider my="md" />

            <div>
                <TextSection tt="capitalize" ta="center" fz={16} fw={700}>
                    {fecha}
                </TextSection>
                <TextSection tt="" ta="center" fz={18} fw={700}>
                    {hora}
                </TextSection>
            </div>
            <MarcacionSection usuario={usuario} />
        </Container>
    );
};

export default MarcacionOnlinePage;
