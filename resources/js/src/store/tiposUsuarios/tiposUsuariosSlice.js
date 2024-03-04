import { createSlice } from "@reduxjs/toolkit";

export const tiposUsuariosSlice = createSlice({
    name: "tiposUsuarios",
    initialState: {
        isLoading: false,
        tiposUsuarios: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadTiposUsuarios: (state, { payload }) => {
            state.tiposUsuarios = payload;
            state.isLoading = false;
        },
        onClearTiposUsuarios: (state) => {
            state.tiposUsuarios = [];
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
    onLoadTiposUsuarios,
    onClearTiposUsuarios,
    onLoadErrores,
    onClearErrores,
} = tiposUsuariosSlice.actions;
