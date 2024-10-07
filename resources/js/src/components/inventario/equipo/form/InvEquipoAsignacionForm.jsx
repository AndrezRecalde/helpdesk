import { Box, Select, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";
import {
    useDireccionStore,
    useInvEquipoStore,
    useInvUiEquipo,
    useUsersStore,
} from "../../../../hooks";

export const InvEquipoAsignacionForm = ({ form }) => {
    const { startAssignEquipo, activateInvEquipo, setActivateInvEquipo } =
        useInvEquipoStore();
    const { modalActionAssignEquipo } = useInvUiEquipo();
    const { users } = useUsersStore();
    const { direcciones } = useDireccionStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startAssignEquipo(form.getTransformedValues());
        if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        }
        form.reset();
        modalActionAssignEquipo(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <Select
                    withAsterisk
                    label="Seleccione Usuario"
                    placeholder="Seleccione el usuario a asignar"
                    {...form.getInputProps("cdgo_usrio")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <Select
                    withAsterisk
                    label="Seleccione Dirección"
                    placeholder="Seleccione la dirección"
                    {...form.getInputProps("cdgo_dprtmnto")}
                    data={direcciones.map((direccion) => {
                        return {
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        };
                    })}
                />
                <Select
                    withAsterisk
                    label="Estado"
                    placeholder="Seleccione un estado"
                    {...form.getInputProps("estado_id")}
                    data={[]}
                />
                <Textarea
                    label="Observación"
                    description="Coloque un detalle inusual acerca de esta asignación"
                    autosize
                    minRows={6}
                    maxRows={8}
                    {...form.getInputProps("observacion")}
                />
                <BtnSubmit fontSize={16} IconSection={IconChecks}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
