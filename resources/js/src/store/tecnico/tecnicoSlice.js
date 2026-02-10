import { createSlice } from "@reduxjs/toolkit";

export const tecnicoSlice = createSlice({
    name: "tecnico",
    initialState: {
        isLoading: false,
        isLoadingEstadisticas: false,
        tecnicos: [],
        estadisticas: [],
        activateTecnico: null,
        infoSoportes: undefined,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload = false }) => {
            state.isLoading = payload;
        },
        onLoadingEstadisticas: (state, { payload = false }) => {
            state.isLoadingEstadisticas = payload;
        },
        onLoadTecnicos: (state, { payload }) => {
            state.tecnicos = payload;
            state.isLoading = false;
        },
        onLoadEstadisticas: (state, { payload }) => {
            state.estadisticas = payload;
            state.isLoadingEstadisticas = false;
        },
        onDeleteTecnico: (state) => {
            if (state.activateTecnico) {
                state.tecnicos = state.tecnicos.filter(
                    (tecnico) =>
                        tecnico.cdgo_usrio !== state.activateTecnico.cdgo_usrio,
                );
            }
            state.activateTecnico = null;
            state.isLoading = false;
        },
        onSetActivateTecnico: (state, { payload }) => {
            state.activateTecnico = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onSetInfoSoportes: (state, { payload }) => {
            state.infoSoportes = payload;
            state.isLoading = false;
        },
        onClearTecnicos: (state) => {
            state.tecnicos = [];
            state.activateTecnico = null;
            state.errores = undefined;
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
    onLoadingEstadisticas,
    onLoadTecnicos,
    onLoadEstadisticas,
    onDeleteTecnico,
    onSetActivateTecnico,
    onSetInfoSoportes,
    onClearTecnicos,
    onLoadMessage,
    onLoadErrores,
    onClearErrores,
} = tecnicoSlice.actions;
