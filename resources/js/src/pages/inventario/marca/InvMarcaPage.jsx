import { useEffect } from "react";
import { Divider } from "@mantine/core";
import { InvMarcaModal, InvMarcaTable, TitlePage } from "../../../components";
import { useInvMarcaStore, useTitlePage } from "../../../hooks";
import Swal from "sweetalert2";

const InvMarcaPage = ({ tabValue }) => {
    useTitlePage("Helpdesk | Inv. Marcas");
    const { startLoadInvMarcas, /* startClearInvMarcas, */ message, errores } =
        useInvMarcaStore();

    useEffect(() => {
        if (tabValue === "marcas") {
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
                showConfirmButton: true,
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

export default InvMarcaPage;
