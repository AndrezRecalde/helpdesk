import { Navigate } from "react-router-dom";



export const PublicRoutes = ({ children }) => {
    //const token = localStorage.getItem("auth_token");
    const token = true;

  return !token ? children : <Navigate to="/profile" />
}
