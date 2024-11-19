import { useMemo } from "react";
import { Card } from "@mantine/core";
import { TableContent, TitlePage } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";

export const TableMarcacionRelojOnline = () => {
    const { marcaciones } = useMarcacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME", //access nested data with dot notation
                header: "SERVIDOR",
            },
            {
                accessorFn: (row) => dayjs(row.CHECKTIME).format("YYYY-MM-DD"), //access nested data with dot notation
                header: "FECHA",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => dayjs(row.CHECKTIME).format("HH:mm:ss"), //normal accessorKey
                header: "HORA",
                //filterVariant: "autocomplete",
            },
            {
                accessorKey: "SENSORID", //normal accessorKey
                header: "SENSOR RELOJ",
                //filterVariant: "autocomplete",
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        mantineTableProps: {
            withColumnBorders: true,
            //withTableBorder: true,
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

    return (
        <Card withBorder shadow="sm" radius="md" mt={5}>
            <Card.Section withBorder inheritPadding py="lg">
                <TitlePage order={3}>Marcaciones desde el Biométrico</TitlePage>
            </Card.Section>
            <Card.Section inheritPadding py="xs">
                <TableContent table={table} />
            </Card.Section>
        </Card>
    );
};
