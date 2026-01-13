import {
    Checkbox,
    Group,
    Loader,
    NumberInput,
    Select,
    SimpleGrid,
    Stack,
    Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { TextSection } from "../../../../../components";
import { useEffect, useState } from "react";
import { useDireccionStore, useUsersStore } from "../../../../../hooks";

export const InvEquipoComplementaria = ({ form, classes }) => {
    const { bien_adquirido, bien_donado, is_there_custodio } = form.values;

    const {
        isLoading: loadingUsers,
        startLoadUsersGeneral,
        users,
        clearUsers,
    } = useUsersStore();
    const {
        isLoading: loadingDirecciones,
        startLoadDirecciones,
        direcciones,
        clearDirecciones,
    } = useDireccionStore();
    const [checkDonado, setCheckDonado] = useState(false);
    const [checkAdq, setCheckAdq] = useState(false);

    useEffect(() => {
        if (!users.length || !direcciones.length) {
            startLoadUsersGeneral({});
            startLoadDirecciones();
            return;
        }
    }, [is_there_custodio]);

    useEffect(() => {
        return () => {
            clearUsers();
            clearDirecciones();
        };
    }, []);

    useEffect(() => {
        if (bien_adquirido) {
            setCheckDonado(true);
        } else {
            setCheckDonado(false);
        }
        if (bien_donado) {
            setCheckAdq(true);
        } else {
            setCheckAdq(false);
        }
    }, [bien_adquirido, bien_donado]);

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <div>
                <TextSection fw={500}>Modalidad del bien: </TextSection>
                <Group>
                    <Checkbox
                        label="Bien adquirido"
                        disabled={checkAdq}
                        {...form.getInputProps("bien_adquirido", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        label="Bien donado"
                        disabled={checkDonado}
                        {...form.getInputProps("bien_donado", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        label="Bien usado"
                        {...form.getInputProps("bien_usado", {
                            type: "checkbox",
                        })}
                    />
                </Group>
            </div>

            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <DateInput
                    //dateParser={dateParser}
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha adquisición"
                    placeholder="Seleccione fecha de adquisición"
                    {...form.getInputProps("fecha_adquisicion")}
                    classNames={classes}
                />
                {/* <DateInput
                    //dateParser={dateParser}
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha amortización"
                    placeholder="Seleccione fecha de amortización"
                    {...form.getInputProps("fecha_amortizacion")}
                /> */}
                <NumberInput
                    label="Vida útil (En años)"
                    placeholder="Digite la vida útil en años"
                    allowNegative={false}
                    {...form.getInputProps("vida_util")}
                    classNames={classes}
                />
            </SimpleGrid>

            <Checkbox
                label="¿Desea agregar custodio?"
                {...form.getInputProps("is_there_custodio", {
                    type: "checkbox",
                })}
            />

            {is_there_custodio ? (
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                    <Select
                        searchable
                        label="Usuario"
                        placeholder="Seleccione el custodio"
                        {...form.getInputProps("user_id")}
                        rightSection={
                            loadingUsers ? <Loader size={18} /> : null
                        }
                        data={
                            users
                                ? users.map((user) => ({
                                      value: user.cdgo_usrio.toString(),
                                      label: user.nmbre_usrio,
                                  }))
                                : "Cargando"
                        }
                        classNames={classes}
                    />
                    <Select
                        searchable
                        label="Dirección"
                        placeholder="Seleccione la dirección de ubicación"
                        {...form.getInputProps("direccion_id")}
                        rightSection={
                            loadingDirecciones ? <Loader size={18} /> : null
                        }
                        data={
                            direcciones
                                ? direcciones.map((direccion) => ({
                                      value: direccion.cdgo_dprtmnto.toString(),
                                      label: direccion.nmbre_dprtmnto,
                                  }))
                                : "Cargando"
                        }
                        classNames={classes}
                    />
                </SimpleGrid>
            ) : null}

            <Textarea
                label="Descripción del equipo"
                autosize
                minRows={6}
                maxRows={8}
                {...form.getInputProps("descripcion")}
            />
        </Stack>
    );
};
