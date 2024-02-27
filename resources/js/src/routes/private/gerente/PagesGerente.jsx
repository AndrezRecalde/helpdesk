import { AppLayout } from "../../../layouts";
import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {
    AdminUsersPage,
    AdminDireccionesPage,
    SolicitudesActualesPage,
    BusquedaSolicitudPage,
    SolicitudesAnuladasPage,
    SoportesPage,
    DashGerenciaPage,
} from "../../../pages";

export const PagesGerente = () => {
    console.log('pagesGerente')
    return (
        <AppLayout>
            <RoutesNotFound>
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
