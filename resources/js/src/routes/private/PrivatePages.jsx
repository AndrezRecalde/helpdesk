import { AppLayout } from "../../layouts";
import { Route, Routes } from "react-router-dom";
import {
    ProfilePage,
    AdminUsersPage,
    AdminDireccionesPage,
    SolicitudesActualesPage,
    BusquedaSolicitudPage,
    SolicitudesAnuladasPage,
    SoportesPage,
    SolicitudPage,
    DashGerenciaPage,
} from "../../pages";

export const PrivatePages = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="/gerencia/usuarios" element={<AdminUsersPage />} />
                <Route
                    path="/gerencia/direcciones"
                    element={<AdminDireccionesPage />}
                />
                <Route
                    path="/g/gerencia/solicitudes-actuales"
                    element={<SolicitudesActualesPage />}
                />
                <Route
                    path="/g/gerencia/busqueda-solicitudes"
                    element={<BusquedaSolicitudPage />}
                />
                <Route
                    path="/g/gerencia/solicitudes-anuladas"
                    element={<SolicitudesAnuladasPage />}
                />
                <Route path="/gerencia/soportes" element={<SoportesPage />} />

                <Route path="/solicitud" element={<SolicitudPage />} />

                <Route path="/gerencia/dashboard" element={<DashGerenciaPage />} />

            </Routes>
        </AppLayout>
    );
};
