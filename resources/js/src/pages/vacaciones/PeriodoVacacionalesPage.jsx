import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import { BtnSection, DescuentoVacacionesModal, PeriodoCreateModal, PeriodoEditModal, TitlePage } from "../../components";
import { usePeriodoStore, useUiPeriodo, useUsersStore } from "../../hooks";
import { PeriodosTable } from "../../components/vacaciones/periodos/table/PeriodosTable";
import { FechaIngresoModal } from "../../components/gerencia/user/modal/FechaIngresoModal";
import { IconCubePlus } from "@tabler/icons-react";
import Swal from "sweetalert2";

const PeriodoVacacionalesPage = () => {
    const { startLoadPeriodos, startClearPeriodos, message, errores } = usePeriodoStore();
    const { modalActionAddPeriodo } = useUiPeriodo();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();

    useEffect(() => {
        startLoadPeriodos({});
        startLoadUsersGeneral({});

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
                <BtnSection
                    heigh={45}
                    fontSize={12}
                    IconSection={IconCubePlus}
                    handleAction={handleCrearPeriodo}
                >
                    Crear Periodo
                </BtnSection>
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
