import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: {},
    profile: {},
    validate: undefined,
    errores: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onAuthenticate: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        },
        onLoadProfile: (state, { payload }) => {
            state.profile = payload;
            state.isLoading = false;
        },
        onLogout: (state, { payload }) => {
            state.isLoading = false;
            state.user = {};
            state.errores = payload;
        },
        onValidate: (state, { payload }) => {
            state.isLoading = false;
            state.validate = payload;
        },
        onClearValidates: (state) => {
            state.isLoading = false;
            state.validate = undefined;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearErrores: (state) => {
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onAuthenticate,
    onLoadProfile,
    onLogout,
    onValidate,
    onClearValidates,
    onLoadErrores,
    onClearErrores,
} = authSlice.actions;
