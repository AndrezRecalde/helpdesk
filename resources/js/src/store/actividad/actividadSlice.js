import { createSlice } from "@reduxjs/toolkit";

export const actividadSlice = createSlice({
    name: "actividad",
    initialState: {
        isLoading: false,
        loadPDF: false,
        tableLoad: false,
        actividades: [],
        activateActividad: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadPDF: (state, { payload }) => {
            state.loadPDF = payload;
        },
        onLoadActividades: (state, { payload }) => {
            state.actividades = payload;
            state.isLoading = false;
            state.tableLoad = true;
        },
        onSetActivateActividad: (state, { payload }) => {
            state.activateActividad = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearActividades: (state) => {
            state.actividades = [];
            state.activateActividad = null;
            state.isLoading = false;
            state.loadPDF = false;
            state.tableLoad = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.loadPDF = false;
            state.tableLoad = false;
            state.actividades = [];
            state.activateActividad = null;
        },
    },
});

export const {
    onLoading,
    onLoadPDF,
    onLoadActividades,
    onSetActivateActividad,
    onClearActividades,
    onLoadMessage,
    onLoadErrores,
} = actividadSlice.actions;
