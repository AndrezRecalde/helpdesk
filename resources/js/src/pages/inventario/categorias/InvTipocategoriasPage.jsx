import { useEffect } from "react";
import { useInvTipocategoriaStore } from "../../../hooks";
import {
    InvTipocategoriaModal,
    InvTipocategoriaTable,
} from "../../../components";
import Swal from "sweetalert2";

export const InvTipocategoriasPage = ({ tabValue }) => {
    const {
        startLoadTiposcategorias,
        startClearTiposcategorias,
        message,
        errores,
    } = useInvTipocategoriaStore();

    useEffect(() => {
        if (tabValue === "categoria") {
            startLoadTiposcategorias();
            return;
        }

        return () => {
            //startClearTiposcategorias();
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
            <InvTipocategoriaTable />
            <InvTipocategoriaModal />
        </>
    );
};
