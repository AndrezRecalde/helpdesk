import { useEffect, useMemo } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    TitlePage,
    BtnSection,
    FilterVacacionesForm,
    SolAnulacionVacacionModal,
    SolicitudesVacacionesTable,
    SolAutorizarVacacionModal
} from "../../components";
import { IconCubePlus } from "@tabler/icons-react";
import { useVacacionesStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SolicitudesVacacionesPage = () => {
    const usuario = useMemo(
        () => JSON.parse(localStorage.getItem("service_user")),
        []
    );
    const { isExport, startClearVacaciones, message, errores } =
        useVacacionesStore();

    const navigate = useNavigate();

    const handleCrearSolicitud = () => {
        //console.log("clic");
        navigate("/intranet/vacaciones")
    };

    useEffect(() => {
        return () => {
            startClearVacaciones();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: true,
                confirmButtonColor: "#106ee8",
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                text: errores,
                showConfirmButton: true,
                confirmButtonColor: "#106ee8",
            });
            return;
        }
    }, [errores]);

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

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={1}>Solicitudes Vacaciones</TitlePage>
                <BtnSection
                    heigh={45}
                    fontSize={12}
                    IconSection={IconCubePlus}
                    handleAction={handleCrearSolicitud}
                >
                    Crear Solicitud
                </BtnSection>
            </Group>
            <Divider my="md" />
            <FilterVacacionesForm usuario={usuario} />
            <SolicitudesVacacionesTable usuario={usuario} />

            {/* // Modal para usuarios que desean anular una solicitud de vacaciones */}
            <SolAnulacionVacacionModal />

            <SolAutorizarVacacionModal />
        </Container>
    );
};

export default SolicitudesVacacionesPage;
