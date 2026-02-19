import { Divider, Drawer, LoadingOverlay } from "@mantine/core";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import { InvTabsDetalleEquipo, TextSection } from "../../../../components";

export const InvShowEquipoModal = () => {
    const { isLoading, activateInvEquipo, setActivateInvEquipo } =
        useInvEquipoStore();
    const { isOpenModalViewEquipo, modalActionViewEquipo } = useInvUiEquipo();

    const handleCloseModal = () => {
        modalActionViewEquipo(false);
        if (activateInvEquipo) {
            setActivateInvEquipo(null);
        }
    };

    return (
        <Drawer
            position="right"
            size="60rem"
            opened={isOpenModalViewEquipo}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fw={700} fz={18}>
                    Detalles del Equipo
                </TextSection>
            }
        >
            <Divider my="md" />
            <LoadingOverlay
                visible={isLoading}
                zIndex={500}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <InvTabsDetalleEquipo />
        </Drawer>
    );
};
