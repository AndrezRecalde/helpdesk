import { createSlice } from "@reduxjs/toolkit";

export const empresaSlice = createSlice({
    name: "empresa",
    initialState: {
        isLoading: false,
        empresas: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = true;
        },
        onLoadEmpresas: (state, { payload }) => {
            state.empresas = payload;
        },
        onClearEmpresas: (state) => {
            state.empresas = [];
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearErrores: (state) => {
            state.errores = undefined;
        },
    },
});

export const { onLoading, onLoadEmpresas, onClearEmpresas, onLoadErrores, onClearErrores } =
    empresaSlice.actions;
