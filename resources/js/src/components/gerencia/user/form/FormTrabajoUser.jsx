import { useEffect } from "react";
import { Select, SimpleGrid, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
    useCargoStore,
    useDepartamentoStore,
    useDireccionStore,
    useEmpresaStore,
    useTipoContratoStore,
    useTipoUsuarioStore,
} from "../../../../hooks";

export const FormTrabajoUser = ({ form }) => {
    const { finaliza_contrato, cdgo_direccion } = form.values;
    const { empresas } = useEmpresaStore();
    const { direcciones } = useDireccionStore();
    const { cargos } = useCargoStore();
    const { tiposUsuarios } = useTipoUsuarioStore();
    const { tiposContratos } = useTipoContratoStore();
    const { startLoadDepartamentos, departamentos, clearDepartamentos } =
        useDepartamentoStore();

    useEffect(() => {
        if (cdgo_direccion !== null) {
            startLoadDepartamentos(cdgo_direccion);
        } else {
            form.setFieldValue("cdgo_dprtmnto", null);
            clearDepartamentos();
        }
    }, [cdgo_direccion]);

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <Select
                required
                searchable
                clearable
                label="Empresa"
                placeholder="Elige la empresa"
                {...form.getInputProps("usu_id_empresa")}
                data={empresas.map((empresa) => {
                    return {
                        value: empresa.idnom_empresa.toString(),
                        label: empresa.nom_empresa,
                    };
                })}
            />
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Dirección"
                    placeholder="Seleccione la dirección/gestión"
                    {...form.getInputProps("cdgo_direccion")}
                    data={direcciones.map((direccion) => {
                        return {
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        };
                    })}
                />
                {departamentos.length > 0 ? (
                    <Select
                        required
                        searchable
                        clearable
                        label="Departamento"
                        placeholder="Seleccione el departamento o subproceso"
                        {...form.getInputProps("cdgo_dprtmnto")}
                        data={departamentos.map((departamento) => {
                            return {
                                value: departamento.cdgo_dprtmnto.toString(),
                                label: departamento.nmbre_dprtmnto,
                            };
                        })}
                    />
                ) : null}
                <Select
                    required
                    searchable
                    clearable
                    label="Cargo"
                    placeholder="Elige el cargo"
                    {...form.getInputProps("crgo_id")}
                    data={cargos.map((cargo) => {
                        return {
                            value: cargo.idnom_cargo.toString(),
                            label: cargo.nom_cargo,
                        };
                    })}
                />
                <Select
                    required
                    searchable
                    clearable
                    label="Tipo de usuario"
                    placeholder="Seleccione"
                    {...form.getInputProps("id_tipo_usuario")}
                    data={tiposUsuarios.map((tipo) => {
                        return {
                            value: tipo.id_tipo_usuario.toString(),
                            label: tipo.nombre,
                        };
                    })}
                />
                <Select
                    required
                    searchable
                    clearable
                    label="Tipo de contrato"
                    placeholder="Seleccione"
                    {...form.getInputProps("usu_ult_tipo_contrato")}
                    data={tiposContratos.map((tc) => {
                        return {
                            value: tc.idnom_tipo_contrato.toString(),
                            label: tc.nom_tipo_contrato,
                        };
                    })}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Contrato fecha vencimiento"
                    placeholder="Seleccione"
                    {...form.getInputProps("finaliza_contrato")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />

                {finaliza_contrato === "1" ? (
                    <DateInput
                        label="Fecha de finalización"
                        placeholder="Digite la fecha (Vacía si no la sabe)"
                        valueFormat="YYYY-MM-DD"
                        {...form.getInputProps("usu_f_f_contrato")}
                    />
                ) : null}
            </SimpleGrid>
        </Stack>
    );
};
