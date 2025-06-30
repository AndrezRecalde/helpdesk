import { createSlice } from "@reduxjs/toolkit";

export const periodoSlice = createSlice({
    name: "periodoVacacional",
    initialState: {
        isLoading: false,
        isExport: false,
        periodos: [],
        activatePeriodo: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadingExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadingPeriodos: (state, { payload }) => {
            state.periodos = payload;
            state.isLoading = false;
        },
        onSetActivatePeriodo: (state, { payload }) => {
            state.activatePeriodo = payload;
        },
        onClearPeriodos: (state) => {
            state.periodos = [];
            state.activatePeriodo = null;
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
    onLoadingExport,
    onLoadingPeriodos,
    onSetActivatePeriodo,
    onClearPeriodos,
    onLoadMessage,
    onLoadErrores,
} = periodoSlice.actions;
