import { Drawer, Stack } from "@mantine/core";
import {
    InvConsumibleBusqueda,
    InvConsumibleHistorialTable,
    TextSection,
} from "../../../../components";

import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";

export const InvConsumibleHistorialModal = () => {
    const { isOpenModalHistorialConsumible, modalActionHistorialConsumible } =
        useUiInvConsumible();
    const { activateConsumible, setActivateInvConsumible, startClearHistorial } =
        useInvConsumibleStore();

    const handleCloseModal = () => {
        setActivateInvConsumible(null);
        startClearHistorial();
        modalActionHistorialConsumible(false);
    };

    return (
        <Drawer
            size="xl"
            offset={8}
            radius="md"
            opened={isOpenModalHistorialConsumible}
            onClose={handleCloseModal}
            title="Historial Consumible"
        >
            <Stack>
                <TextSection fz={16} fw={700}>
                    {activateConsumible?.nombre_consumible}
                </TextSection>
                <InvConsumibleBusqueda
                    isOpenModal={isOpenModalHistorialConsumible}
                />
                <InvConsumibleHistorialTable />
            </Stack>
        </Drawer>
    );
};
