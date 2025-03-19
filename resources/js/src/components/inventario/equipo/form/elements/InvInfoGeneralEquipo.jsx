import { Stack } from "@mantine/core";
import { TextSection } from "../../../../../components";
import { useInvEquipoStore } from "../../../../../hooks";

export const InvInfoGeneralEquipo = () => {
    const { activateInvEquipo } = useInvEquipoStore();

    const infoItems = [
        {
            label: "Codigo Nuevo",
            value: activateInvEquipo?.codigo_nuevo || "Cargando...",
        },
        {
            label: "Codigo Antiguo",
            value: activateInvEquipo?.codigo_antiguo
                ? activateInvEquipo.codigo_antiguo
                : "SIN CODIGO",
        },
        {
            label: "Tipo de Categoría",
            value: activateInvEquipo?.nombre_tipocategoria || "Cargando...",
        },
        {
            label: "Categoria",
            value: activateInvEquipo?.nombre_categoria || "Cargando...",
        },
        {
            label: "Descripcion",
            value: activateInvEquipo?.descripcion
                ? activateInvEquipo.descripcion
                : "SIN DESCRIPCION",
        },
    ];

    return (
        <Stack>
            {infoItems.map(({ label, value }) => (
                <div key={label}>
                    <TextSection fz="md" fw={300}>
                        {value}
                    </TextSection>
                    <TextSection fz="xs" tt="uppercase" fw={700} c="dimmed">
                        {label}
                    </TextSection>
                </div>
            ))}
        </Stack>
    );
};
