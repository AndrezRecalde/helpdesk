import { useEffect } from "react";
import { InvMarcaModal, InvMarcaTable } from "../../../components"
import { useInvMarcaStore } from "../../../hooks"

export const InvMarcaPage = ({ tabValue }) => {

  const { startLoadInvMarcas, startClearInvMarcas } = useInvMarcaStore();

  useEffect(() => {
    startLoadInvMarcas()

    return () => {
        startClearInvMarcas();
    }
  }, [tabValue]);


  return (
    <>
        <InvMarcaTable />
        <InvMarcaModal />
    </>
  )
}
