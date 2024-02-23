import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./public/PublicRoutes";
import { PrivateRoutes, PrivatePages } from "./private";
import { AuthPage } from "../pages";

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/auth/login/*"
                element={
                    <PublicRoutes>
                        <Routes>
                            <Route path="/*" element={<AuthPage />} />
                        </Routes>
                    </PublicRoutes>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoutes>
                        <PrivatePages />
                    </PrivateRoutes>
                }
            />
        </Routes>
    );
};
