import {
    ActionIcon,
    Box,
    NumberInput,
    Select,
    SimpleGrid,
    Stack,
    Textarea,
} from "@mantine/core";
import { IconPlus, IconSend, IconTrash } from "@tabler/icons-react";
import { TitlePage, BtnSubmit, BtnSection } from "../../../../components";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const SolicitudConsumibleForm = ({
    form,
    users,
    direcciones,
    consumibles,
    equipos,
    onSubmit,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form.getTransformedValues());
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
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                    <Select
                        required
                        searchable
                        clearable
                        label="Departamento Solicitante"
                        placeholder="Seleccione el departamento"
                        nothingFoundMessage="No encontrado..."
                        {...form.getInputProps("departamento_id")}
                        data={direcciones.map((direccion) => ({
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        }))}
                        classNames={classes}
                        onChange={(value) => {
                            form.setFieldValue("departamento_id", value);
                            form.setFieldValue("equipo_id", null); // Reset equipment when department changes
                        }}
                    />
                    <Select
                        required
                        searchable
                        clearable
                        label="Equipo"
                        placeholder="Seleccione el equipo"
                        nothingFoundMessage="No encontrado..."
                        {...form.getInputProps("equipo_id")}
                        data={
                            Array.isArray(equipos)
                                ? equipos
                                      .filter(
                                          (cat) =>
                                              cat.equipos &&
                                              Array.isArray(cat.equipos) &&
                                              cat.equipos.length > 0,
                                      )
                                      .flatMap((cat) =>
                                          cat.equipos
                                              .filter(
                                                  (eq) =>
                                                      eq.direccion_id ===
                                                      parseInt(
                                                          form.values
                                                              .departamento_id,
                                                      ),
                                              )
                                              .map((eq) => ({
                                                  value: eq.id.toString(),
                                                  label: `${eq.codigo_nuevo || eq.codigo_antiguo} - ${cat.nombre_categoria}`,
                                              })),
                                      )
                                : []
                        }
                        classNames={classes}
                        disabled={!form.values.departamento_id}
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }}>
                    <Select
                        required
                        searchable
                        clearable
                        label="Usuario Solicitante"
                        placeholder="Seleccione el solicitante"
                        nothingFoundMessage="No encontrado..."
                        {...form.getInputProps("usuario_solicita")}
                        data={users.map((user) => ({
                            label: user.nmbre_usrio,
                            value: user.cdgo_usrio.toString(),
                        }))}
                        classNames={classes}
                    />
                </SimpleGrid>

                {/* <Select
                    required
                    searchable
                    clearable
                    label="Usuario Autorizador"
                    placeholder="Seleccione quien autoriza"
                    {...form.getInputProps("usuario_autoriza")}
                    data={users.map((user) => ({
                        label: user.nmbre_usrio,
                        value: user.cdgo_usrio.toString(),
                    }))}
                    classNames={classes}
                /> */}

                <Textarea
                    label="Observaciones"
                    placeholder="Ingrese observaciones (opcional)"
                    {...form.getInputProps("observaciones")}
                    classNames={classes}
                    minRows={2}
                />

                <TitlePage order={4} ta="left">
                    Consumibles Solicitados
                </TitlePage>

                {form.values.consumibles.map((_, index) => (
                    <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }} key={index}>
                        <TitlePage order={6} ta="left">
                            Item #{index + 1}
                        </TitlePage>
                        <Select
                            required
                            searchable
                            label="Consumible"
                            placeholder="Seleccione consumible"
                            nothingFoundMessage="No encontrado..."
                            {...form.getInputProps(`consumibles.${index}.id`)}
                            data={consumibles.map((consumible) => ({
                                label: `${consumible.nombre_consumible} (Stock: ${consumible.stock})`,
                                value: consumible.id.toString(),
                                disabled: consumible.stock === 0,
                            }))}
                            classNames={classes}
                        />
                        <NumberInput
                            required
                            label="Cantidad"
                            placeholder="Cantidad"
                            min={1}
                            {...form.getInputProps(
                                `consumibles.${index}.cantidad`,
                            )}
                            classNames={classes}
                        />
                        <ActionIcon
                            disabled={index === 0}
                            variant="filled"
                            color="red.7"
                            aria-label="Eliminar"
                            onClick={() =>
                                form.setFieldValue(
                                    "consumibles",
                                    form.values.consumibles.filter(
                                        (_, i) => i !== index,
                                    ),
                                )
                            }
                            style={{
                                alignSelf: "flex-end",
                                marginBottom: "4px",
                            }}
                        >
                            <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </SimpleGrid>
                ))}

                <BtnSection
                    IconSection={IconPlus}
                    handleAction={() =>
                        form.insertListItem("consumibles", {
                            id: null,
                            cantidad: 1,
                        })
                    }
                >
                    Agregar otro consumible
                </BtnSection>

                <BtnSubmit IconSection={IconSend}>Crear Solicitud</BtnSubmit>
            </Stack>
        </Box>
    );
};
