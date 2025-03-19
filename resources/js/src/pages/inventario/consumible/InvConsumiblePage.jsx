import { Container, Divider, Group } from "@mantine/core";
import {
    BtnAddActions,
    InvConsumibleModal,
    ConsumibleStockModal,
    InvConsumibleTable,
    InvSolicitudConsumibleModal,
    TitlePage,
    InvConsumibleHistorialModal,
} from "../../../components";
import { IconBrandTelegram, IconCubePlus } from "@tabler/icons-react";
import {
    useInvConsumibleStore,
    useTitlePage,
    useUiInvConsumible,
} from "../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const InvConsumiblePage = () => {
    useTitlePage("Helpdesk | Inv. Consumibles");

    const {
        isExport,
        startLoadInvConsumibles,
        startClearInvConsumibles,
        message,
        errores,
    } = useInvConsumibleStore();
    const { modalActionConsumible, modalActionSolicitudConsumible } =
        useUiInvConsumible();

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
                showConfirmButton: false,
                timer: 1500,
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

    const handleSolicitar = () => {
        modalActionSolicitudConsumible(true);
    };

    const menuActions = [
        {
            label: "Nuevo Consumible",
            icon: IconCubePlus,
            onClick: handleAgregar,
            color: "teal",
        },
        {
            label: "Solicitar Consumible",
            icon: IconBrandTelegram,
            onClick: handleSolicitar,
            color: "red",
        },
    ];

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Consumibles</TitlePage>
                <BtnAddActions actions={menuActions}>Crear nuevo</BtnAddActions>
            </Group>
            <Divider my="sm" />

            <InvConsumibleTable />

            <InvConsumibleModal />
            <ConsumibleStockModal />
            <InvSolicitudConsumibleModal />
            <InvConsumibleHistorialModal />
        </Container>
    );
};

export default InvConsumiblePage;
