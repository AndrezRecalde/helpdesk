import { useEffect } from "react";
import { InvMarcaModal, InvMarcaTable } from "../../../components"
import { useInvMarcaStore } from "../../../hooks"

export const InvMarcaPage = () => {

  const { startLoadInvMarcas, startClearInvMarcas } = useInvMarcaStore();

  useEffect(() => {
    startLoadInvMarcas()

    return () => {
        startClearInvMarcas();
    }
  }, []);


  return (
    <>
        <InvMarcaTable />
        <InvMarcaModal />
    </>
  )
}
