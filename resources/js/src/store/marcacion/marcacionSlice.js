import { createSlice } from "@reduxjs/toolkit";

export const marcacionSlice = createSlice({
    name: "marcacion",
    initialState: {
        isLoading: false,
        marcaciones: [],
        permisos: [],
        activateMarcacion: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadMarcaciones: (state, { payload }) => {
            state.marcaciones = payload;
        },
        onLoadPermisos: (state, { payload }) => {
            state.permisos = payload;
        },
        onSetActivateMarcacion: (state, { payload }) => {
            state.activateMarcacion = payload;
        },
        onClearMarcaciones: (state) => {
            state.marcaciones = [];
            state.isLoading = false;
            state.activateMarcacion = null;
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadMarcaciones,
    onLoadPermisos,
    onSetActivateMarcacion,
    onClearMarcaciones,
    onLoadMessage,
    onLoadErrores,
} = marcacionSlice.actions;
