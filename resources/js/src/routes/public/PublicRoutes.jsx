import { Navigate, useLocation } from "react-router-dom";



export const PublicRoutes = ({ children }) => {
    const token = localStorage.getItem("auth_token");
    const { state } = useLocation();

    const pathname = state?.from?.pathname ?? '/u/profile';
    //console.log(pathname)

  return !token ? children : <Navigate to={pathname} />
}
