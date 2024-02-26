import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuSolicitudTable, MenuTable_E, TableContent } from "../../../components";
import { Badge, Card, Group, Text } from "@mantine/core";

const data = [
    {
        atendido: 1,
        num_soporte: "38976",
        fecha: "24/02/2024",
        usuario_id: "Paz Santos Jenniffer Juliana",
        direccion_id: "GESTIÓN DE TALENTO HUMANO",
        id_usu_tecnico_asig: "Christian Aldredo Apraez Torres",
    },
    {
        atendido: 1,
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "Mauricio Vasco",
    },
    {
        atendido: 0,
        num_soporte: "39876",
        fecha: "24/02/2024",
        usuario_id: "Gónzalez Covaleda Oscar Fernando",
        direccion_id: "GESTIÓN DE COMUNICACIÓN SOCIAL DEL GADPE",
        id_usu_tecnico_asig: "",
    },
];

export const SolicitudesTable = ({ menu }) => {
    const columns = useMemo(
        () => [
            /* {
                accessorKey: "progress",
                header: "Progreso",
                Cell: ({ cell }) => (
                    <>
                        <ColorSwatch
                            color={
                                cell.row.original.atendido === 1
                                    ? "#009790"
                                    : "#CB3234"
                            }
                        />
                    </>
                ),
            }, */
            {
                accessorKey: "num_soporte", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorKey: "fecha", //access nested data with dot notation
                header: "Fecha - Hora",
            },
            {
                accessorKey: "usuario_id", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion_id", //normal accessorKey
                header: "Dirección del usuario",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "id_usu_tecnico_asig", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            menu === 1 ? <MenuSolicitudTable /> : <MenuTable_E/>
        ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.atendido === 0 ? "#CB3234" : "",
                color: cell.row.original.atendido === 0 ? "white" : "",
            },
        }),
        renderDetailPanel: ({ row }) => (
            <Group grow>
                <Card withBorder shadow="sm" radius="sm">
                    <Group justify="space-between">
                        <Text fz="sm" mb={5} fw={700}>
                            Incidencia
                        </Text>
                        <Badge radius="sm">
                            Terminado
                        </Badge>
                    </Group>
                    <Card.Section withBorder inheritPadding p="md" mt="md">
                        Tengo problemas para poder agregar un usario a la
                        paltaforma de SHYRA con el usuario administrador
                    </Card.Section>
                </Card>
            </Group>
        ),
    });

    return <TableContent table={table} />;
};
