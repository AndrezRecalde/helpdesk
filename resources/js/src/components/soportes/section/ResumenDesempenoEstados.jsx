import { SimpleGrid } from "@mantine/core";
import {
    ChartPieEficiencia,
    TableDesempenoEstados,
    TextSection,
    TitlePage,
} from "../..";
import { useIndicadorStore } from "../../../hooks";

export const ResumenDesempenoEstados = () => {
    const { sumaDesempenoForEstados } = useIndicadorStore();

    return (
        <>
            <TitlePage fw={900} mt={20} order={3}>
                A. EFICIENCIA DE DESEMPEÑO
            </TitlePage>
            <TextSection fw={700} tt="" fz={16} ta="left">
                {sumaDesempenoForEstados} casos corresponden al 100%
            </TextSection>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                <TableDesempenoEstados />
                <ChartPieEficiencia />
            </SimpleGrid>
        </>
    );
};
