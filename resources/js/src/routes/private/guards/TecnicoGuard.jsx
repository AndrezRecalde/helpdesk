import { Roles } from "../../../layouts/appshell/navbar/navlinks/navLinks";

export const TecnicoGuard = ({ children }) => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("service_user"));

    //console.log(user?.role)


  return token && user?.role === Roles.TECNICO ? (
        children
    ) : (
        <Navigate replace to={redirectPath} />
    );
}
