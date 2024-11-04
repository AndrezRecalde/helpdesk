import { authRoutes, peerLinks, routes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "../public/PublicRoutes";
import { PrivateRoutes } from "../private";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { RoutesNotFound } from "../not-found/RoutesNotFound";
import { AppLayout, Roles } from "../../layouts";
import { AuthGuard } from "../private/guards";

const AuthRoutes = () => (
    <PublicRoutes>
        <Routes>
            <Route path={authRoutes.path} element={<authRoutes.Component />} />
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
    const renderRoutes = (routeConfig, role) => {
        return routeConfig.map(({ path, Component, roles }) => (
            <Route
                key={path}
                path={path}
                element={
                    <PrivateRoutes
                        requiredRole={roles.includes(role) ? role : ""}
                    >
                        <Component />
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
                        <Component />
                    </AuthGuard>
                }
            />
        ));
    };

    return (
        <RoutesNotFound>
            <Route path="/*" element={<AuthRoutes />} />

            <Route element={<AppLayout />}>
                <Route
                    path="/gerencia/*"
                    element={
                        <RoutesNotFound>
                            {renderRoutes(routes.gerencia, "GERENTE")}
                        </RoutesNotFound>
                    }
                />
                <Route
                    path="/tecnico/*"
                    element={
                        <RoutesNotFound>
                            {renderRoutes(routes.tecnico, "TECNICO")}
                        </RoutesNotFound>
                    }
                />
                <Route
                    path="/staff/*"
                    element={
                        <RoutesNotFound>
                            {renderRoutes(routes.usuario, "USUARIO")}
                        </RoutesNotFound>
                    }
                />
                <Route
                    path="/staff/d/*"
                    element={
                        <RoutesNotFound>{renderStaffRoutes(peerLinks.peer)}</RoutesNotFound>
                    }
                />
            </Route>
        </RoutesNotFound>
    );
};
