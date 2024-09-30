import { useEffect } from "react";
import { useInvTipocategoriaStore } from "../../../hooks";
import { InvTipocategoriaModal, InvTipocategoriaTable } from "../../../components";

export const InvTipocategoriasPage = () => {

    const { startLoadTiposcategorias, startClearTiposcategorias } = useInvTipocategoriaStore();

    useEffect(() => {
        startLoadTiposcategorias();

      return () => {
        startClearTiposcategorias();
      }
    }, []);


    return (
        <>
            <InvTipocategoriaTable />
            <InvTipocategoriaModal />
        </>
    );
};
