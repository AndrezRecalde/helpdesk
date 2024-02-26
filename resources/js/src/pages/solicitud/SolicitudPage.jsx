import { Paper, Text, Textarea, Group, Container } from '@mantine/core';
import { BtnSubmit, ContactIconsList } from '../../components';
import { IconSend } from '@tabler/icons-react';

import bg from '../../assets/images/bg.svg';
import classes from '../../assets/styles/modules/solicitud/GetInTouch.module.css';

export const SolicitudPage = () => {
    return (
        <Container my={50}>
            <Paper shadow="md" radius="sm">
                <div className={classes.wrapper}>
                    <div
                        className={classes.contacts}
                        style={{ backgroundImage: `url(${bg})` }}
                    >
                        <Text
                            fz="lg"
                            fw={700}
                            className={classes.title}
                            c="#fff"
                        >
                            Información
                        </Text>

                        <ContactIconsList />
                    </div>

                    <form
                        className={classes.form}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Text fz="lg" fw={700} className={classes.title}>
                            Solicitud de Soporte
                        </Text>

                        <div className={classes.fields}>

                            <Textarea
                                mt="md"
                                label="Incidencia"
                                placeholder="Escribe el detalle de tu incidencia"
                                autosize
                                minRows={5}
                                maxRows={5}
                            />

                            <Group justify="center" mt="md">
                                {/* <Button
                                    type="submit"
                                    className={classes.control}
                                >
                                    Solicitar soporte
                                </Button> */}
                                <BtnSubmit fontSize={14} IconSection={IconSend}>Solicitar soporte</BtnSubmit>
                            </Group>
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
    );
};
