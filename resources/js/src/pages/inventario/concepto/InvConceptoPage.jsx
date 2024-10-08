import { useEffect } from "react";
import { InvConceptoModal, InvConceptoTable } from "../../../components";
import { useInvConceptoStore } from "../../../hooks";
import Swal from "sweetalert2";

export const InvConceptoPage = ({ tabValue }) => {
    const { startLoadInvConceptos, startClearInvConceptos, message, errores } =
        useInvConceptoStore();

    useEffect(() => {
        if (tabValue === "estado") {
        startLoadInvConceptos();
        }

        return () => {
            //startClearInvConceptos();
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
            <InvConceptoTable />
            <InvConceptoModal />
        </>
    );
};
