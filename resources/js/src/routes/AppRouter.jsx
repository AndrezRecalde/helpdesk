import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import { AdminDireccionesPage, AdminUsersPage, AuthPage, BusquedaSolicitudPage, DashGerenciaPage, SolicitudesActualesPage, SolicitudesAnuladasPage, SoportesPage } from "../pages";
import { useAuthStore } from "../hooks";
import { RoutesNotFound } from "./not-found/RoutesNotFound";
import { PagesGerente, PagesTecnico, PrivatePages } from "./private";
import { AuthGuard, GerenteGuard, TecnicoGuard } from "./private/guards";
import { AppLayout } from "../layouts";

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <RoutesNotFound>
            <Route path="/" element={<Navigate to="u" />} />
            <Route path="/auth/login" element={<AuthPage />} />
            {/* <Route element={<PublicRoutes />}>
                <Route path="/auth/login/*" element={<AuthPage />} />
            </Route> */}
            <Route element={<AuthGuard />}>
                <Route path="u/*" element={<PrivatePages />} />
            </Route>

            <Route element={<GerenteGuard />}>
                <Route path="usuarios" element={<AdminUsersPage />} />
                <Route path="direcciones" element={<AdminDireccionesPage />} />
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
            </Route>

            {/* <Route
                path="/auth/login/*"
                element={
                    <PublicRoutes>
                        <Routes>
                            <Route path="/auth/login" element={<AuthPage />} />
                        </Routes>
                    </PublicRoutes>
                }
            /> */}

            {/*  <Route path="/" element={<Navigate to="/u/" />} />
            <Route path="/auth/login" element={<AuthPage />} />

            <Route
                element={
                    <GerenteGuard>
                        <PagesGerente />
                    </GerenteGuard>
                }
            />

            <Route
                element={
                    <TecnicoGuard>
                        <PagesTecnico />
                    </TecnicoGuard>
                }
            /> */}
        </RoutesNotFound>
    );
};
