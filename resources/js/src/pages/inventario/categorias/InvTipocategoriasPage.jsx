import { useEffect } from "react";
import { useInvTipocategoriaStore } from "../../../hooks";
import {
    InvTipocategoriaModal,
    InvTipocategoriaTable,
    TitlePage,
} from "../../../components";
import Swal from "sweetalert2";
import { Divider } from "@mantine/core";

const InvTipocategoriasPage = ({ tabValue }) => {
    const {
        startLoadTiposcategorias,
        startClearTiposcategorias,
        message,
        errores,
    } = useInvTipocategoriaStore();

    useEffect(() => {
        if (tabValue === "categorias") {
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
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    return (
        <div>
            <TitlePage order={4}>
                Tipos de categorías
            </TitlePage>
            <Divider my="sm" />
            <InvTipocategoriaTable />
            <InvTipocategoriaModal />
        </div>
    );
};


export default InvTipocategoriasPage;
