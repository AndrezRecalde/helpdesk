import { Alert } from "@mantine/core";

export const AlertSection = ({ variant, color, icon:Icon, title, text }) => {
    return (
        <Alert
            variant={variant}
            color={color}
            title={title}
            icon={<Icon />}
            mt={10}
            mb={20}
        >
            {text}
        </Alert>
    );
};
