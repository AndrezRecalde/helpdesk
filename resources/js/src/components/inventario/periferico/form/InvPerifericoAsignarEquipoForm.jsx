import { useEffect, useState } from "react";
import {
    ActionIcon,
    Box,
    Grid,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvEquipoStore, useInvPerifericoStore, useInvUiPeriferico, useStorageField } from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconRefresh, IconSearch } from "@tabler/icons-react";

export const InvPerifericoAsignarEquipoForm = ({ form }) => {
    const { codigo } = form.values;
    const { invEquipos, startLoadInvEquipos, startClearInvEquipos } =
        useInvEquipoStore();
    const { startAssignEquipo, activatePeriferico, setActivateInvPeriferico } = useInvPerifericoStore();
    const { modalActionAsignarEquipo } = useInvUiPeriferico();
    const { storageFields } = useStorageField();
    const [btnDisabled, setBtnDisabled] = useState(false);

    const asignarForm = useForm({
        initialValues: {
            equipo_id: null,
            //equipo_id: null,
        },
        validate: {
            equipo_id: isNotEmpty("Por seleccione el equipo"),
        },
        transformValues: (values) => ({
            ...values,
            equipo_id: Number(values.equipo_id) || null,
        }),
    });

    useEffect(() => {
        if (activatePeriferico !== null) {
            asignarForm.setValues({
                id: activatePeriferico.id
            });
            return;
        }
    }, [activatePeriferico]);

    const handleSearchEquipo = (e) => {
        e.preventDefault();
        startLoadInvEquipos({ codigo });
        setBtnDisabled(true);
    };

    const handleRefresh = (e) => {
        e.preventDefault();
        startClearInvEquipos();
        setBtnDisabled(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        startAssignEquipo(asignarForm.getTransformedValues(), storageFields);
        //console.log(asignarForm.getTransformedValues());
        if (activatePeriferico !== null) {
            setActivateInvPeriferico(null);
        }
        form.reset();
        asignarForm.reset();
        modalActionAsignarEquipo(false);
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSearchEquipo(e))}
            >
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="lg"
                >
                    <TextInput
                        label="Código nuevo"
                        placeholder="Digite el código nuevo del equipo"
                        {...form.getInputProps("codigo")}
                    />
                    <Grid>
                        <Grid.Col span={11}>
                            <BtnSubmit
                                IconSection={IconSearch}
                                disabled={btnDisabled}
                            >
                                Buscar equipo
                            </BtnSubmit>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <ActionIcon
                                disabled={!btnDisabled}
                                mt="lg"
                                variant="filled"
                                size="lg"
                                aria-label="Refresh Equipos"
                                onClick={handleRefresh}
                            >
                                <IconRefresh
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Box>
            {invEquipos && invEquipos.length > 0 ? (
                <Box
                    component="form"
                    onSubmit={asignarForm.onSubmit((_, e) => handleSubmit(e))}
                >
                    <Stack
                        bg="var(--mantine-color-body)"
                        align="stretch"
                        justify="center"
                        gap="lg"
                    >
                        <Select
                            searchable
                            label="Equipo"
                            placeholder="Selecciona el equipo"
                            {...asignarForm.getInputProps("equipo_id")}
                            data={invEquipos.map((equipo) => {
                                return {
                                    value: equipo.id.toString(),
                                    label: `${equipo.modelo} ${equipo.nombre_marca}`,
                                };
                            })}
                        />
                        <BtnSubmit>Asignar</BtnSubmit>
                    </Stack>
                </Box>
            ) : null}
        </>
    );
};
