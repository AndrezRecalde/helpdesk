import { createSlice } from "@reduxjs/toolkit";
export const vacacionesSlice = createSlice({
    name: "vacaciones",
    initialState: {
        isLoading: false,
        isExport: false,
        solicitudes: [],
        motivos: [],
        activateVacacion: null,
        message: undefined,
        errores: undefined
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadSolicitudesVacaciones: (state, { payload }) => {
            state.solicitudes = payload;
            state.isLoading = false;
        },
        onLoadMotivosVacaciones: (state, { payload }) => {
            state.motivos = payload;
            state.isLoading = false;
        },
        onSetActivateVacacion: (state, { payload }) => {
            state.activateVacacion = payload;
        },
        onClearVacaciones: (state) => {
            state.solicitudes = [];
            state.motivos = [];
            state.activateVacacion = null;
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
    onExport,
    onLoadSolicitudesVacaciones,
    onLoadMotivosVacaciones,
    onSetActivateVacacion,
    onClearVacaciones,
    onLoadMessage,
    onLoadErrores,
} = vacacionesSlice.actions;
