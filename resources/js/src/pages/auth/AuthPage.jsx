import { Divider, Image, Paper } from "@mantine/core";
import { useTitlePage } from "../../hooks";
import {
    AuthForm,
    BtnServicesApps,
} from "../../components";
import classes from "../../assets/styles/modules/auth/AuthPageBackground.module.css";

const AuthPage = () => {
    useTitlePage("Helpdesk | Login");

    return (
        <div className={classes.wrapper}>
            <Paper
                withBorder
                shadow="lg"
                radius="md"
                className={classes.wrapper_paper}
            >
                <Image
                    radius="xs"
                    h={180}
                    src="https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2025/07/login_prefectura.png"
                />
                <AuthForm />
                <Divider my="xs" label="Otros servicios" labelPosition="center" />
                <BtnServicesApps />
            </Paper>
        </div>
    );
};

export default AuthPage;
