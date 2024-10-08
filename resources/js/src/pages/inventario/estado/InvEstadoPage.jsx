import { useEffect } from "react";
import { InvEstadoModal, InvEstadoTable } from "../../../components"
import { useInvEstadoStore } from "../../../hooks"

export const InvEstadoPage = ({ tabValue }) => {
  const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();

  useEffect(() => {
    startLoadInvEstados();

    return () => {
        startClearInvEstados();
    }
  }, [tabValue])


  return (
    <>
        <InvEstadoTable />
        <InvEstadoModal />
    </>
  )
}
