import { Title, Text, Container, Group } from "@mantine/core";
import { BtnSection } from "../../components";
import { useNavigate } from "react-router-dom";
import classes from "../../assets/styles/modules/error/Forbidden.module.css";


export const ErrorAccessDenied = () => {

    const navigate = useNavigate();
    const handleAction = () => {
        navigate("/u/profile");
    }

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>403</div>
                <Title className={classes.title}>
                    El accesso a esta página esta restringida...
                </Title>
                <Text size="lg" ta="center" className={classes.description}>
                    Consulte con el administrador del sitio si cree que se trata
                    de un error.
                </Text>
                <Group justify="center">
                    <BtnSection handleAction={handleAction}>Ir a mi perfil</BtnSection>
                </Group>
            </Container>
        </div>
    );
};
