import { Navigate } from "react-router-dom";



export const PublicRoutes = ({ children }) => {
    const token = localStorage.getItem("auth_token");

  return !token ? children : <Navigate to="/profile" />
}
