import { Navigate, Outlet, useLocation } from "react-router-dom";



export const PublicRoutes = ({ children }) => {
    const token = localStorage.getItem("auth_token");
    const { state } = useLocation();

    const pathname = state?.location?.pathname ?? '/u/profile';

  return !token ? children : <Navigate to={pathname} />
}
