import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../../../layouts/appshell/navbar/navlinks/navLinks";

export const GerenteGuard = ({ redirectPath = "gerencia" }) => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("service_user"));
    //const { user } = useSelector(state => state.auth);
    console.log(user?.role)

    return token && user?.role === Roles.GERENTE ? (
        <Outlet />
    ) : (
        <Navigate replace to={redirectPath} />
    );
};


