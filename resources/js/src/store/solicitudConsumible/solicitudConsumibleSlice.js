import { createSlice } from "@reduxjs/toolkit";

export const solicitudConsumibleSlice = createSlice({
    name: "solicitudConsumible",
    initialState: {
        isLoading: false,
        isExporting: false,
        solicitudes: [],
        pagination: {
            current_page: 1,
            per_page: 10,
            total: 0,
            last_page: 1,
            from: 0,
            to: 0,
        },
        activeSolicitud: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onExporting: (state, { payload }) => {
            state.isExporting = payload;
        },
        onLoadSolicitudes: (state, { payload }) => {
            state.solicitudes = Array.isArray(payload.solicitudes)
                ? payload.solicitudes
                : [];
            state.pagination = {
                current_page: payload.pagination?.pagina_actual || 1,
                per_page: payload.pagination?.por_pagina || 10,
                total: payload.pagination?.total || 0,
                last_page: payload.pagination?.ultima_pagina || 1,
                from: payload.pagination?.desde || 0,
                to: payload.pagination?.hasta || 0,
            };
            state.isLoading = false;
            state.errores = undefined;
        },
        onAddSolicitud: (state, { payload }) => {
            state.solicitudes.unshift(payload);
            state.pagination.total += 1;
            state.isLoading = false;
            state.errores = undefined;
        },
        onSetActiveSolicitud: (state, { payload }) => {
            state.activeSolicitud = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearActiveSolicitud: (state) => {
            state.activeSolicitud = null;
        },
        onClearSolicitudes: (state) => {
            state.solicitudes = [];
            state.pagination = {
                current_page: 1,
                per_page: 10,
                total: 0,
                last_page: 1,
            };
            state.activeSolicitud = null;
            state.isLoading = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
            state.isLoading = false;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
        onClearMessages: (state) => {
            state.message = undefined;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onExporting,
    onLoadSolicitudes,
    onAddSolicitud,
    onSetActiveSolicitud,
    onClearActiveSolicitud,
    onClearSolicitudes,
    onLoadMessage,
    onLoadErrores,
    onClearMessages,
} = solicitudConsumibleSlice.actions;
