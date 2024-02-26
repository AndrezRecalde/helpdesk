import { Fieldset, Select, SimpleGrid, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";

export const FilterFormDirecciones = () => {
    return (
        <Fieldset mt={20} legend={<Text>Filtrar dirección</Text>}>
            <SimpleGrid cols={{ base: 1}} mt={10}>
                <Select
                    label="Dirección"
                    placeholder="Elige la dirección"
                    data={["React", "Angular", "Vue", "Svelte"]}
                />
            </SimpleGrid>
            <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                Buscar
            </BtnSubmit>
        </Fieldset>
    );
};
