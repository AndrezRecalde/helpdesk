import { createSlice } from "@reduxjs/toolkit";

export const contratoSlice = createSlice({
    name: "contrato",
    initialState: {
        isLoading: false,
        message: undefined,
        errores: undefined,
        contratos: [],
        activeContrato: null,
        instalaciones: [],
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onLoadContratos: (state, { payload }) => {
            state.contratos = payload;
            state.isLoading = false;
        },
        onSetActiveContrato: (state, { payload }) => {
            state.activeContrato = payload;
        },
        onClearContratos: (state) => {
            state.contratos = [];
            state.activeContrato = null;
        },
        onLoadInstalaciones: (state, { payload }) => {
            state.instalaciones = payload;
            state.isLoading = false;
        },
        onClearInstalaciones: (state) => {
            state.instalaciones = [];
        },
    },
});

export const {
    onLoading,
    onLoadMessage,
    onLoadErrores,
    onLoadContratos,
    onSetActiveContrato,
    onClearContratos,
    onLoadInstalaciones,
    onClearInstalaciones,
} = contratoSlice.actions;
