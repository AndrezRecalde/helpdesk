import { useState } from "react";
import { Button, Group, Stepper } from "@mantine/core";
import {
    BtnSection,
    InvAsignacionForm,
    InvEquipoComplementaria,
    InvEquipoGeneralForm,
} from "./../../../../components";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";

export const InvEquipoForm = ({ form }) => {
    const [active, setActive] = useState(1);
    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} onStepClick={setActive}>
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
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>

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
        </>
    );
};
