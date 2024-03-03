import { Grid, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEmpresaStore } from "../../../hooks";

export const FormTrabajoUser = ({ form }) => {
    const { empresas } = useEmpresaStore();
    return (
        <Grid>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Empresa"
                    placeholder="Elige la empresa"
                    data={empresas.map(empresa => {
                        return {
                            value: empresa.idnom_empresa.toString(),
                            label: empresa.nom_empresa
                        }
                    })}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Dirección"
                    placeholder="Seleccione la dirección/gestión"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Cargo"
                    placeholder="Elige el cargo"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Tipo de usuario"
                    placeholder="Seleccione"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Tipo de contrato"
                    placeholder="Seleccione"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Contrato fecha vencimiento"
                    placeholder="Seleccione"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                <DateInput
                    label="Fecha de finalización"
                    placeholder="Digite la fecha"
                />
            </Grid.Col>
        </Grid>
    );
};
