import { Box } from "@mantine/core";
import { BtnSubmit, InvAsignacionForm } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";
import {
    useDireccionStore,
    useInvConceptoStore,
    useInvEquipoStore,
    useInvUiEquipo,
    useUsersStore,
} from "../../../../hooks";

export const InvEquipoAsignacionForm = ({ form }) => {
    const { startAssignEquipo, activateInvEquipo, setActivateInvEquipo } =
        useInvEquipoStore();
    const { modalActionAssignEquipo } = useInvUiEquipo();
    const { users } = useUsersStore();
    const { direcciones } = useDireccionStore();
    const { invConceptos } = useInvConceptoStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        startAssignEquipo(form.getTransformedValues());
        if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        }
        form.reset();
        modalActionAssignEquipo(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <InvAsignacionForm form={form} />
            <BtnSubmit fontSize={16} IconSection={IconChecks}>
                Guardar
            </BtnSubmit>
        </Box>
    );
};
