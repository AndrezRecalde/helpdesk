import { rem, Tabs } from "@mantine/core";
import {
    IconAdjustments,
    IconFiles,
    IconMapPin,
    IconUserCheck,
} from "@tabler/icons-react";
import {
    InvEquipoResponsablesTable,
    InvTabDocumentoEquipo,
    InvTabGeneralEquipo,
    InvTabUbicacionEquipo,
} from "../../../../../../components";

export const InvTabsDetalleEquipo = () => {
    const iconStyle = { width: rem(18), height: rem(18) };

    return (
        <Tabs mt={30} variant="outline" defaultValue="general">
            <Tabs.List grow>
                <Tabs.Tab
                    value="general"
                    leftSection={<IconAdjustments style={iconStyle} />}
                >
                    General
                </Tabs.Tab>
                <Tabs.Tab
                    value="ubicacion"
                    leftSection={<IconMapPin style={iconStyle} />}
                >
                    Ubicación Física
                </Tabs.Tab>
                <Tabs.Tab
                    value="responsable"
                    leftSection={<IconUserCheck style={iconStyle} />}
                >
                    Responsable
                </Tabs.Tab>
                <Tabs.Tab
                    value="documentos"
                    leftSection={<IconFiles style={iconStyle} />}
                >
                    Doc. de Respaldo
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="general">
                <InvTabGeneralEquipo />
            </Tabs.Panel>
            <Tabs.Panel value="ubicacion">
                <InvTabUbicacionEquipo />
            </Tabs.Panel>
            <Tabs.Panel value="responsable">
                <InvEquipoResponsablesTable />
            </Tabs.Panel>
            <Tabs.Panel value="documentos">
                <InvTabDocumentoEquipo />
            </Tabs.Panel>
        </Tabs>
    );
};
