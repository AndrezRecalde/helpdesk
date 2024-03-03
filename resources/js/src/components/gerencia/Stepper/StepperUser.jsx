import { Button, Group, Stepper, Text, Title } from "@mantine/core";
import { useState } from "react";
import {
    FormInfoUser,
    FormTipoUser,
    FormTrabajoUser,
} from "../../../components";
import { IconSend } from "@tabler/icons-react";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";

export const StepperUser = () => {
    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            usu_ci: "",
            titulo: "",
            nmbre_usrio: "",
            nombre_formateado: "",
            email: "",
            sexo: "",
            lgin: "",
            actvo: "",

            usu_id_empresa: null,
            cdgo_direccion: null,
            crgo_id: null,
            id_tipo_usuario: null,
            usu_ult_tipo_contrato: null,
            finaliza_contrato: null,
            usu_f_f_contrato: "",

            tecnico: "",
            secretaria_tic: "",
            super_user: "",
            interno: "",
            usu_estado: null,
            usu_alias: "",
            usu_ing: "",
        },
        validate: {
            usu_ci: hasLength(
                { min: 10, max: 10 },
                "Por favor ingrese la cédula 10 dígitos"
            ),
            titulo: hasLength(
                { min: 2, max: 5 },
                "Por favor ingrese titulo del usuario"
            ),
            nmbre_usrio: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ),
            nombre_formateado: isNotEmpty(
                "Por favor digite el nombre formateado"
            ),
            email: isEmail("Dígite un email valido"),
            sexo: isNotEmpty("Por favor seleccione una opción"),
            lgin: isNotEmpty("Por favor ingrese el usuario login"),
            actvo: isNotEmpty("Por favor seleccione el estado"),

            usu_id_empresa: isNotEmpty("Por favor seleccione una opción"),
            cdgo_direccion: isNotEmpty("Por favor seleccione una opción"),
            crgo_id: isNotEmpty("Por favor seleccione una opción"),
            id_tipo_usuario: isNotEmpty("Por favor seleccione una opción"),
            usu_ult_tipo_contrato: isNotEmpty(
                "Por favor seleccione una opción"
            ),
            finaliza_contrato: isNotEmpty("Por favor seleccione una opción"),
            usu_f_f_contrato: isNotEmpty("Por favor ingrese la fecha"),

            tecnico: isNotEmpty("Por favor seleccione una opción"),
            secretaria_tic: isNotEmpty("Por favor selecciona una opción"),
            super_user: isNotEmpty("Por favor selecciona una opción"),
            interno: isNotEmpty("Por favor selecciona una opción"),
            usu_estado: isNotEmpty("Por favor selecciona una opción"),
            usu_alias: isNotEmpty("Por favor ingrese el alias del usuario"),
        },
    });

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

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
                    setActive((current) => current < 2 ? current + 1 : current);
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
                    setActive((current) => current < 2 ? current + 1 : current);
                    form.clearErrors();
                }
                break;

            default:
                break;
        }
        /* } */

    };

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
                    <FormTipoUser />
                </Stepper.Step>

                <Stepper.Completed>
                    <Title order={5}>
                        ¿Confirma en crear el
                        <Text span c="blue" inherit>
                            usuario
                        </Text>
                        {nmbre_usrio} ?
                    </Title>
                </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
                {active === 2 ? (
                    <Group justify="center" mt="xl">
                        <Button
                            variant="default"
                            onClick={prevStep}
                        >
                            Regresar
                        </Button>
                        <Button
                            variant="gradient"
                            gradient={{ from: "indigo", to: "blue", deg: 105 }}
                            color="green"
                            radius="md"
                            leftIcon={<IconSend />}
                            onClick={() => console.log("clic")}
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
