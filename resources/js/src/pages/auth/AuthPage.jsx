import { Image, Paper } from "@mantine/core";
import { useTitlePage } from "../../hooks";
import {
    AuthForm,
    BtnServicesApps,
    //Logo,
    //TextSection,
    //TitlePage,
} from "../../components";
import classes from "../../assets/styles/modules/auth/AuthPageBackground.module.css";

const AuthPage = () => {
    useTitlePage("Helpdesk | Login");

    return (
        <div className={classes.wrapper}>
            <Paper
                withBorder
                shadow="md"
                radius="md"
                className={classes.wrapper_paper}
            >
                <Image
                    radius="xs"
                    h={180}
                    src="https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2025/06/INICIAR-SESION-2.png"
                />
                <AuthForm />
                <BtnServicesApps />
            </Paper>
        </div>
    );
};

export default AuthPage;
