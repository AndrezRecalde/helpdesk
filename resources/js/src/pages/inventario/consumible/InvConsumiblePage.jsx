import { Container, Divider, Group } from "@mantine/core";
import {
    InvConsumibleModal,
    ConsumibleStockModal,
    InvConsumibleTable,
    TitlePage,
    BtnSection,
} from "../../../components";
import { IconCubePlus } from "@tabler/icons-react";
import {
    useInvConsumibleStore,
    useTitlePage,
    useUiInvConsumible,
} from "../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const InvConsumiblePage = () => {
    useTitlePage("Inventario de Consumibles - Helpdesk");

    const {
        isExport,
        startLoadInvConsumibles,
        startClearInvConsumibles,
        message,
        errores,
    } = useInvConsumibleStore();
    const { modalActionConsumible } = useUiInvConsumible();

    useEffect(() => {
        startLoadInvConsumibles({});

        return () => {
            startClearInvConsumibles();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
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

    useEffect(() => {
        if (isExport === true) {
            Swal.fire({
                icon: "info",
                title: "Exportando...",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                    startLoadInvConsumibles({});
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isExport]);

    const handleAgregar = () => {
        //console.log("modal");
        modalActionConsumible(true);
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Inventario de Consumibles</TitlePage>
                <BtnSection
                    IconSection={IconCubePlus}
                    handleAction={handleAgregar}
                >
                    Nuevo Consumible
                </BtnSection>
            </Group>
            <Divider my="sm" />

            <InvConsumibleTable />

            <InvConsumibleModal />
            <ConsumibleStockModal />
        </Container>
    );
};

export default InvConsumiblePage;
