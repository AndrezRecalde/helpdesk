import {
    Checkbox,
    Group,
    NumberInput,
    SimpleGrid,
    Stack,
    Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { TextSection } from "../../../../../components";

export const InvEquipoComplementaria = ({ form }) => {
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <div>
                <TextSection fw={500}>Modalidad del bien: </TextSection>
                <Group>
                    <Checkbox
                        label="Bien adquirido"
                        {...form.getInputProps("bien_adquirido", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        label="Bien donado"
                        {...form.getInputProps("bien_donado", {
                            type: "checkbox",
                        })}
                    />
                    <Checkbox
                        label="Bien usado"
                        {...form.getInputProps("bien_usado", {
                            type: "checkbox",
                        })}
                    />
                </Group>
            </div>

            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <DateInput
                    //dateParser={dateParser}
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha adquisición"
                    placeholder="Seleccione fecha de adquisición"
                    {...form.getInputProps("fecha_adquisicion")}
                />
                <DateInput
                    //dateParser={dateParser}
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha amortización"
                    placeholder="Seleccione fecha de amortización"
                    {...form.getInputProps("fecha_amortizacion")}
                />
            </SimpleGrid>
            <NumberInput
                label="Vida útil (En años)"
                placeholder="Seleccione la vida útil en años"
                {...form.getInputProps("vida_util")}
            />
            <Textarea
                label="Descripción del equipo"
                autosize
                minRows={6}
                maxRows={8}
                {...form.getInputProps("descripcion")}
            />
        </Stack>
    );
};
