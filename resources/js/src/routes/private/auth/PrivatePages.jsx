import { Navigate, Route } from "react-router-dom";
import { AppLayout } from "../../../layouts";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import { AdminDireccionesPage, AdminUsersPage, BusquedaSolicitudPage, DashGerenciaPage, ProfilePage, SolicitudPage, SolicitudesActualesPage, SolicitudesAnuladasPage, SoportesPage } from "../../../pages";

export const PrivatePages = () => {
    return (
            <RoutesNotFound>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="solicitud" element={<SolicitudPage />} />
            </RoutesNotFound>
    );
};
