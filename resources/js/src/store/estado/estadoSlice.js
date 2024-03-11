import { createSlice } from "@reduxjs/toolkit";

export const estadoSlice = createSlice({
    name: "estado",
    initialState: {
        isLoading: false,
        estados: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadEstados: (state, { payload }) => {
            state.estados = payload;
            state.isLoading = false;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearErrores: (state) => {
            state.errores = undefined;
        },
        onClearEstados: (state) => {
            state.estados = [];
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadEstados,
    onLoadErrores,
    onClearErrores,
    onClearEstados,
} = estadoSlice.actions;
