import { useEffect, useState } from "react";
import { Button, Code, Group, Stepper } from "@mantine/core";
import {
    //AlertSection,
    BtnSection,
    //InvAsignacionForm,
    InvEquipoComplementaria,
    InvEquipoGeneralForm,
} from "./../../../../components";
import {
    IconChevronsLeft,
    IconChevronsRight,
    IconSend,
} from "@tabler/icons-react";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoForm = ({ form }) => {
    const { startAddInvEquipo, activateInvEquipo } = useInvEquipoStore();
    const { modalActionEquipo } = useInvUiEquipo();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (activateInvEquipo !== null) {
            form.setValues({
                ...activateInvEquipo,
                ubicacion_id: activateInvEquipo.ubicacion_id.toString(),
                categoria_id: activateInvEquipo.categoria_id.toString(),
                tipocategoria_id: activateInvEquipo.tipocategoria_id.toString(),
                estado_id: activateInvEquipo.estado_id.toString(),
                marca_id: activateInvEquipo.marca_id.toString(),
                //fechas
            });
            return;
        }
    }, [activateInvEquipo]);

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
                        current < 2 ? current + 1 : current
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
                        current < 2 ? current + 1 : current
                    );
                    form.clearErrors();
                }
                break;

            case 2:
                setActive((current) => (current < 2 ? current + 1 : current));
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
        console.log(form.getTransformedValues());
        modalActionEquipo(false);
        form.reset();
    };

    return (
        <>
            <Stepper
                active={active}
                onStepClick={setActive}
                allowNextStepsSelect={false}
            >
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
                {/* <Stepper.Step
                    label="Responsables"
                    description="Designación de responsables"
                >
                    <InvAsignacionForm form={form} />
                    <AlertSection
                        variant="light"
                        color="indigo"
                        title="Información"
                        icon={IconInfoCircle}
                    >
                        Por favor, si lo considera necesario, puede reasignar el
                        responsable en cualquier otro momento.
                    </AlertSection>
                </Stepper.Step> */}
                <Stepper.Completed>
                    <Code>
                        {JSON.stringify(form.getTransformedValues(), null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            {active === 2 ? (
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
                        Agregar Equipo
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
