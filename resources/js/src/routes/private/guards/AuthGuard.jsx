import { Navigate, Outlet } from "react-router-dom";

const AuthRouteFragment = <Outlet />;
const PublicRouteFragment = <Navigate to="u" replace />

export const AuthGuard = ({ redirectPath = "/auth/login", privateValidation = true }) => {
    const token = localStorage.getItem("auth_token");

    return token ? (
        privateValidation ? (
            AuthRouteFragment
        ) : PublicRouteFragment
    ) : (
        <Navigate replace to={redirectPath} />
    );
};

