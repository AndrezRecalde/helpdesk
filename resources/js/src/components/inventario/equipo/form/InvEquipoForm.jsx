import { useEffect, useState } from "react";
import { Button, Code, Group, Stepper } from "@mantine/core";
import {
    BtnSection,
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
    const { startAddInvEquipo, activateInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { modalActionEquipo } = useInvUiEquipo();
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (activateInvEquipo !== null) {
            form.setValues({
                //...activateInvEquipo,
                id: activateInvEquipo.id,
                modelo: activateInvEquipo.modelo,
                numero_serie: activateInvEquipo.numero_serie,
                codigo_antiguo: activateInvEquipo.codigo_antiguo,
                codigo_nuevo: activateInvEquipo.codigo_nuevo,
                fecha_adquisicion: new Date(activateInvEquipo.fecha_adquisicion),
                fecha_amortizacion: new Date(activateInvEquipo.fecha_amortizacion),
                vida_util: activateInvEquipo.vida_util,
                descripcion: activateInvEquipo.descripcion,
                bien_adquirido:activateInvEquipo.bien_adquirido ? 1 : 0,
                bien_donado: activateInvEquipo.bien_donado ? 1 : 0,
                bien_usado: activateInvEquipo.bien_usado ? 1 : 0,
                ubicacion_id: activateInvEquipo.ubicacion_id.toString(),
                tipocategoria_id: activateInvEquipo.tipocategoria_id.toString(),
                categoria_id: activateInvEquipo.categoria_id.toString(),
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
        setActivateInvEquipo(null);
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
