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
            <Route path="/*" element={<Navigate replace to="/auth/login" />} />
        </Routes>
    </PublicRoutes>
);

export const AppRouter = () => {
    const token = localStorage.getItem("auth_token");
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        if (!token) {
            checkAuthToken();
            return;
        }
    }, []);

    return (
        <RoutesNotFound>
            <Route path="/*" element={<AuthRoutes />} />

            <Route element={<AppLayout />}>
                <Route
                    path="/gerencia/*"
                    element={
                        <PrivateRoutes role={Roles.GERENTE}>
                            <PagesGerente />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/tecnico/*"
                    element={
                        <PrivateRoutes role={Roles.TECNICO}>
                            <PagesTecnico />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/gad/d/*"
                    element={
                        <PrivateRoutes role={Roles.USUARIO}>
                            <PagesUsuario />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/u/*"
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
