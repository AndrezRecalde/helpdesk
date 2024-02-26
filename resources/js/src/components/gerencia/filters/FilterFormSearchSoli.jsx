import { Fieldset, SimpleGrid, Text } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";

export const FilterFormSearchSoli = () => {
    return (
        <Fieldset mt={20} legend={<Text>Filtrar usuarios</Text>}>
            <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 2 }} mt={10}>
                <DateInput
                    //dateParser={dateParser}
                    valueFormat="DD/MM/YYYY"
                    label="fecha inicio"
                    placeholder="Type WW2"
                />
                <DateInput
                    //dateParser={dateParser}
                    valueFormat="DD/MM/YYYY"
                    label="Fecha final"
                    placeholder="Type WW2"
                />
            </SimpleGrid>

            <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                Buscar
            </BtnSubmit>
        </Fieldset>
    );
};
