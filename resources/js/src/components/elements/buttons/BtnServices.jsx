import { Button, rem } from "@mantine/core";

export const BtnSubmit = ({
    children,
    fullwidth = true,
    heigh = 45,
    fontSize = 18,
    IconSection,
}) => {
    return (
        <Button
            color="indigo.7"
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
            {children}
        </Button>
    );
};

export const BtnSection = ({
    heigh = 35,
    fontSize = 14,
    mb = 0,
    mt = 0,
    handleAction,
    children,
}) => {
    return (
        <Button
            mt={mt}
            mb={mb}
            color="indigo.7"
            variant="light"
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
            onClick={(e) => handleAction(e)}
        >
            {children}
        </Button>
    );
};
