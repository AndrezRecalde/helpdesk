import { Fieldset, Radio, SimpleGrid, Skeleton } from "@mantine/core";
import { TextSection } from "../../../../components";
import { useVacacionesStore } from "../../../../hooks";

export const MotivosVacacionesField = ({ form }) => {
    const { motivos: arrayMotivos, isLoadingMotivos } = useVacacionesStore();

    return (
        <Fieldset
            legend={
                <TextSection tt="" fz={18} fw={500}>
                    Motivo*
                </TextSection>
            }
            p={20}
        >
            <Radio.Group
                withAsterisk
                {...form.getInputProps("motivo_id")}
                name="motivos"
            >
                <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 3, lg: 3 }}>
                    {isLoadingMotivos
                        ? Array.from({ length: 9 }).map((_, i) => (
                              <Skeleton key={i} height={28} radius="sm" />
                          ))
                        : arrayMotivos.map((motivo) => (
                              <Radio
                                  key={motivo.id}
                                  label={motivo.motivo_vacaciones}
                                  color="teal.4"
                                  value={motivo.id.toString()}
                              />
                          ))}
                </SimpleGrid>
            </Radio.Group>
        </Fieldset>
    );
};
