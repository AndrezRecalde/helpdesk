import { useEffect } from "react";
import {
    Box,
    MultiSelect,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconArrowDownToArc } from "@tabler/icons-react";
import {
    useInvEquipoStore,
    useInvUiEquipo,
    useSoporteStore,
    useUsersStore,
} from "../../../../hooks";

export const InvBajaEquipoForm = ({ form }) => {
    const { user_id } = form.values;
    const { users } = useUsersStore();
    const { invEquiposBajas, startSearchEquipos, startBajaEquipos } =
        useInvEquipoStore();
    const { soportes } = useSoporteStore();
    const { modalActionBajaEquipo } = useInvUiEquipo();

    useEffect(() => {
        if (user_id !== null) {
            startSearchEquipos({ user_id });
            form.setFieldValue("equipos", []);
        }
    }, [user_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startBajaEquipos(form.getTransformedValues());
        modalActionBajaEquipo(false);
        form.reset();
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
                    required
                    searchable
                    label="Custodio"
                    placeholder="Seleccione custodio"
                    nothingFoundMessage="Nothing found..."
                    {...form.getInputProps("user_id")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <MultiSelect
                    required
                    searchable
                    clearable
                    checkIconPosition="right"
                    label="Activo(s) Informatico"
                    placeholder="Seleccione el activo(s) informatico(s)"
                    nothingFoundMessage="Nothing found..."
                    {...form.getInputProps("equipos")}
                    data={invEquiposBajas.map((equipo) => {
                        return {
                            group: equipo.nombre_categoria,
                            items: equipo.equipos.map((eq) => {
                                return {
                                    value: eq.id.toString(),
                                    label: `${eq.codigo_nuevo}`,
                                };
                            }),
                        };
                    })}
                />
                <Select
                    required
                    searchable
                    label="No. SOPORTE"
                    placeholder="Seleccione el No. de soporte"
                    nothingFoundMessage="Nothing found..."
                    {...form.getInputProps("numero_sop")}
                    data={soportes.map((soporte) => {
                        return {
                            value: soporte.numero_sop.toString(),
                            label: soporte.numero_sop.toString(),
                        };
                    })}
                />
                <TextInput
                    required
                    description="Ingrese el No. MEMO de la Dirección de TIC"
                    label="No. MEMORANDO"
                    placeholder="Ingrese Número de MEMO"
                    {...form.getInputProps("numero_memorando")}
                />

                <BtnSubmit
                    IconSection={IconArrowDownToArc}
                    heigh={50}
                    //loading={isLoading}
                    //disabled={isLoading}
                >
                    Dar de baja
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
