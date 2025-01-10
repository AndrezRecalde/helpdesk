import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    TitlePage,
    InvPerifericoTable,
    FilterFormPeriferico,
    InvPerifericoModal,
    BtnSection,
    InvPerifericoAsignarEquipoModal,
} from "../../../components";
import {
    useInvEstadoStore,
    useInvMarcaStore,
    useInvPerifericoStore,
    useInvUiPeriferico,
    useStorageField,
    useTitlePage,
} from "../../../hooks";
import Swal from "sweetalert2";
import { IconCopyPlus } from "@tabler/icons-react";

const InvComponentesPage = () => {
    useTitlePage("Helpdesk | Inv. Componentes");
    const { startLoadInvMarcas } = useInvMarcaStore();
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();
    const { isExport, message, errores, startClearInvPerifericos } = useInvPerifericoStore();
    const { modalActionPeriferico } = useInvUiPeriferico();
    const { setStorageFields } = useStorageField();

    useEffect(() => {
        startLoadInvMarcas();
        startLoadInvEstados();

        return () => {
            startClearInvEstados();
            setStorageFields(null);
            startClearInvPerifericos();
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
                timer: 2000,
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

    const handleAgregar = () => {
        console.log('modal');
        modalActionPeriferico(true);
    };

    return (
        <Container size="xxl">
            <Group justify="space-between">
            <TitlePage order={2}>Componentes - Periféricos</TitlePage>
            <BtnSection
                    IconSection={IconCopyPlus}
                    handleAction={handleAgregar}
                >
                    Agregar
                </BtnSection>
            </Group>
            <Divider my="sm" />
            <FilterFormPeriferico />

            <InvPerifericoTable />

            <InvPerifericoModal />

            <InvPerifericoAsignarEquipoModal />
        </Container>
    );
};

export default InvComponentesPage;
