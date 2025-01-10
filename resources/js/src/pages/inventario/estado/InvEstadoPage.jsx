import { useEffect } from "react";
import { Divider } from "@mantine/core";
import { InvEstadoModal, InvEstadoTable, TitlePage } from "../../../components";
import { useInvEstadoStore } from "../../../hooks";
import Swal from "sweetalert2";

const InvEstadoPage = ({ tabValue }) => {
    const { startLoadInvEstados, startClearInvEstados, message, errores } =
        useInvEstadoStore();

    useEffect(() => {
        if (tabValue === "estados") {
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
        <div>
            <TitlePage order={4}>Estados de Equipos</TitlePage>
            <Divider my="sm" />
            <InvEstadoTable />
            <InvEstadoModal />
        </div>
    );
};

export default InvEstadoPage;
