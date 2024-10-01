import { useEffect } from "react";
import { useInvTipocategoriaStore } from "../../../hooks";
import { InvTipocategoriaModal, InvTipocategoriaTable } from "../../../components";

export const InvTipocategoriasPage = ({ tabValue }) => {

    const { startLoadTiposcategorias, startClearTiposcategorias } = useInvTipocategoriaStore();

    useEffect(() => {
        startLoadTiposcategorias();

      return () => {
        startClearTiposcategorias();
      }
    }, [tabValue]);


    return (
        <>
            <InvTipocategoriaTable />
            <InvTipocategoriaModal />
        </>
    );
};
