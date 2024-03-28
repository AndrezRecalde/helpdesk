import { Paper, Text } from "@mantine/core";
import { useTitle } from "../../hooks";
import { AuthForm, Logo, TitlePage } from "../../components";
import classes from "../../assets/styles/modules/auth/AuthPageBackground.module.css";

export const AuthPage = () => {
    useTitle("Helpdesk | Login");

    return (
        <div className={classes.wrapper}>
            <TitlePage ta="center" className={classes.title}>
                Sistema de Helpdesk
            </TitlePage>
            <Logo height={70} width={200} />
            <Paper
                withBorder
                shadow="md"
                p={30}
                mt={20}
                radius="md"
                className={classes.wrapper_paper}
            >
                <Text size="lg" fw={500} mb={15}>
                    Iniciar sesión
                </Text>
                <AuthForm />
            </Paper>
        </div>
    );
};
