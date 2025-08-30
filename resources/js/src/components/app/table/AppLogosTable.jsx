import { useCallback, useMemo } from "react";
import { MenuTable_E, TableContent } from "../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { useAppStore, useUiApp } from "../../../hooks";
import { Image } from "@mantine/core";

export const AppLogosTable = () => {
    const { isLoading, imagenes, setActivateImagenes } = useAppStore();
    const { modalActionApplication } = useUiApp();

    const columns = useMemo(
        () => [
            {
                header: "Imagen Login",
                accessorKey: "imagen_login",
                Cell: ({ cell }) => (
                    <Image
                        radius="md"
                        h={75}
                        w="auto"
                        fit="contain"
                        src={cell.getValue() || ""}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                ),
            },
            {
                header: "Imagen Fondo",
                accessorKey: "imagen_fondo",
                Cell: ({ cell }) => (
                    <Image
                        radius="md"
                        h={75}
                        w="auto"
                        fit="contain"
                        src={cell.getValue() || ""}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                ),
            },
            {
                header: "Imgen Logo",
                accessorKey: "imagen_logo",
                Cell: ({ cell }) => (
                    <Image
                        radius="md"
                        h={75}
                        w="auto"
                        fit="contain"
                        src={cell.getValue() || ""}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                ),
            },
        ],
        [imagenes]
    );

    const handleEdit = useCallback(
        (selected) => {
            console.log(selected);
            setActivateImagenes(selected);
            modalActionApplication(true);
        },
        [imagenes]
    );

    const table = useMantineReactTable({
        columns,
        data: imagenes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEdit} />
        ),
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
