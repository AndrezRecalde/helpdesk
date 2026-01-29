import { Box, Fieldset, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { BtnSubmit, TextSection } from "../../..";
import { useDireccionStore, useDirectorStore } from "../../../../hooks";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import classes from '../../../../assets/styles/modules/layout/input/LabelsInputs.module.css'

export const FilterFormDirecciones = () => {
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();
    const { startLoadDirectores } = useDirectorStore();

    const form = useForm({
        initialValues: {
            cdgo_dprtmnto: "",
        },
        /* transformValues: (values) => ({
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto) || ""
        }) */
    });

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadDirectores(form.getValues());
        //console.log(form.getValues());
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    Filtrar dirección
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Select
                    searchable
                    clearable
                    label="Dirección"
                    placeholder="Elige la dirección"
                    classNames={classes}
                    {...form.getInputProps("cdgo_dprtmnto")}
                    data={direcciones.map((direccion) => {
                        return {
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        };
                    })}
                />
                <BtnSubmit IconSection={IconSearch}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
