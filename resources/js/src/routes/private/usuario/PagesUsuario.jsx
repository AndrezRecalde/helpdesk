import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {
    ActividadPage,
    ListActividadesPage,
    ListPermisosPage,
    PermisosPage,
    SolicitudPage,
    UserSoportesPage,
} from "../../../pages";

export const PagesUsuario = () => {
    //console.log("pagesUsuario");

    return (
        <RoutesNotFound>
            <Route path="solicitud" element={<SolicitudPage />} />
            <Route path="agregar-actividad" element={<ActividadPage />} />
            <Route path="lista-actividades" element={<ListActividadesPage />} />
            <Route
                path="soportes/:soporteValue"
                element={<UserSoportesPage />}
            />
            <Route path="/permiso" element={<PermisosPage />} />
            <Route path="/ver-permisos" element={<ListPermisosPage />} />
        </RoutesNotFound>
    );
};
