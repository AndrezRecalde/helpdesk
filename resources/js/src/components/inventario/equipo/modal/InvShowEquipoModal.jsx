import { Divider, Drawer, Group, LoadingOverlay } from "@mantine/core";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import {
    BtnSection,
    InvInfoGeneralEquipo,
    InvTabsDetalleEquipo,
    TitlePage,
} from "../../../../components";
import { IconDeviceDesktopDown } from "@tabler/icons-react";

export const InvShowEquipoModal = () => {
    const { isLoading, activateInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { isOpenModalViewEquipo, modalActionViewEquipo, modalActionBajaEquipo } = useInvUiEquipo();

    const handleBajaEquipo = () => {
        modalActionBajaEquipo(true);
    }

    const handleCloseModal = () => {
        modalActionViewEquipo(false);
        if (activateInvEquipo) {
            setActivateInvEquipo(null);
        }
    };

    return (
        <Drawer
            position="right"
            size="50rem"
            opened={isOpenModalViewEquipo}
            onClose={handleCloseModal}
            title={
                <TitlePage order={3} ta="left">
                    Detalles del Equipo
                </TitlePage>
            }
        >
            <Divider my="md" />
            <LoadingOverlay
                visible={isLoading}
                zIndex={500}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <InvInfoGeneralEquipo />
            <Group justify="right">
                <BtnSection
                    heigh={30}
                    fontSize={12}
                    IconSection={IconDeviceDesktopDown}
                    handleAction={handleBajaEquipo}
                >
                    DAR DE BAJA
                </BtnSection>
            </Group>
            <InvTabsDetalleEquipo />
        </Drawer>
    );
};
