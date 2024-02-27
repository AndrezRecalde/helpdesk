import { Navigate, Route } from "react-router-dom";
import { AppLayout } from "../../../layouts";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import { AdminDireccionesPage, AdminUsersPage, BusquedaSolicitudPage, DashGerenciaPage, ProfilePage, SolicitudPage, SolicitudesActualesPage, SolicitudesAnuladasPage, SoportesPage } from "../../../pages";

export const PrivatePages = () => {
    return (
        <AppLayout>
            <RoutesNotFound>
                <Route
                    path="/"
                    element={<Navigate to="profile" />}
                />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="solicitud" element={<SolicitudPage />} />


                <Route path="usuarios" element={<AdminUsersPage />} />
                <Route
                    path="direcciones"
                    element={<AdminDireccionesPage />}
                />
                <Route
                    path="solicitudes-actuales"
                    element={<SolicitudesActualesPage />}
                />
                <Route
                    path="busqueda-solicitudes"
                    element={<BusquedaSolicitudPage />}
                />
                <Route
                    path="solicitudes-anuladas"
                    element={<SolicitudesAnuladasPage />}
                />
                <Route path="soportes" element={<SoportesPage />} />

                <Route path="dashboard" element={<DashGerenciaPage />} />
            </RoutesNotFound>
        </AppLayout>
    );
};
