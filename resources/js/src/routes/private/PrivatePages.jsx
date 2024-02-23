import React from "react";
import { AppLayout } from "../../layouts";
import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../../pages";

export const PrivatePages = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </AppLayout>
    );
};
