import { useEffect } from "react";
import { useInvCategoriaStore } from "../../../hooks";
import { InvCategoriaModal, InvCategoriaTable } from "../../../components";

export const InvCategoriasPage = () => {
    const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore();

    useEffect(() => {
        startLoadInvCategorias({});

        return () => {
            startClearInvCategorias();
        };
    }, []);

    return (
        <>
            <InvCategoriaTable />
            <InvCategoriaModal />
        </>
    );
};
