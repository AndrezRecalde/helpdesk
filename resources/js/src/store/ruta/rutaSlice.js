import { createSlice } from "@reduxjs/toolkit";
export const rutaSlice = createSlice({
    name: "ruta",
    initialState: {
        isLoadingIngreso: false,
        isLoadingDespachos: false,
        numero_ruta: null,
        ingreso: null,
        despachos: [],
        activateFichaIngreso: null,
        activateDespacho: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoadingFichaIngreso: (state, { payload }) => {
            state.isLoadingIngreso = payload;
        },
        onLoadingDespachos: (state, { payload }) => {
            state.isLoadingDespachos = payload;
        },
        onLoadNumeroRuta: (state, { payload }) => {
            state.numero_ruta = payload;
        },
        onLoadFichaIngreso: (state, { payload }) => {
            state.ingreso = payload;
        },
        onLoadDespachos: (state, { payload }) => {
            state.despachos = payload;
        },
        onSetActivateFichaIngreso: (state, { payload }) => {
            state.activateFichaIngreso = payload;
        },
        onSetActivateDespacho: (state, { payload }) => {
            state.activateDespacho = payload;
        },
        onClearFichaIngreso: (state) => {
            state.ingreso = null;
            state.numero_ruta = null;
            state.activateFichaIngreso = null;
            state.message = undefined;
            state.errores = undefined;
        },
        onClearDespachos: (state) => {
            state.despachos = [];
            state.activateDespacho = null;
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoadingIngreso = false;
            state.isLoadingDespachos = false;

        },
    },
});

export const {
    onLoadingFichaIngreso,
    onLoadingDespachos,
    onLoadNumeroRuta,
    onLoadFichaIngreso,
    onLoadDespachos,
    onSetActivateFichaIngreso,
    onSetActivateDespacho,
    onClearFichaIngreso,
    onClearDespachos,
    onLoadMessage,
    onLoadErrores,
} = rutaSlice.actions;
