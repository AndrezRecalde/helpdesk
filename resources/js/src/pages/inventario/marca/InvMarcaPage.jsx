import { useEffect } from "react";
import { InvMarcaModal, InvMarcaTable, TitlePage } from "../../../components";
import { useInvMarcaStore } from "../../../hooks";
import Swal from "sweetalert2";
import { Divider } from "@mantine/core";

export const InvMarcaPage = ({ tabValue }) => {
    const { startLoadInvMarcas, startClearInvMarcas, message, errores } =
        useInvMarcaStore();

    useEffect(() => {
        if (tabValue === "marca") {
            startLoadInvMarcas();
        }

        return () => {
            //startClearInvMarcas();
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
            <TitlePage order={4}>Marcas de Equipos</TitlePage>
            <Divider my="sm" />
            <InvMarcaTable />
            <InvMarcaModal />
        </div>
    );
};
