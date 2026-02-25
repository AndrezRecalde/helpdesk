import { Navigate, useLocation } from "react-router-dom";
import { ErrorAccessDenied } from "../../pages";

/**
 * PrivateRoutes — guarda de acceso basado en roles.
 *
 * Soporta el nuevo sistema multi-rol donde `user.roles` es un array.
 * `requiredRole` puede ser un array de roles permitidos.
 * Acceso concedido si el usuario tiene AL MENOS UNO de los roles requeridos.
 */
export const PrivateRoutes = ({
    redirectPath = "/auth/login",
    children,
    requiredRole,
}) => {
    const location = useLocation();
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("service_user"));

    // 1. Verificar autenticación
    if (!token) {
        return <Navigate to={redirectPath} state={{ from: location }} />;
    }

    // 2. Si no se especifica rol requerido, acceso libre (solo autenticación)
    if (!requiredRole) return children;

    // 3. Verificar que el usuario tenga al menos uno de los roles requeridos
    const userRoles = user?.roles ?? [];
    const rolesArray = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole];
    const hasAccess = rolesArray.some((r) => userRoles.includes(r));

    if (!hasAccess) {
        return <ErrorAccessDenied />;
    }

    return children;
};
