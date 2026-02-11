import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnSection,
    DescuentoVacacionesModal,
    PeriodoCreateModal,
    PeriodoEditModal,
    TitlePage,
} from "../../components";
import {
    usePeriodoStore,
    useTitlePage,
    useUiPeriodo,
    useUsersStore,
} from "../../hooks";
import { PeriodosTable } from "../../components/vacaciones/periodos/table/PeriodosTable";
import { FechaIngresoModal } from "../../components/gerencia/user/modal/FechaIngresoModal";
import { IconCubePlus } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { Roles } from "../../helpers/dictionary";

const PeriodoVacacionalesPage = () => {
    useTitlePage("Helpdesk | Periodos Vacaciones");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadPeriodos, startClearPeriodos, message, errores } =
        usePeriodoStore();
    const { modalActionAddPeriodo } = useUiPeriodo();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();

    useEffect(() => {
        if (usuario.role === Roles.NOM_VACACIONES) {
            startLoadPeriodos({});
            startLoadUsersGeneral({});
        } else {
            startLoadPeriodos({ cdgo_usrio: usuario.cdgo_usrio });
            //startLoadUsersGeneral({ cdgo_direccion: usuario.cdgo_direccion });
        }

        return () => {
            clearUsers();
            startClearPeriodos();
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

    const handleCrearPeriodo = () => {
        modalActionAddPeriodo(true);
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={1}>Periodos Vacaciones</TitlePage>
                {usuario.role === Roles.NOM_VACACIONES && (
                    <BtnSection
                        IconSection={IconCubePlus}
                        handleAction={handleCrearPeriodo}
                    >
                        Crear Periodo
                    </BtnSection>
                )}
            </Group>
            <Divider my="md" />
            <PeriodosTable />

            <PeriodoCreateModal />
            <PeriodoEditModal />
            <FechaIngresoModal />

            <DescuentoVacacionesModal />
        </Container>
    );
};

export default PeriodoVacacionalesPage;
