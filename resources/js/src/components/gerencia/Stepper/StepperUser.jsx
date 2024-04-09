import { Button, Group, Stepper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import {
    FormInfoUser,
    FormTipoUser,
    FormTrabajoUser,
} from "../../../components";
import { IconSend } from "@tabler/icons-react";
import { useUsersStore } from "../../../hooks";

export const StepperUser = ({ form }) => {
    const [active, setActive] = useState(0);
    const { activateUser } = useUsersStore();

    useEffect(() => {
      if (activateUser !== null) {
        form.setValues({
            ...activateUser
        })
        return;
      }

    }, [activateUser]);



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
        console.log(form.getTransformedValues());
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
