import { Grid, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
    useCargoStore,
    useDireccionStore,
    useEmpresaStore,
    useTipoContratoStore,
    useTipoUsuarioStore,
} from "../../../hooks";

export const FormTrabajoUser = ({ form }) => {
    const { finaliza_contrato } = form.values;
    const { empresas } = useEmpresaStore();
    const { direcciones } = useDireccionStore();
    const { cargos } = useCargoStore();
    const { tiposUsuarios } = useTipoUsuarioStore();
    const { tiposContratos } = useTipoContratoStore();

    return (
        <Grid>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Contrato fecha vencimiento"
                    placeholder="Seleccione"
                    {...form.getInputProps("finaliza_contrato")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "2", label: "No" },
                    ]}
                />
            </Grid.Col>

            {finaliza_contrato === "1" ? (
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <DateInput
                        label="Fecha de finalización"
                        description="Vacía si no la sabe"
                        placeholder="Digite la fecha"
                        valueFormat="YYYY-MM-DD"
                        {...form.getInputProps("usu_f_f_contrato")}
                    />
                </Grid.Col>
            ) : null}
        </Grid>
    );
};
