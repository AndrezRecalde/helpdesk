import { Box, Loader, Select, SimpleGrid, Stack } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    useDireccionStore,
    useStorageField,
    useUiInvCustodio,
    useUsersStore,
} from "../../../../hooks";

export const InvAsignarCustodioForm = ({
    form,
    setActivateElement,
    activateElement,
    startAsignarCustodioFn,
}) => {
    const { isLoading: loadingUsers, users } = useUsersStore();
    const { isLoading: loadingDirecciones, direcciones } = useDireccionStore();
    const { modalActionCustodio } = useUiInvCustodio();
    const { storageFields } = useStorageField();

    const handleSubmit = (e) => {
        e.preventDefault();
        startAsignarCustodioFn(
            activateElement,
            form.getTransformedValues(),
            storageFields,
        );
        if (activateElement !== null) {
            setActivateElement(null);
        }
        form.reset();
        modalActionCustodio(false);
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
                    searchable
                    label="Usuario"
                    placeholder="Seleccione el custodio"
                    {...form.getInputProps("user_id")}
                    rightSection={loadingUsers ? <Loader size={18} /> : null}
                    data={
                        users
                            ? users.map((user) => ({
                                  value: user.cdgo_usrio.toString(),
                                  label: user.nmbre_usrio,
                              }))
                            : "Cargando"
                    }
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
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
