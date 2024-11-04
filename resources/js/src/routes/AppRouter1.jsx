import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import { AuthPage } from "../pages";
import { useAuthStore } from "../hooks";
import { RoutesNotFound } from "./not-found/RoutesNotFound";
import {
    PagesGerente,
    PagesTecnico,
    PagesUsuario,
    PrivatePages,
    PrivateRoutes,
} from "./private";
import { AuthGuard } from "./private/guards";
import { AppLayout, Roles } from "../layouts";

const AuthRoutes = () => (
    <PublicRoutes>
        <Routes>
            <Route path="auth/login/*" element={<AuthPage />} />
            <Route path="/*" element={<Navigate replace to="auth/login" />} />
        </Routes>
    </PublicRoutes>
);

export const AppRouter1 = () => {
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <RoutesNotFound>
            <Route path="/*" element={<AuthRoutes />} />

            <Route element={<AppLayout />}>
                <Route
                    path="/gerencia/*"
                    element={
                        <PrivateRoutes requiredRole={Roles.GERENTE}>
                            <PagesGerente />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/tecnico/*"
                    element={
                        <PrivateRoutes requiredRole={Roles.TECNICO}>
                            <PagesTecnico />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/staff/*"
                    element={
                        <PrivateRoutes requiredRole={Roles.USUARIO}>
                            <PagesUsuario />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/staff/d/*"
                    element={
                        <AuthGuard>
                            <PrivatePages />
                        </AuthGuard>
                    }
                />
            </Route>
        </RoutesNotFound>
    );
};
