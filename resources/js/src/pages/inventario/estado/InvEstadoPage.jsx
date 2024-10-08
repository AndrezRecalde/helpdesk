import { useEffect } from "react";
import { InvEstadoModal, InvEstadoTable } from "../../../components";
import { useInvEstadoStore } from "../../../hooks";
import Swal from "sweetalert2";

export const InvEstadoPage = ({ tabValue }) => {
    const { startLoadInvEstados, startClearInvEstados, message, errores } =
        useInvEstadoStore();

    useEffect(() => {
        if (tabValue === "estado") {
            startLoadInvEstados();
        }

        return () => {
            //startClearInvEstados();
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
        <>
            <InvEstadoTable />
            <InvEstadoModal />
        </>
    );
};
