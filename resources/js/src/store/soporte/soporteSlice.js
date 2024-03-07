import { createSlice } from "@reduxjs/toolkit";

export const soporteSlice = createSlice({
    name: "soporte",
    initialState: {
        isLoading: false,
        soportes: [],
        activateSoporte: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadSoportes: (state, { payload }) => {
            state.soportes = payload;
            state.isLoading = false;
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
    onLoadSoportes,
    onAnularSoporte,
    onSetActivateSoporte,
    onClearSoportes,
    onLoadMessage,
    onClearMessage,
    onLoadErrores,
    onClearErrores,
} = soporteSlice.actions;
