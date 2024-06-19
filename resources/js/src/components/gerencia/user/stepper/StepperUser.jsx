import { Button, Group, Stepper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import {
    FormInfoUser,
    FormTipoUser,
    FormTrabajoUser,
} from "../../..";
import { IconSend } from "@tabler/icons-react";
import { useUiUser, useUsersStore } from "../../../../hooks";

export const StepperUser = ({ form }) => {
    const [active, setActive] = useState(0);
    const { activateUser } = useUsersStore();
    const { modalActionUser } = useUiUser();
    const { startAddUser } = useUsersStore();
    const usuario = JSON.parse(localStorage.getItem("service_user"));

    useEffect(() => {
      if (activateUser !== null) {
        //console.log('hola')
        form.setValues({
            ...activateUser,
            sexo: activateUser.sexo.toString(),
            usu_id_empresa: activateUser.usu_id_empresa?.toString(),
            cdgo_direccion: activateUser.cdgo_direccion?.toString(),
            crgo_id: activateUser.crgo_id?.toString(),
            id_tipo_usuario: activateUser.id_tipo_usuario?.toString(),
            usu_ult_tipo_contrato: activateUser.usu_ult_tipo_contrato?.toString(),
            finaliza_contrato: activateUser.finaliza_contrato?.toString(),
            usu_f_f_contrato: activateUser.usu_f_f_contrato?.toString(),

            tecnico: activateUser.tecnico?.toString(),
            secretaria_tic: activateUser.secretaria_tic?.toString(),
            super_user: activateUser.super_user?.toString(),
            interno: activateUser.interno?.toString(),
            usu_estado: activateUser.usu_estado?.toString(),
        })
        return;
      }

    }, [activateUser]);

    useEffect(() => {
      form.setFieldValue("usu_ing", usuario.cdgo_usrio.toString());

    }, []);




    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const handleStepChange = () => {
        const { errors } = form.validate();

        switch (active) {
            case 0:
                if (
                    errors.hasOwnProperty("usu_ci") ||
                    errors.hasOwnProperty("titulo") ||
                    errors.hasOwnProperty("nmbre_usrio") ||
                    errors.hasOwnProperty("nombre_formateado") ||
                    errors.hasOwnProperty("email") ||
                    errors.hasOwnProperty("sexo") ||
                    errors.hasOwnProperty("lgin") ||
                    errors.hasOwnProperty("actvo")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) => current < 3 ? current + 1 : current);
                    form.clearErrors();
                }
                break;

            case 1:
                if (
                    errors.hasOwnProperty("usu_id_empresa") ||
                    errors.hasOwnProperty("cdgo_direccion") ||
                    errors.hasOwnProperty("crgo_id") ||
                    errors.hasOwnProperty("id_tipo_usuario") ||
                    errors.hasOwnProperty("usu_ult_tipo_contrato") ||
                    errors.hasOwnProperty("finaliza_contrato") ||
                    errors.hasOwnProperty("usu_f_f_contrato")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) => current < 3 ? current + 1 : current);
                    form.clearErrors();
                }
                break;

            case 2:
                if (
                    errors.hasOwnProperty("tecnico") ||
                    errors.hasOwnProperty("secretaria_tic") ||
                    errors.hasOwnProperty("super_user") ||
                    errors.hasOwnProperty("interno") ||
                    errors.hasOwnProperty("usu_estado") ||
                    errors.hasOwnProperty("usu_alias")
                    //errors.hasOwnProperty("usu_ing")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) => current < 3 ? current + 1 : current);
                    form.clearErrors();
                }
                break;

            default:
                break;
        }
        /* } */

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /* if (errores) {
            //console.log(form.getTransformedValues());
            startAddUser(form.getTransformedValues());
        } */
        //console.log(form.getTransformedValues());
        startAddUser(form.getTransformedValues());
        modalActionUser(0);
        form.reset();
    }

    const { nmbre_usrio } = form.values;



    return (
        <>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step
                    label="Informacion"
                    description="Información del usuario"
                    allowStepSelect={active > 0}
                    allowStepClick={false}
                >
                    <FormInfoUser form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Laboral"
                    description="Información laboral"
                    allowStepSelect={active > 1}
                    allowStepClick={false}
                >
                    <FormTrabajoUser form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Tipo de usuario"
                    description="Paso final"
                    allowStepSelect={active > 2}
                    allowStepClick={false}
                >
                    <FormTipoUser form={form} />
                </Stepper.Step>

                <Stepper.Completed>
                    <Title order={5}>
                        ¿Confirma en crear el{" "}
                        <Text span c="blue" inherit>
                            usuario:{" "}
                        </Text>
                        {nmbre_usrio} ?
                    </Title>
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                {active === 3 ? (
                    <Group justify="center" mt="xl">
                        <Button
                            variant="default"
                            onClick={prevStep}
                        >
                            Regresar
                        </Button>
                        <Button
                            variant="gradient"
                            gradient={{ from: "teal", to: "blue", deg: 105 }}
                            color="green"
                            radius="md"
                            leftSection={<IconSend />}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Agregar usuario
                        </Button>
                    </Group>
                ) : (
                    <Group justify="center" mt="xl">
                        <Button
                            variant="default"
                            onClick={prevStep}
                        >
                            Regresar
                        </Button>
                        <Button onClick={handleStepChange}>
                            Siguiente
                        </Button>
                    </Group>
                )}
            </Group>
        </>
    );
};
