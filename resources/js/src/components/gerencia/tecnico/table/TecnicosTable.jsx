import { useCallback, useMemo } from "react";
import { Badge, Group, Text } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { ActivateUserBtn, TableContent } from "../../..";
import { useTecnicoStore, useUiTecnico } from "../../../../hooks";

export const TecnicosTable = () => {
    const { isLoading, tecnicos, setActivateTecnico } = useTecnicoStore();
    const { toggleModalTecnico } = useUiTecnico();
    const columns = useMemo(
        () => [
            {
                accessorKey: "nmbre_usrio", //access nested data with dot notation
                header: "Nombres",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "role", //normal accessorKey
                header: "Role",
            },
            {
                accessorKey: "lgin",
                header: "Usuario",
            },
            {
                accessorKey: "total_soportes",
                header: "Total Soportes Año Actual",
            },
            {
                accessorKey: "areas",
                header: "Áreas Asignadas",
                Cell: ({ row }) => {
                    const areas = row.original.areas || [];
                    return areas.length > 0 ? (
                        <Group gap="xs">
                            {areas.map((area) => (
                                <Badge
                                    key={area.id_areas_tic}
                                    size="sm"
                                    variant="light"
                                    color="blue"
                                >
                                    {area.nombre}
                                    {area.principal && " ⭐"}
                                </Badge>
                            ))}
                        </Group>
                    ) : (
                        <Text c="dimmed" size="sm">
                            Sin áreas
                        </Text>
                    );
                },
            },
            {
                accessorKey: "notificar_telegram",
                header: "Telegram",
                Cell: ({ cell }) => (
                    <Badge
                        color={cell.getValue() ? "green" : "gray"}
                        variant="dot"
                        radius="xl"
                    >
                        {cell.getValue() ? "Activo" : "Inactivo"}
                    </Badge>
                ),
            },
            {
                accessorKey: "actvo",
                header: "Activo",
                Cell: ({ cell }) => (
                    <ActivateUserBtn cell={cell} handleActive={handleActive} />
                ),
            },
        ],
        [tecnicos],
    );

    const handleActive = useCallback(
        (selected) => {
            setActivateTecnico(selected);
            toggleModalTecnico(true);
        },
        [tecnicos],
    );

    const table = useMantineReactTable({
        columns,
        data: tecnicos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        state: { showProgressBars: isLoading },
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    return <TableContent table={table} />;
};
