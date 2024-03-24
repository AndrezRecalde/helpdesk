import { createSlice } from "@reduxjs/toolkit";

export const tecnicoSlice = createSlice({
    name: "tecnico",
    initialState: {
        isLoading: false,
        tecnicos: [],
        activateTecnico: null,
        infoSoportes: undefined,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadTecnicos: (state, { payload }) => {
            state.tecnicos = payload;
            state.isLoading = false;
        },
        onDeleteTecnico: (state) => {
            if (state.activateTecnico) {
                state.tecnicos = state.tecnicos.filter(
                    (tecnico) =>
                        tecnico.cdgo_usrio !== state.activateTecnico.cdgo_usrio
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
    onLoadTecnicos,
    onDeleteTecnico,
    onSetActivateTecnico,
    onSetInfoSoportes,
    onClearTecnicos,
    onLoadMessage,
    onLoadErrores,
    onClearErrores,
} = tecnicoSlice.actions;
