import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {
    ListPermisosPage,
    PermisosPage,
    ReporteSoportes,
    SolicitudesActualesPage,
    SoportesPage,
} from "../../../pages";

export const PagesTecnico = () => {
    //console.log("pagesTecnico");

    return (
        <RoutesNotFound>
            <Route
                path="solicitudes-actuales"
                element={<SolicitudesActualesPage />}
            />
            <Route path="soportes" element={<SoportesPage />} />
            <Route path="reporte-soportes" element={<ReporteSoportes />} />

            <Route path="/permiso" element={<PermisosPage />} />
            <Route path="/ver-permisos" element={<ListPermisosPage />} />

        </RoutesNotFound>
    );
};
