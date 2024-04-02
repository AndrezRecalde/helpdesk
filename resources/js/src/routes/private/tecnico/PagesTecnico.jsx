import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {
    ActividadPage,
    ListActividadesPage,
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

            <Route path="agregar-actividad" element={<ActividadPage />} />
            <Route path="lista-actividades" element={<ListActividadesPage />} />

            <Route path="/permiso" element={<PermisosPage />} />
            <Route path="/ver-permisos" element={<ListPermisosPage />} />

        </RoutesNotFound>
    );
};
