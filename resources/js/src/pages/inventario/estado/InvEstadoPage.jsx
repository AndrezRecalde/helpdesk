import { useEffect } from "react";
import { InvEstadoModal, InvEstadoTable } from "../../../components"
import { useInvEstadoStore } from "../../../hooks"

export const InvEstadoPage = () => {
  const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();

  useEffect(() => {
    startLoadInvEstados();

    return () => {
        startClearInvEstados();
    }
  }, [])


  return (
    <>
        <InvEstadoTable />
        <InvEstadoModal />
    </>
  )
}
