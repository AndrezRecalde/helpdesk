import { Navigate, useLocation } from "react-router-dom";
import { ErrorAccessDenied } from "../../pages";

export const PrivateRoutes = ({
    redirectPath = "/auth/login",
    children,
    role,
}) => {
    let location = useLocation();
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("service_user"));

    const userHasRequiredRole = token && role === user.role ? true : false;

    if (!token) {
        return <Navigate to={redirectPath} state={{ from: location }} />;
    }
    if (token && !userHasRequiredRole) {
        return <ErrorAccessDenied />;
    }
    return children;
};
