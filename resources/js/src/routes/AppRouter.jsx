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
import { AppLayout } from "../layouts";

export const AppRouter = () => {
    const token = localStorage.getItem("service_user");
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        <RoutesNotFound>
            <Route
                path="/*"
                element={
                    <PublicRoutes>
                        <Routes>
                            <Route path="auth/login/*" element={<AuthPage />} />
                            <Route
                                path="/*"
                                element={<Navigate replace to="/auth/login" />}
                            />
                        </Routes>
                    </PublicRoutes>
                }
            />

            <Route element={<AppLayout />}>
                <Route
                    path="/gerencia/*"
                    element={
                        <PrivateRoutes role="GERENTE">
                            <PagesGerente />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/tecnico/*"
                    element={
                        <PrivateRoutes role="TECNICO">
                            <PagesTecnico />
                        </PrivateRoutes>
                    }
                />

                <Route
                    path="/gad/d/*"
                    element={
                        <PrivateRoutes role="USUARIO">
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
