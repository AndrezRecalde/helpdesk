import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormEquipos,
    InvEquipoAsignacionModal,
    InvEquipoModal,
    InvEquipoTable,
    InvViewEquipoModal,
    TitlePage,
} from "../../../components";
import { IconCopyPlus } from "@tabler/icons-react";
import { useDireccionStore, useInvCategoriaStore, useInvEstadoStore, useInvUiEquipo, useUsersStore } from "../../../hooks";

export const InvEquiposPage = () => {
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadInvCategorias, startClearInvCategorias } = useInvCategoriaStore();
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();
    const { modalActionEquipo } = useInvUiEquipo();

    useEffect(() => {
        startLoadDirecciones();
        startLoadUsersGeneral({});
        startLoadInvCategorias({});
        startLoadInvEstados();
      return () => {
        clearDirecciones();
        clearUsers();
        startClearInvCategorias();
        startClearInvEstados();
      }
    }, []);


    const handleAgregar = () => {
        modalActionEquipo(true);
    }

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2}>
                    Inventario de Equipos
                </TitlePage>
                <BtnSection
                    IconSection={IconCopyPlus}
                    handleAction={handleAgregar}
                >
                    Agregar
                </BtnSection>
            </Group>
            <FilterFormEquipos />
            <InvEquipoTable />

            <InvViewEquipoModal />
            <InvEquipoAsignacionModal />
            <InvEquipoModal />
        </Container>
    );
};
