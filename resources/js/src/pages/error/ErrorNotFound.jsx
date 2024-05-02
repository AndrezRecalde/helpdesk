import { Container, Group, Text, Title } from "@mantine/core";
import { BtnSection } from "../../components";
import { useNavigate } from "react-router-dom";
import classes from "../../assets/styles/modules/error/NotFound.module.css";


export const ErrorNotFound = () => {

    const navigate = useNavigate();

    const handleAction = () => {
        navigate("/u/profile");
    }

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>
                Has encontrado un lugar secreto.
            </Title>
            <Text
                c="dimmed"
                size="lg"
                ta="center"
                className={classes.description}
            >
                Lamentablemente, esta es solo una página 404. Puede que hayas
                escrito mal la dirección o la página se ha movido a otra URL.
            </Text>
            <Group justify="center">
                <BtnSection handleAction={handleAction}>Ir a mi perfil</BtnSection>
            </Group>
        </Container>
    );
};
