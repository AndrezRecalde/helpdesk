import { useEffect } from "react";
import { useInvCategoriaStore } from "../../../hooks";
import { InvCategoriaModal, InvCategoriaTable } from "../../../components";

export const InvCategoriasPage = ({ tabValue }) => {
    const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore();

    useEffect(() => {
        startLoadInvCategorias({});

        return () => {
            startClearInvCategorias();
        };
    }, [tabValue]);

    return (
        <>
            <InvCategoriaTable />
            <InvCategoriaModal />
        </>
    );
};
