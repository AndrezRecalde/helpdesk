import { SimpleGrid } from "@mantine/core";
import {
    ChartBarSoportes,
    TableDesempenoAreas,
    TitlePage,
} from "../../../components";
import { useIndicadorStore } from "../../../hooks";

export const ResumenDesempenoArea = () => {
    const { desempenoForAreas } = useIndicadorStore();
    return (
        <>
            <TitlePage mt={20} order={6}>
                CASOS POR ÁREA
            </TitlePage>
            <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
                <TableDesempenoAreas />
                <ChartBarSoportes data={desempenoForAreas} />
            </SimpleGrid>
        </>
    );
};
