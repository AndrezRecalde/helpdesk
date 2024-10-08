import { Select, Stack, Textarea } from "@mantine/core";

export const InvAsignacionForm = ({ form }) => {
    return (
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
                {...form.getInputProps("usuario_id")}
                data={[]}
            />
            <Select
                withAsterisk
                label="Seleccione Dirección"
                placeholder="Seleccione la dirección"
                {...form.getInputProps("direccion_id")}
                data={[]}

            />
            <Select
                withAsterisk
                label="Estado"
                placeholder="Seleccione un estado"
                {...form.getInputProps("concepto_id")}
                data={[]}

            />
            <Textarea
                label="Observación"
                autosize
                minRows={6}
                maxRows={8}
                {...form.getInputProps("observacion")}
            />

        </Stack>
    );
};




{/* <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <Select
                withAsterisk
                label="Seleccione Usuario"
                placeholder="Seleccione el usuario a asignar"
                {...form.getInputProps("usuario_id")}
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
                {...form.getInputProps("direccion_id")}
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
                {...form.getInputProps("concepto_id")}
                data={invConceptos.map((concepto) => {
                    return {
                        value: concepto.id.toString(),
                        label: concepto.nombre_concepto,
                    };
                })}
            />
            <Textarea
                label="Observación"
                autosize
                minRows={6}
                maxRows={8}
                {...form.getInputProps("observacion")}
            />

        </Stack> */}