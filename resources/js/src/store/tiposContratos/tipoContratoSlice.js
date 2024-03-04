import { createSlice } from "@reduxjs/toolkit";

export const tipoContratoSlice = createSlice({
    name: "tipoContrato",
    initialState: {
        isLoading: false,
        tiposContratos: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = false;
        },
        onLoadTiposContratos: (state, { payload }) => {
            state.tiposContratos = payload;
            state.isLoading = false;
        },
        onClearTiposContratos: (state) => {
            state.tiposContratos = [];
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
    onLoadTiposContratos,
    onClearTiposContratos,
    onLoadErrores,
    onClearErrores,
} = tipoContratoSlice.actions;
