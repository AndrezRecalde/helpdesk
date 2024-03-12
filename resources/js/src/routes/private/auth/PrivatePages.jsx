import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {  ProfilePage, SolicitudPage } from "../../../pages";

export const PrivatePages = () => {
    return (
            <RoutesNotFound>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="solicitud" element={<SolicitudPage />} />
            </RoutesNotFound>
    );
};
