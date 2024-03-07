import { createSlice } from "@reduxjs/toolkit";

export const tipoSolicitudSlice = createSlice({
    name: "tipoSolicitud",
    initialState: {
        isLoading: false,
        tiposSolicitudes: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = false;
        },
        onLoadTiposSolicitudes: (state, { payload }) => {
            state.tiposSolicitudes = payload;
            state.isLoading = false;
        },
        onClearTiposSolicitudes: (state) => {
            state.tiposSolicitudes = [];
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
    onLoadTiposSolicitudes,
    onClearTiposSolicitudes,
    onLoadErrores,
    onClearErrores,
} = tipoSolicitudSlice.actions;
