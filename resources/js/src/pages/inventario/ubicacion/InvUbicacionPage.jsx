import { useEffect } from "react";
import { useInvUbicacionStore } from "../../../hooks"
import { InvUbicacionModal, InvUbicacionTable } from "../../../components";

export const InvUbicacionPage = ({ tabValue }) => {

    const { startLoadInvUbicaciones, startClearInvUbicaciones } = useInvUbicacionStore();

    useEffect(() => {
        startLoadInvUbicaciones()

        return () => {
            startClearInvUbicaciones();
        }
      }, [tabValue]);

  return (
    <div>
        <InvUbicacionTable />
        <InvUbicacionModal />
    </div>
  )
}
