import { useEffect, useState } from "react";
import { Box, Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
    useDireccionStore,
    useInvCategoriaStore,
    useInvEquipoStore,
    useInvEstadoStore,
    useStorageField,
    useUsersStore,
} from "../../../../hooks";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterFormEquipos = () => {
    const { startLoadInvEquipos } = useInvEquipoStore();
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();
    const { startLoadUsersGeneral, users, clearUsers } = useUsersStore();
    const { startLoadInvCategorias, categorias, startClearInvCategorias } =
        useInvCategoriaStore();
    const { startLoadInvEstados, invEstados, startClearInvEstados } =
        useInvEstadoStore();
    const { setStorageFields } = useStorageField();

    const [resultados, setResultados] = useState([]);

    const form = useForm({
        initialValues: {
            campo: "codigo",
            valor: "",
        },
        /* validate: {
            campo: isNotEmpty("Por favor seleccione un filtro"),
            valor: isNotEmpty("Por favor ingrese la búsqueda"),
        }, */
    });

    const { campo } = form.values;

    useEffect(() => {
        //console.log("Campo seleccionado:", campo);

        const loadData = async () => {
            switch (campo) {
                case "direccion":
                    await startLoadDirecciones(); // Cargar datos (pero aún no estarán disponibles aquí)
                    form.setFieldValue("valor", null);
                    break;
                case "usuario":
                    await startLoadUsersGeneral({});
                    form.setFieldValue("valor", null);
                    break;
                case "categoria":
                    await startLoadInvCategorias({});
                    form.setFieldValue("valor", null);
                    break;
                case "estado":
                    await startLoadInvEstados();
                    form.setFieldValue("valor", null);
                    break;
                default:
                    setResultados([]);
                    return;
            }
        };

        loadData();

        return () => {
            clearDirecciones();
            clearUsers();
            startClearInvCategorias();
            startClearInvEstados();
            setResultados([]); // Limpiamos al desmontar
        };
    }, [campo]); // Se ejecuta solo cuando `campo` cambia

    // Nuevo useEffect para actualizar resultados cuando los datos estén listos
    useEffect(() => {
        let data = [];

        switch (campo) {
            case "direccion":
                data =
                    direcciones?.map((d) => ({
                        value: d.nmbre_dprtmnto,
                        label: d.nmbre_dprtmnto,
                    })) || [];
                break;
            case "usuario":
                data =
                    users?.map((u) => ({
                        value: u.nmbre_usrio,
                        label: u.nmbre_usrio,
                    })) || [];
                break;
            case "categoria":
                data =
                    categorias?.map((c) => ({
                        value: c.nombre_categoria,
                        label: c.nombre_categoria,
                    })) || [];
                break;
            case "estado":
                data =
                    invEstados?.map((e) => ({
                        value: e.nombre_estado,
                        label: e.nombre_estado,
                    })) || [];
                break;
            default:
                data = [];
        }

        setResultados(data);
        //console.log("Resultados actualizados:", data);
    }, [campo, direcciones, users, categorias, invEstados]); // Se ejecuta cuando los datos cambian

    /* const handleSearch = (e) => {
        e.preventDefault();
    }; */

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        const values = { ...form.getTransformedValues() };
        console.log(values);
        startLoadInvEquipos(values);
        setStorageFields(values);
        //form.reset();
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fz={16} fw={500}>
                    Filtrar Equipos
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={10}>
                    <Select
                        key={campo}
                        searchable
                        //clearable
                        label="Seleccione el filtro"
                        placeholder="Elige el campo a buscar"
                        {...form.getInputProps("campo")}
                        nothingFoundMessage="Nothing found..."
                        classNames={classes}
                        data={[
                            { value: "direccion", label: "Dirección" },
                            { value: "usuario", label: "Usuario" },
                            { value: "codigo", label: "Código" },
                            { value: "categoria", label: "Categoría" },
                            { value: "numero_serie", label: "Número de Serie" },
                            { value: "estado", label: "Estado" },
                        ]}
                    />
                    {campo === "codigo" || campo === "numero_serie" ? (
                        <TextInput
                            key={`text-${campo}`}
                            label="Búsqueda"
                            placeholder="Ingrese búsqueda..."
                            icon={<IconSearch size={16} />}
                            classNames={classes}
                            {...form.getInputProps("valor")}
                            /* onKeyDown={(event) => {
                                if (event.key === "Enter") handleSearch();
                            }} */
                        />
                    ) : (
                        <Select
                            key={`select-${campo}`}
                            searchable
                            clearable
                            label={`Seleccione ${campo}`}
                            classNames={classes}
                            {...form.getInputProps("valor")}
                            nothingFoundMessage="Nothing found..."
                            data={resultados}
                        />
                    )}
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch}>Buscar</BtnSubmit>
            </Box>
        </Fieldset>
    );
};
