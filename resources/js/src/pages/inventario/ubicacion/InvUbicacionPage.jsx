import { useEffect } from "react";
import { useInvUbicacionStore } from "../../../hooks";
import { InvUbicacionModal, InvUbicacionTable, TitlePage } from "../../../components";
import Swal from "sweetalert2";
import { Divider } from "@mantine/core";

export const InvUbicacionPage = ({ tabValue }) => {
    const {
        startLoadInvUbicaciones,
        //startClearInvUbicaciones,
        message,
        errores,
    } = useInvUbicacionStore();

    useEffect(() => {
        if (tabValue === "ubicacion") {
            startLoadInvUbicaciones();
        }

        return () => {
            //startClearInvUbicaciones();
        };
    }, [tabValue]);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    return (
        <div>
            <TitlePage order={4}>Ubicaciones Físicas</TitlePage>
            <Divider my="sm" />
            <InvUbicacionTable />
            <InvUbicacionModal />
        </div>
    );
};
