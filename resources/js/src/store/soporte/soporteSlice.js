import { createSlice } from "@reduxjs/toolkit";

export const soporteSlice = createSlice({
    name: "soporte",
    initialState: {
        isLoading: false,
        loadPDF: false,
        soportes: [],
        activateSoporte: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadPDF: (state, { payload }) => {
            state.loadPDF = payload;
        },
        onLoadSoportes: (state, { payload }) => {
            state.soportes = payload;
            state.isLoading = false;
        },
        onUpdateSoporte: (state, { payload }) => {
            state.soportes = state.soportes.map((soporte) => {
                if (soporte.id_sop === payload.id_sop) {
                    return payload;
                }
                return soporte;
            });
            state.activateSoporte = null;
            state.isLoading = false;
        },
        onCalificarSoporte: (state) => {
            if (state.activateSoporte) {
                state.soportes = state.soportes.filter(
                    (soporte) => soporte.id_sop !== state.activateSoporte.id_sop
                );
                state.activateSoporte = null;
                state.errores = undefined;
            }
        },
        onAnularSoporte: (state) => {
            if (state.activateSoporte) {
                state.soportes = state.soportes.filter(
                    (soporte) => soporte.id_sop !== state.activateSoporte.id_sop
                );
                state.activateSoporte = null;
                state.errores = undefined;
            }
        },
        onSetActivateSoporte: (state, { payload }) => {
            state.activateSoporte = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearSoportes: (state) => {
            state.soportes = [];
            state.activateSoporte = null;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
            state.isLoading = false;
        },
        onClearMessage: (state) => {
            state.message = undefined;
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
    onLoadPDF,
    onLoadSoportes,
    onUpdateSoporte,
    onCalificarSoporte,
    onAnularSoporte,
    onSetActivateSoporte,
    onClearSoportes,
    onLoadMessage,
    onClearMessage,
    onLoadErrores,
    onClearErrores,
} = soporteSlice.actions;
