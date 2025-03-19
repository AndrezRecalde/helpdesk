import { Box, rem, Tabs } from "@mantine/core";
import {
    IconAdjustments,
    IconFiles,
    IconUserCheck,
} from "@tabler/icons-react";
import {
    InvEquipoDocumentosTable,
    InvEquipoResponsablesTable,
    InvTabGeneralEquipo,
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
                    value="responsable"
                    leftSection={<IconUserCheck style={iconStyle} />}
                >
                    Prestaciones
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
                {/* <InvTabUbicacionEquipo /> */}
            </Tabs.Panel>

            <Tabs.Panel value="responsable">
                {/* <InvTabResponsableEquipo /> */}
                <Box mt={20}>
                    <InvEquipoResponsablesTable />
                </Box>
            </Tabs.Panel>
            <Tabs.Panel value="documentos">
                {/* <InvTabDocumentoEquipo /> */}
                <Box mt={20}>
                    <InvEquipoDocumentosTable />
                </Box>
            </Tabs.Panel>
        </Tabs>
    );
};
