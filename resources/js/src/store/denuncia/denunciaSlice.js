import { createSlice } from "@reduxjs/toolkit";

export const denunciaSlice = createSlice({
    name: "denuncia",
    initialState: {
        isLoading: false,
        denuncias: [],
        misDenuncias: [],
        activateDenuncia: null,
        estadisticas: null,
        message: undefined,
        errores: undefined,
        cedulaVerificada: false,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadDenuncias: (state, { payload }) => {
            state.denuncias = payload;
            state.isLoading = false;
        },
        onLoadMisDenuncias: (state, { payload }) => {
            state.misDenuncias = payload;
            state.isLoading = false;
        },
        onSetActivateDenuncia: (state, { payload }) => {
            state.activateDenuncia = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onUpdateDenuncia: (state, { payload }) => {
            state.denuncias = state.denuncias.map((denuncia) => {
                if (denuncia.id === payload.id) {
                    return payload;
                }
                return denuncia;
            });
            state.activateDenuncia = null;
            state.isLoading = false;
        },
        onLoadEstadisticas: (state, { payload }) => {
            state.estadisticas = payload;
            state.isLoading = false;
        },
        onSetCedulaVerificada: (state, { payload }) => {
            state.cedulaVerificada = payload;
        },
        onClearDenuncias: (state) => {
            state.isLoading = false;
            state.denuncias = [];
            state.misDenuncias = [];
            state.activateDenuncia = null;
            state.estadisticas = null;
            state.errores = undefined;
            state.cedulaVerificada = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
            state.isLoading = false;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadDenuncias,
    onLoadMisDenuncias,
    onSetActivateDenuncia,
    onUpdateDenuncia,
    onLoadEstadisticas,
    onSetCedulaVerificada,
    onClearDenuncias,
    onLoadMessage,
    onLoadErrores,
} = denunciaSlice.actions;
