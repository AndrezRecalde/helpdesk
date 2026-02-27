import { useCallback, useMemo } from "react";
import { MenuTableActions, TableContent } from "../../../../components";
import { usePeriodoStore, useUiUser, useUsersStore } from "../../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { PeriodoInfoTable } from "./PeriodoInfoTable";
import dayjs from "dayjs";
import { IconEditCircle } from "@tabler/icons-react";

export const PeriodosTable = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, periodos } = usePeriodoStore();
    const { setActivateUser } = useUsersStore();
    const { modalActionUser } = useUiUser();

    const columns = useMemo(
        () => [
            {
                header: "Departamento",
                accessorFn: (row) =>
                    (row?.departamento || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
                size: 230,
                wrap: true,
            },
            {
                header: "Cédula",
                accessorFn: (row) =>
                    (row?.usu_ci || "NO CONTIENE CEDULA")
                        .toString()
                        .toUpperCase(),
                size: 80,
            },
            {
                header: "Servidor",
                accessorFn: (row) =>
                    (row?.nmbre_usrio || "NO CONTIENE NOMBRES")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
            },
            {
                header: "Cargo",
                accessorFn: (row) =>
                    (row?.cargo || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),

                size: 80,
            },
            {
                header: "Regímen",
                accessorFn: (row) =>
                    (row?.nombre_regimen || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
                size: 80,
                filterVariant: "autocomplete",
                wrap: true,
            },
            {
                header: "Fecha Ingreso",
                accessorFn: (row) =>
                    dayjs(row?.fecha_ingreso).isValid()
                        ? dayjs(row?.fecha_ingreso).format("YYYY-MM-DD")
                        : null,
                size: 80,
            },
        ],
        [periodos],
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateUser(selected);
            modalActionUser(false, true);
        },
        [periodos],
    );

    const table = useMantineReactTable({
        columns,
        data: periodos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: {
            showProgressBars: isLoading,
        },
        autoResetPageIndex: false,
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: usuario.permissions?.includes(
            "tthh.vacaciones.gestionar",
        ),
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Actualizar Fecha Ingreso",
                        onClick: handleEdit,
                    },
                ]}
            />
        ),
        renderDetailPanel: ({ row }) => (
            <PeriodoInfoTable data={row} usuario={usuario} />
        ),
        localization: MRT_Localization_ES,
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });

    return <TableContent table={table} />;
};
