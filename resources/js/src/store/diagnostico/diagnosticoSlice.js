import { createSlice } from "@reduxjs/toolkit";

export const diagnosticoSlice = createSlice({
    name: "diagnostico",
    initialState: {
        isLoading: false,
        diagnosticos: [],
        activeDiagnostico: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadDiagnosticos: (state, { payload }) => {
            state.diagnosticos = payload;
        },
        onSetActivateDiagnostico: (state, { payload }) => {
            state.activeDiagnostico = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearDiagnosticos: (state) => {
            state.diagnosticos = [];
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
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
    onLoadDiagnosticos,
    onSetActivateDiagnostico,
    onClearDiagnosticos,
    onLoadMessage,
    onLoadErrores,
    onClearErrores,
} = diagnosticoSlice.actions;
