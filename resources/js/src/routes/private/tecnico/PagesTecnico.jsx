import { Route } from "react-router-dom";
import { AppLayout } from "../../../layouts";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import { SolicitudPage } from "../../../pages";

export const PagesTecnico = () => {
    console.log("pagesTecnico");

    return (
        <AppLayout>
            <RoutesNotFound>
                <Route path="saludo" element={<>Hola tecnico</>} />
            </RoutesNotFound>
        </AppLayout>
    );
};
