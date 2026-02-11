import { createSlice } from "@reduxjs/toolkit";

export const periodoSlice = createSlice({
    name: "periodoVacacional",
    initialState: {
        isLoading: false,
        isExport: false,
        periodos: [],
        activatePeriodo: null,
        tableCalculoDias: [],
        message: undefined,
        errores: undefined,
        paginacion: {
            total: 0,
            por_pagina: 15,
            pagina_actual: 1,
            ultima_pagina: 1,
            desde: 0,
            hasta: 0,
        },
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
        onSetTableCalculoDias: (state, { payload }) => {
            state.tableCalculoDias = payload;
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
        onSetPaginacion: (state, { payload }) => {
            state.paginacion = payload;
        },
    },
});

export const {
    onLoading,
    onLoadingExport,
    onLoadingPeriodos,
    onSetTableCalculoDias,
    onSetActivatePeriodo,
    onClearPeriodos,
    onLoadMessage,
    onLoadErrores,
    onSetPaginacion,
} = periodoSlice.actions;
