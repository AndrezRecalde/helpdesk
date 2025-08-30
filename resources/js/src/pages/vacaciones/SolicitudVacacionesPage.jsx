import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnSection,
    SolicitudVacacionesForm,
    TitlePage,
} from "../../components";
import { IconChevronsRight } from "@tabler/icons-react";
import { useDireccionStore, useVacacionesStore } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SolicitudVacacionesPage = () => {
    const {
        message,
        errores,
        isExport,
        startLoadMotivosVacaciones,
        startExportFichaVacaciones,
        startClearVacaciones,
    } = useVacacionesStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();

    const navigate = useNavigate();

    useEffect(() => {
        startLoadMotivosVacaciones();
        startLoadDirecciones();

        return () => {
            startClearVacaciones();
            clearDirecciones();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            //setStoragePermisoFields(message);
            Swal.fire({
                text: `${message.msg}, ¿Deseas imprimir la ficha?`,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, imprimir!",
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(message.codigo);
                    startExportFichaVacaciones(message.codigo);
                    //console.log(message.idper_permisos)
                }
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

    const handleAction = () => {
        navigate("/intranet/solicitudes-vacaciones");
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={1}>Solicitud Vacaciones</TitlePage>
                <BtnSection heigh={45} IconSection={IconChevronsRight} handleAction={handleAction}>
                    Mis solicitudes
                </BtnSection>
            </Group>
            <Divider my="md" />
            <SolicitudVacacionesForm />
        </Container>
    );
};

export default SolicitudVacacionesPage;
