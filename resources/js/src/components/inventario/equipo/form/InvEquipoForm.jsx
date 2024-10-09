import { useState } from "react";
import { Button, Code, Group, Stepper } from "@mantine/core";
import {
    BtnSection,
    InvAsignacionForm,
    InvEquipoComplementaria,
    InvEquipoGeneralForm,
} from "./../../../../components";
import { IconChevronsLeft, IconChevronsRight, IconSend } from "@tabler/icons-react";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoForm = ({ form }) => {
    const { startAddInvEquipo } = useInvEquipoStore();
    const { modalActionEquipo } = useInvUiEquipo();
    const [active, setActive] = useState(0);

    const nextStep = () => {
        const { errors } = form.validate();

        switch (active) {
            case 0:
                if (
                    errors.hasOwnProperty("ubicacion_id") ||
                    errors.hasOwnProperty("modelo") ||
                    errors.hasOwnProperty("numero_serie") ||
                    errors.hasOwnProperty("marca_id") ||
                    errors.hasOwnProperty("estado_id") ||
                    errors.hasOwnProperty("tipocategoria_id") ||
                    errors.hasOwnProperty("categoria_id")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) =>
                        current < 3 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            case 1:
                if (
                    errors.hasOwnProperty("bien_adquirido") ||
                    errors.hasOwnProperty("bien_donado") ||
                    errors.hasOwnProperty("bien_usado") ||
                    errors.hasOwnProperty("vida_util") ||
                    errors.hasOwnProperty("descripcion")
                ) {
                    setActive((current) => current * 1);
                } else {
                    setActive((current) =>
                        current < 3 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            case 2:
                setActive((current) => (current < 3 ? current + 1 : current));
                break;
            default:
                break;
        }
    };

    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));


    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvEquipo(form.getTransformedValues());
        modalActionEquipo(false);
        form.reset();
    }

    return (
        <>
            <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
                <Stepper.Step
                    label="Informacion"
                    description="Información General"
                >
                    <InvEquipoGeneralForm form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Complementaria"
                    description="Información Complementaria"
                >
                    <InvEquipoComplementaria form={form} />
                </Stepper.Step>
                <Stepper.Step
                    label="Responsables"
                    description="Designación de responsables"
                >
                    <InvAsignacionForm form={form} />
                </Stepper.Step>
                <Stepper.Completed>
                    <Code>{JSON.stringify(form.getTransformedValues())}</Code>
                </Stepper.Completed>
            </Stepper>

            {active === 3 ? (
                <Group justify="center" mt="xl">
                    <BtnSection
                        IconSection={IconChevronsLeft}
                        handleAction={prevStep}
                    >
                        Regresar
                    </BtnSection>
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
                    <BtnSection
                        IconSection={IconChevronsLeft}
                        handleAction={prevStep}
                    >
                        Regresar
                    </BtnSection>
                    <BtnSection
                        IconSection={IconChevronsRight}
                        handleAction={nextStep}
                    >
                        Siguiente
                    </BtnSection>
                </Group>
            )}
        </>
    );
};
