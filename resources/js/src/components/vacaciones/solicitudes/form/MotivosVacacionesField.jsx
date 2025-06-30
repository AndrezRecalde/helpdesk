import { Fieldset, Radio, SimpleGrid } from "@mantine/core";
import { TextSection } from "../../../../components";
import { useVacacionesStore } from "../../../../hooks";

export const MotivosVacacionesField = ({ form }) => {
    const { motivos: arrayMotivos } = useVacacionesStore();

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
                    {arrayMotivos.map((motivo) => (
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
