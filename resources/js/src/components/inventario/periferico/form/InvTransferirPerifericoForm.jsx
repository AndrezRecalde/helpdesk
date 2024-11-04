import { useEffect, useState } from "react";
import {
    ActionIcon,
    Box,
    Code,
    Fieldset,
    Grid,
    Stack,
    TextInput,
} from "@mantine/core";
import {
    useInvEquipoStore,
    useInvPerifericoStore,
    //useInvUiEquipo,
    useInvUiPeriferico,
} from "../../../../hooks";
import { BtnSubmit } from "../../../../components";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const InvTransferirPerifericoForm = ({ form }) => {
    const { codigo_nuevo } = form.values;
    const {
        startTransferComponente,
        startLoadInvEquipoFromTransfer,
        activateInvEquipo,
        activateEquipoFromTransfer,
        startClearEquipoFromTransfer,
    } = useInvEquipoStore();
    const { activatePeriferico, setActivateInvPeriferico } =
        useInvPerifericoStore();
    const { modalActionTransferirPeriferico } = useInvUiPeriferico();
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleSearchEquipoDestino = (e) => {
        e.preventDefault();
        startLoadInvEquipoFromTransfer({ codigo: codigo_nuevo });
    };

    useEffect(() => {
        if (activateEquipoFromTransfer !== null) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [activateEquipoFromTransfer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            text: `¿Deseas transferir el componente al equipo: ${activateEquipoFromTransfer?.codigo_nuevo}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#20c997",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Transferir!",
        }).then((result) => {
            if (result.isConfirmed) {
                startTransferComponente(
                    activateInvEquipo,
                    activateEquipoFromTransfer.id,
                    activatePeriferico.id
                );
            }
        });
        if (activatePeriferico !== null) {
            setActivateInvPeriferico(null);
        }
        startClearEquipoFromTransfer(null);
        form.reset();
        modalActionTransferirPeriferico(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <Fieldset legend="Información del Equipo Destino">
                    <Grid>
                        <Grid.Col span={10}>
                            <TextInput
                                label="Buscar por código nuevo"
                                placeholder="Digite el código nuevo"
                                {...form.getInputProps("codigo_nuevo")}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <ActionIcon
                                variant="filled"
                                color="teal.5"
                                size="input-sm"
                                //aria-label="Check soporte"
                                onClick={(e) => handleSearchEquipoDestino(e)}
                            >
                                <IconCircleDashedCheck
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </Fieldset>
                <Code block>
                    {JSON.stringify(
                        activateEquipoFromTransfer || "No hay equipo",
                        null,
                        2
                    )}
                </Code>
                <BtnSubmit disabled={btnDisabled}>Transferir</BtnSubmit>
            </Stack>
        </Box>
    );
};
