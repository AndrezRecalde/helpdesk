import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
        imagenes: [],
        activateImagenes: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadImagenes: (state, { payload }) => {
            state.imagenes = payload;
            state.isLoading = false;
        },
        onSetActivateImagenes: (state, { payload }) => {
            state.activateImagenes = payload;
        },
        onClearImagenes: (state) => {
            state.isLoading = false;
            state.activateImagenes = null;
            state.imagenes = [];
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onLoadImagenes,
    onSetActivateImagenes,
    onClearImagenes,
    onLoadMessage,
    onLoadErrores,
} = appSlice.actions;
