import { SimpleGrid } from "@mantine/core";
import {
    ChartBarDesempAreas,
    TableDesempenoAreas,
    TitlePage,
} from "../../../components";

export const ResumenDesempenoArea = () => {
    return (
        <>
            <TitlePage mt={20} order={6}>
                CASOS POR ÁREA
            </TitlePage>
            <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                <TableDesempenoAreas />
                <ChartBarDesempAreas />
            </SimpleGrid>
        </>
    );
};
