import { useEffect } from "react";
import { Divider } from "@mantine/core";
import { InvConceptoModal, InvConceptoTable, TitlePage } from "../../../components";
import { useInvConceptoStore } from "../../../hooks";
import Swal from "sweetalert2";

const InvConceptoPage = ({ tabValue }) => {
    const { startLoadInvConceptos, startClearInvConceptos, message, errores } =
        useInvConceptoStore();

    useEffect(() => {
        if (tabValue === "estados") {
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
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    return (
        <div>
            <TitlePage order={4}>Estados de Uso</TitlePage>
            <Divider my="sm" />
            <InvConceptoTable />
            <InvConceptoModal />
        </div>
    );
};

export default InvConceptoPage;
