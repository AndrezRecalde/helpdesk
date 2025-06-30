import {
    Checkbox,
    Fieldset,
    Loader,
    Select,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { TextSection } from "../../../../components";
import { useDireccionStore, useUsersStore } from "../../../../hooks";
import { useEffect, useState } from "react";
import { Roles } from "../../../../helpers/dictionary";

export const JefesVacacionesField = ({ form, classes }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { direccion_id, tiene_jefe, tiene_director } = form.values;
    const { direcciones } = useDireccionStore();
    const { startLoadUsersExtrict, users, isLoading, clearUsers } =
        useUsersStore();
    const [jefeField, setJefeField] = useState(true);
    const [directorField, setDirectorField] = useState(true);

    useEffect(() => {
        if (
            usuario.role !== Roles.TIC_GERENTE &&
            usuario.role !== Roles.NOM_ASISTENCIA
        ) {
            form.setValues({
                direccion_id: usuario.cdgo_dprtmnto.toString(),
                cdgo_usrio: usuario.cdgo_usrio.toString(),
            });
            return;
        }
    }, [direccion_id]);

    useEffect(() => {
        if (direccion_id) {
            startLoadUsersExtrict(direccion_id);
            return;
        }
        return () => {
            clearUsers();
        };
    }, [direccion_id]);

    useEffect(() => {
        if (tiene_jefe && direccion_id) {
            setJefeField(false);
            setDirectorField(true);
            form.setFieldValue("jefe_id", null);
            return;
        }
    }, [tiene_jefe, direccion_id]);

    useEffect(() => {
        if (tiene_director && direccion_id) {
            setDirectorField(false);
            setJefeField(true);
            form.setFieldValue("director_id", null);
            return;
        }
    }, [tiene_director, direccion_id]);

    useEffect(() => {
        if (!tiene_jefe && !tiene_director) {
            setDirectorField(true);
            setJefeField(true);
        }
    }, [tiene_jefe, tiene_director]);

    return (
        <Fieldset
            legend={
                <TextSection tt="" fz={18} fw={500}>
                    Seleccione Jefe(s) Inmediato(s)*
                </TextSection>
            }
            p={20}
        >
            <Stack>
                <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                    <Select
                        withAsterisk
                        searchable
                        clearable
                        label="Departamento del solicitante"
                        placeholder="Seleccione el departamento"
                        nothingFoundMessage="Nothing found..."
                        classNames={classes}
                        data={direcciones.map((direccion) => {
                            return {
                                label: direccion.nmbre_dprtmnto,
                                value: direccion.cdgo_dprtmnto.toString(),
                            };
                        })}
                        {...form.getInputProps("direccion_id")}
                    />
                    <Select
                        withAsterisk
                        searchable
                        clearable
                        label="Solicitante"
                        placeholder="Seleccione el solicitante"
                        nothingFoundMessage="Nothing found..."
                        classNames={classes}
                        data={users.map((solicitante) => {
                            return {
                                label: solicitante.nmbre_usrio,
                                value: solicitante.cdgo_usrio.toString(),
                            };
                        })}
                        {...form.getInputProps("cdgo_usrio")}
                    />
                    <Checkbox
                        color="teal.4"
                        iconColor="dark.8"
                        //size="md"
                        label="¿Jefe Departamental?"
                        {...form.getInputProps("tiene_jefe", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        color="teal.4"
                        iconColor="dark.8"
                        //size="md"
                        label="¿Director Departamental?"
                        {...form.getInputProps("tiene_director", {
                            type: "checkbox",
                        })}
                    />
                </SimpleGrid>
                <SimpleGrid
                    cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}
                    mt={10}
                >
                    <Select
                        withAsterisk
                        searchable
                        clearable
                        label="Jefe Departamental"
                        placeholder="Selecciona tu jefe departamental"
                        nothingFoundMessage="Nothing found..."
                        classNames={classes}
                        disabled={jefeField}
                        data={users.map((jefe) => {
                            return {
                                label: jefe.nmbre_usrio,
                                value: jefe.cdgo_usrio.toString(),
                            };
                        })}
                        rightSection={isLoading ? <Loader size={18} /> : null}
                        {...form.getInputProps("jefe_id")}
                    />
                    <Select
                        withAsterisk
                        searchable
                        clearable
                        label="Director Departamental"
                        placeholder="Selecciona el director de tu área"
                        nothingFoundMessage="Nothing found..."
                        classNames={classes}
                        disabled={directorField}
                        data={users.map((director) => {
                            return {
                                label: director.nmbre_usrio,
                                value: director.cdgo_usrio.toString(),
                            };
                        })}
                        rightSection={isLoading ? <Loader size={18} /> : null}
                        {...form.getInputProps("director_id")}
                    />
                </SimpleGrid>
            </Stack>
        </Fieldset>
    );
};
