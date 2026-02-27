import { useEffect, useState } from "react";
import { Grid, Select, TextInput, Button, Fieldset } from "@mantine/core";
import { useDireccionStore, usePeriodoStore } from "../../../../hooks";
import { IconSearch } from "@tabler/icons-react";

export const FilterPeriodosVacacionales = () => {
    const { direcciones, startLoadDirecciones } = useDireccionStore();
    const { startLoadPeriodos } = usePeriodoStore();

    const [filterParams, setFilterParams] = useState({
        cdgo_direccion: null,
        nmbre_usrio: "",
    });

    useEffect(() => {
        startLoadDirecciones();
    }, []);

    const handleSearch = () => {
        startLoadPeriodos({
            cdgo_direccion: filterParams.cdgo_direccion,
            nmbre_usrio: filterParams.nmbre_usrio || null,
        });
    };

    const dataDirecciones = direcciones.map((dir) => ({
        value: dir.cdgo_dprtmnto.toString(),
        label: dir.nmbre_dprtmnto,
    }));

    return (
        <Fieldset legend="Filtros" mb="md">
            <Grid mb="md" align="flex-end">
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Select
                        label="Dirección / Departamento"
                        placeholder="Filtrar por dirección"
                        data={dataDirecciones}
                        value={filterParams.cdgo_direccion}
                        onChange={(value) =>
                            setFilterParams({
                                ...filterParams,
                                cdgo_direccion: value,
                            })
                        }
                        clearable
                        searchable
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <TextInput
                        label="Servidor"
                        placeholder="Filtrar por nombre"
                        value={filterParams.nmbre_usrio}
                        onChange={(e) =>
                            setFilterParams({
                                ...filterParams,
                                nmbre_usrio: e.target.value,
                            })
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Button
                        fullWidth
                        leftSection={<IconSearch size={18} />}
                        onClick={handleSearch}
                    >
                        Filtrar
                    </Button>
                </Grid.Col>
            </Grid>
        </Fieldset>
    );
};
