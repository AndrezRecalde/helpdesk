import { useCallback, useMemo } from "react";
import { MenuTable_E, TableContent } from "../../../../components";
import { usePeriodoStore, useUiUser, useUsersStore } from "../../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { PeriodoInfoTable } from "./PeriodoInfoTable";
import dayjs from "dayjs";
import { Roles } from "../../../../helpers/dictionary";

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
            },
            {
                header: "Cedula",
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
                header: "Regímen Contrato",
                accessorFn: (row) =>
                    (row?.nombre_regimen || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
                size: 80,
                filterVariant: "autocomplete",
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
        [periodos]
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateUser(selected);
            modalActionUser(false, true);
        },
        [periodos]
    );

    const table = useMantineReactTable({
        columns,
        data: periodos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: usuario.role === Roles.NOM_VACACIONES ? true : false,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEdit} />
        ),
        renderDetailPanel: ({ row }) => (
            <PeriodoInfoTable data={row} usuario={usuario} />
        ),
        localization: MRT_Localization_ES,
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
