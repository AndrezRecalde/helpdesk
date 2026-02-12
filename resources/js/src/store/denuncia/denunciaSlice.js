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
        paginationDenuncias: {
            current_page: 1,
            per_page: 10,
            total: 0,
        },
        paginationMisDenuncias: {
            current_page: 1,
            per_page: 10,
            total: 0,
        },
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadDenuncias: (state, { payload }) => {
            state.denuncias = payload.data || payload;
            state.paginationDenuncias = {
                current_page: payload.current_page || 1,
                per_page: payload.per_page || 10,
                total: payload.total || 0,
            };
            state.isLoading = false;
        },
        onLoadMisDenuncias: (state, { payload }) => {
            state.misDenuncias = payload.data || payload;
            state.paginationMisDenuncias = {
                current_page: payload.current_page || 1,
                per_page: payload.per_page || 10,
                total: payload.total || 0,
            };
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
            state.paginationDenuncias = {
                current_page: 1,
                per_page: 10,
                total: 0,
            };
            state.paginationMisDenuncias = {
                current_page: 1,
                per_page: 10,
                total: 0,
            };
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
