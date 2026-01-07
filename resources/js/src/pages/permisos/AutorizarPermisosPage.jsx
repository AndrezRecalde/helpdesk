import { useEffect } from "react";
import { ActionIcon, Container, Divider, Group } from "@mantine/core";
import {
    AutorizarPermisoTable,
    //FilterAutorizarPermiso,
    TitlePage,
} from "../../components";
import { usePermisoStore, useTitlePage } from "../../hooks";
import { IconRefresh } from "@tabler/icons-react";

const AutorizarPermisosPage = () => {
    useTitlePage("Helpdesk | Permisos");
    const { startLoadPermisos, clearPermisos } = usePermisoStore();

    useEffect(() => {
        startLoadPermisos({
            anio: new Date(),
            //id_estado: 8,
        });

        return () => {
            clearPermisos();
        };
    }, []);

    const handleRefresh = (e) => {
        e.preventDefault();
        startLoadPermisos({
            anio: new Date(),
            //id_estado: 8,
        });
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>
                    Autorizar Permisos - {new Date().getFullYear()}
                </TitlePage>
                <ActionIcon
                    variant="default"
                    size="lg"
                    aria-label="Refresh"
                    onClick={(e) => handleRefresh(e)}
                >
                    <IconRefresh
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Group>
            <Divider my="md" />
            <AutorizarPermisoTable />
        </Container>
    );
};

export default AutorizarPermisosPage;
