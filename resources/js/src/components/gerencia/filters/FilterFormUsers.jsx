import { Fieldset, Select, SimpleGrid, Text, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconSearch } from "@tabler/icons-react";

export const FilterFormUsers = () => {
    return (
        <Fieldset mt={20} legend={<Text>Filtrar usuarios</Text>}>
            <SimpleGrid cols={{ base: 1, sm: 1, md: 3, lg: 3 }} mt={10}>
                <Select
                    label="Dirección"
                    placeholder="Elige la dirección"
                    data={["React", "Angular", "Vue", "Svelte"]}
                />
                <TextInput
                    label="Nombres"
                    placeholder="Filtrar por nombre"
                />
                <TextInput
                    label="Usuario"
                    placeholder="Filtrar por usuario"
                />
            </SimpleGrid>
            <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                Buscar
            </BtnSubmit>
        </Fieldset>
    );
};
