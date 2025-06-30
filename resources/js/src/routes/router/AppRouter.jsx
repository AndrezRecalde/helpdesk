import { authRoutes, consultaTramiteRoutes, peerLinks, routes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../public/PublicRoutes";
import { PrivateRoutes } from "../private";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { RoutesNotFound } from "../not-found/RoutesNotFound";
//import { AppLayout, Roles } from "../../layouts";
import { AuthGuard } from "../private/guards";
import { AppHeaderMenu } from "../../layouts/appshell/menu/AppHeaderMenu";

const AuthRoutes = () => (
    <PublicRoutes>
        <Routes>
            <Route path={authRoutes.path} element={<authRoutes.Component />} />
            <Route path={consultaTramiteRoutes.path} element={<consultaTramiteRoutes.Component />} />
            <Route
                path="/*"
                element={<Navigate replace to={authRoutes.link} />}
            />
        </Routes>
    </PublicRoutes>
);

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    // Helper para renderizar rutas de acuerdo a la estructura dinámica
    const renderRoutes = (routeConfig) => {
        return routeConfig.map(({ path, Component, roles }) => (
            <Route
                key={path}
                path={path}
                element={
                    <PrivateRoutes requiredRole={roles}>
                        <AppHeaderMenu>
                            <Component />
                        </AppHeaderMenu>
                    </PrivateRoutes>
                }
            />
        ));
    };

    const renderStaffRoutes = (routeConfig) => {
        return routeConfig.map(({ path, Component }) => (
            <Route
                key={path}
                path={path}
                element={
                    <AuthGuard>
                        <AppHeaderMenu>
                            <Component />
                        </AppHeaderMenu>
                    </AuthGuard>
                }
            />
        ));
    };

    return (
        <Routes>
            <Route path="/*" element={<AuthRoutes />} />

            <Route
                path="/intranet/*"
                element={
                    <RoutesNotFound>
                        {renderStaffRoutes(peerLinks.peer)}
                    </RoutesNotFound>
                }
            />
            <Route
                path="/helpdesk/gerencia/*"
                element={
                    <RoutesNotFound>
                        {renderRoutes(routes.HELPDESK_GERENCIA)}
                    </RoutesNotFound>
                }
            />
            <Route
                path="/helpdesk/*"
                element={
                    <RoutesNotFound>
                        {renderRoutes(routes.HELPDESK_TECNICO)}
                    </RoutesNotFound>
                }
            />
            <Route
                path="/permisos/gerencia/*"
                element={
                    <RoutesNotFound>
                        {renderRoutes(routes.NOM_PERMISOS)}
                    </RoutesNotFound>
                }
            />
            {/* </Route> */}
        </Routes>
    );
};
