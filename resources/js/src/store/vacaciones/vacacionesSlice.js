import { createSlice } from "@reduxjs/toolkit";
export const vacacionesSlice = createSlice({
    name: "vacaciones",
    initialState: {
        isLoading: false,
        isLoadingMotivos: false,
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
        onLoadingMotivos: (state, { payload }) => {
            state.isLoadingMotivos = payload;
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
            state.isLoadingMotivos = false;
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
            state.isLoading = false;
            state.isLoadingMotivos = false;
            state.isExport = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.isLoadingMotivos = false;
        },
    },
});

export const {
    onLoading,
    onLoadingMotivos,
    onExport,
    onLoadSolicitudesVacaciones,
    onLoadMotivosVacaciones,
    onSetActivateVacacion,
    onClearVacaciones,
    onLoadMessage,
    onLoadErrores,
} = vacacionesSlice.actions;
