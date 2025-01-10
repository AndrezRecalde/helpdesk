import { rem, Tabs } from "@mantine/core";
import {
    IconAdjustments,
    IconDevices2,
    IconFiles,
    //IconMapPin,
    IconUserCheck,
} from "@tabler/icons-react";
import {
    InvTabComponentesEquipos,
    InvTabDocumentoEquipo,
    InvTabGeneralEquipo,
    InvTabResponsableEquipo,
} from "../../../../../../components";
import { useInvEquipoStore } from "../../../../../../hooks";

export const InvTabsDetalleEquipo = () => {
    const { activateInvEquipo } = useInvEquipoStore();
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
                {(activateInvEquipo?.nombre_categoria
                    ?.toUpperCase()
                    .includes("COMPUTADOR") ||
                    activateInvEquipo?.nombre_categoria
                        ?.toUpperCase()
                        .includes("LAPTOP")) && (
                    <Tabs.Tab
                        value="componentes"
                        leftSection={<IconDevices2 style={iconStyle} />}
                    >
                        Periféricos
                    </Tabs.Tab>
                )}
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
                {/* <InvTabUbicacionEquipo /> */}
            </Tabs.Panel>
            {activateInvEquipo?.categoria_id === 1 && (
                <Tabs.Panel value="componentes">
                    <InvTabComponentesEquipos />
                </Tabs.Panel>
            )}
            <Tabs.Panel value="responsable">
                <InvTabResponsableEquipo />
            </Tabs.Panel>
            <Tabs.Panel value="documentos">
                <InvTabDocumentoEquipo />
            </Tabs.Panel>
        </Tabs>
    );
};
