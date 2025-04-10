import { Paper } from "@mantine/core";
import { useTitlePage } from "../../hooks";
import { AuthForm, BtnServicesApps, Logo, TextSection, TitlePage } from "../../components";
import classes from "../../assets/styles/modules/auth/AuthPageBackground.module.css";

const AuthPage = () => {
    useTitlePage("Helpdesk | Login");

    return (
        <div className={classes.wrapper}>
            <TitlePage ta="center" className={classes.title}>
                Sistema de Helpdesk
            </TitlePage>
            <Logo height={70} width={300} />
            <Paper
                withBorder
                shadow="md"
                p={30}
                mt={20}
                radius="md"
                className={classes.wrapper_paper}
            >
                <TextSection tt="" color="black" fz={20} fw={500} mb={20}>
                    Iniciar sesión
                </TextSection>
                <AuthForm />
                <BtnServicesApps />
            </Paper>
        </div>
    );
};

export default AuthPage;
