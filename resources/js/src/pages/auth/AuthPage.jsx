import { Divider, Image, Paper } from "@mantine/core";
import { AuthForm, BtnServicesApps } from "../../components";
import { useTitlePage } from "../../hooks";
import classes from "../../assets/styles/modules/auth/AuthPageBackground.module.css";

const AuthPage = () => {
    const imagenes = JSON.parse(localStorage.getItem("service_images")) || [];
    useTitlePage("Autenticación - Intranet");

    return (
        <div
            className={classes.wrapper}
            style={{
                backgroundImage: `url(${imagenes[0]?.imagen_fondo || 'https://placehold.co/1920x1080'})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Paper
                withBorder
                shadow="lg"
                radius="md"
                className={classes.wrapper_paper}
            >
                <Image
                    radius="xs"
                    h={180}
                    src={imagenes[0]?.imagen_login || 'https://placehold.co/600x400?text=Placeholder'}
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
                <AuthForm />
                <Divider
                    my="xs"
                    label="Otros servicios"
                    labelPosition="center"
                />
                <BtnServicesApps />
            </Paper>
        </div>
    );
};

export default AuthPage;
