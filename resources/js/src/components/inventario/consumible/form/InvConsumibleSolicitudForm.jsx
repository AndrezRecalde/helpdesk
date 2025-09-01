import {
    ActionIcon,
    Box,
    NumberInput,
    Select,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { IconPlus, IconSend, IconTrash } from "@tabler/icons-react";
import {
    useDireccionStore,
    useInvConsumibleStore,
    useInvEquipoStore,
    useUiInvConsumible,
    useUsersStore,
} from "../../../../hooks";
import { TitlePage, BtnSubmit, BtnSection } from "../../../../components";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";

export const InvConsumibleSolicitudForm = ({ form }) => {
    const { users } = useUsersStore();
    const { direcciones } = useDireccionStore();
    const { consumibles, startSolicitarConsumible } = useInvConsumibleStore();
    const { modalActionSolicitudConsumible } = useUiInvConsumible();
    const { invEquiposBajas } = useInvEquipoStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startSolicitarConsumible(form.getTransformedValues());
        //console.log(form.getTransformedValues());
        modalActionSolicitudConsumible(false);
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
                <DateInput
                    clearable
                    maxDate={dayjs(new Date()).add(1, "month").toDate()}
                    valueFormat="YYYY-MM-DD"
                    label="Fecha de solicitud"
                    placeholder="Registra la fecha"
                    {...form.getInputProps("fecha")}
                />
                <Select
                    required
                    searchable
                    clearable
                    label="Autorizador"
                    placeholder="Usuario Autoriza"
                    {...form.getInputProps("usuario_autoriza")}
                    data={users.map((user) => {
                        return {
                            label: user.nmbre_usrio,
                            value: user.cdgo_usrio.toString(),
                        };
                    })}
                />
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                    <Select
                        required
                        searchable
                        clearable
                        label="Departamento Solicitante"
                        placeholder="Seleccione el departamento solicitante"
                        nothingFoundMessage="Nothing found..."
                        {...form.getInputProps("departamento_id")}
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                    <Select
                        required
                        searchable
                        clearable
                        label="Solicitante"
                        placeholder="Usuario Solicita"
                        nothingFoundMessage="Nothing found..."
                        {...form.getInputProps("usuario_solicita")}
                        data={users.map((user) => {
                            return {
                                label: user.nmbre_usrio,
                                value: user.cdgo_usrio.toString(),
                            };
                        })}
                    />
                </SimpleGrid>
                <Select
                    required
                    searchable
                    clearable
                    checkIconPosition="right"
                    label="Activo(s) Informatico"
                    placeholder="Seleccione el activo(s) informatico(s)"
                    nothingFoundMessage="Nothing found..."
                    {...form.getInputProps("equipo_id")}
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
                {form.values.consumibles.map((_, index) => (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} key={index}>
                        <TitlePage order={5} ta="left">
                            Consumible # {index + 1}
                        </TitlePage>
                        <ActionIcon
                            disabled={index === 0 ? true : false}
                            variant="filled"
                            color="red.7"
                            aria-label="trash"
                            onClick={() =>
                                form.setFieldValue(
                                    "consumibles",
                                    form.values.consumibles.filter(
                                        (_, i) => i !== index
                                    )
                                )
                            }
                        >
                            <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <Select
                            required
                            label="Consumible"
                            nothingFoundMessage="Nothing found..."
                            {...form.getInputProps(`consumibles.${index}.id`)}
                            data={consumibles.map((consumible) => {
                                return {
                                    label: consumible.nombre_consumible,
                                    value: consumible.id.toString(),
                                };
                            })}
                        />
                        <NumberInput
                            required
                            label="Cantidad"
                            placeholder="Ingrese la cantidad"
                            defaultValue={100}
                            {...form.getInputProps(
                                `consumibles.${index}.cantidad`
                            )}
                        />
                    </SimpleGrid>
                ))}
                <BtnSection
                    IconSection={IconPlus}
                    handleAction={() =>
                        form.insertListItem("consumibles", {
                            consumible_id: null,
                            cantidad: 1,
                        })
                    }
                >
                    Agregar otro consumible
                </BtnSection>

                <BtnSubmit IconSection={IconSend}>Enviar solicitud</BtnSubmit>
            </Stack>
        </Box>
    );
};
