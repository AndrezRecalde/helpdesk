import { useEffect } from "react";
import { Box } from "@mantine/core";
import { BtnSubmit, InvAsignacionForm } from "../../../../components";
import {
    useInvEquipoStore,
    useInvUiEquipo,
} from "../../../../hooks";

export const InvEquipoAsignacionForm = ({ form }) => {
    const { startAssignEquipo, activateInvEquipo } =
        useInvEquipoStore();
    const { modalActionAssignEquipo } = useInvUiEquipo();

    useEffect(() => {
      if (activateInvEquipo !== null) {
        form.setValues({ id: activateInvEquipo.id });
        return;
      }
    }, [activateInvEquipo])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues())
        startAssignEquipo(form.getTransformedValues());
        /* if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        } */
        form.reset();
        modalActionAssignEquipo(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <InvAsignacionForm form={form} />
            <BtnSubmit>
                Guardar
            </BtnSubmit>
        </Box>
    );
};
