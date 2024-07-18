import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import { ChangePwdPage, MarcacionesPage, ProfilePage } from "../../../pages";

export const PrivatePages = () => {
    return (
        <RoutesNotFound>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-password" element={<ChangePwdPage />} />
            <Route path="ver-marcaciones" element={<MarcacionesPage />} />
        </RoutesNotFound>
    );
};
