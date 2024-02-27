import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({
    redirectPath = "/auth/login",
    children,
}) => {
    const token = localStorage.getItem("auth_token");
    const location = useLocation();
    return !token ? (
        <Navigate to={redirectPath} replace state={{ location }} />
    ) : (
        children
    );
};
