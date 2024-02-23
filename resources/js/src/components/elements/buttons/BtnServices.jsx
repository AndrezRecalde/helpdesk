import { Button, rem } from "@mantine/core";

export const BtnSubmit = ({
    text,
    fullwidth = true,
    heigh = 45,
    fontSize = 18,
    IconSection,
}) => {
    return (
        <Button
            type="submit"
            fullWidth={fullwidth}
            mt="md"
            mb="md"
            rightSection={<IconSection />}
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
        >
            {text}
        </Button>
    );
};
