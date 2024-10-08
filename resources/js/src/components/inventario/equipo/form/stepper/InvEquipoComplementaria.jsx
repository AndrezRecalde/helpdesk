import {
    Checkbox,
    Group,
    NumberInput,
    SimpleGrid,
    Stack,
    Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const InvEquipoComplementaria = ({ form }) => {
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <Checkbox.Group
                defaultValue={["bien_adquirido"]}
                label="Selecione la modalidad del bien"
                withAsterisk
            >
                <Group mt="xs">
                    <Checkbox value="bien_adquirido" label="Bien adquirido" />
                    <Checkbox value="bien_donado" label="Bien donado" />
                    <Checkbox value="bien_usado" label="Bien usado" />
                </Group>
            </Checkbox.Group>
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
                label="Vida útil"
                placeholder="Seleccione la vida útil en años"
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
