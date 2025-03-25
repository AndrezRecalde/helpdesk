import { useEffect } from "react";
import { Divider } from "@mantine/core";
import { useInvCategoriaStore, useTitlePage } from "../../../hooks";
import {
    InvCategoriaModal,
    InvCategoriaTable,
    //InvStockCategoriaModal,
    TitlePage,
} from "../../../components";
import Swal from "sweetalert2";

const InvCategoriasPage = ({ tabValue }) => {
    useTitlePage("Helpdesk | Inv. Categorias");
    const {
        startLoadInvCategorias,
        //startClearInvCategorias,
        message,
        errores,
    } = useInvCategoriaStore();

    useEffect(() => {
        if (tabValue === "categorias") {
            startLoadInvCategorias({});
        }

        return () => {
            //startClearInvCategorias();
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
            <TitlePage order={4}>Categorías</TitlePage>
            <Divider my="sm" />
            <InvCategoriaTable />
            <InvCategoriaModal />
            {/* <InvStockCategoriaModal /> */}
        </div>
    );
};

export default InvCategoriasPage;
