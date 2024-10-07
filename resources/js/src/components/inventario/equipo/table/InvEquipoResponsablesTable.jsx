import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../../components";
import { Text } from "@mantine/core";

const responsables = [
    {
        index: 1,
        responsable: "Cristhian Andres Recalde Solano",
        departamento:
            "GESTION DE TECNOLOGIAS DE LA INFORMACION Y COMUNICACIÓN",
        estado: "EN USO",
        observacion: "",
    },
    {
        index: 2,
        responsable: "Venus Jasmina Estupiñan Hurtado",
        departamento:
            "GESTION DE TECNOLOGIAS DE LA INFORMACION Y COMUNICACIÓN",
        estado: "EN USO",
        observacion: "",
    },
    {
        index: 3,
        responsable: "Venus Jasmina Estupiñan Hurtado",
        departamento: "GESTION DE CUENCA RIEGO Y DRENAJE",
        estado: "PRESTADO",
        observacion:
            "SE CEDIO EL EQUIPO A LA COMPAÑERA DE LA GESTIÓN DE CUENCA RIEGO Y DRENAJE FANNY QUIÑONES",
    },
];

export const InvEquipoResponsablesTable = () => {

    const columns = useMemo(
        () => [
            {
                header: "Responsable",
                accessorKey: "responsable",
                filterVariant: "autocomplete",
            },
            {
                header: "Departamento",
                accessorKey: "departamento",
                filterVariant: "autocomplete",
            },
            {
                header: "Estado",
                accessorKey: "estado",
            },
        ],
        [responsables]
    );

    const table = useMantineReactTable({
        columns,
        data: responsables, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: false,
        renderDetailPanel: ({ row }) => (
            <div>
                <Text fz="md" fw={300}>
                    { row.original.observacion || 'Sin Observación' }
                </Text>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    Observación
                </Text>
            </div>
        ),
    });

    return <TableContent table={table} />;
};
