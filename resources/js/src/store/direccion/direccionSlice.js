import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    direcciones: [],
    errores: undefined,
};

export const direccionSlice = createSlice({
    name: "direccion",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadDirecciones: (state, { payload }) => {
            state.direcciones = payload;
            state.isLoading = false;
        },
        onClearDirecciones: (state) => {
            state.isLoading = false;
            state.direcciones = [];
            state.errores = undefined;
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
    onLoadDirecciones,
    onClearDirecciones,
    onLoadErrores,
    onClearErrores,
} = direccionSlice.actions;
