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
        errores: undefined,
        paginacion: {
            total: 0,
            por_pagina: 15,
            pagina_actual: 1,
            ultima_pagina: 1,
            desde: 0,
            hasta: 0,
        },
        ultimosFiltros: {
            cdgo_usrio: null,
            periodo_vacacional_id: null,
            anio: null,
            codigo: null,
            fecha_inicio: null,
            fecha_fin: null,
        },
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
            state.paginacion = {
                total: 0,
                por_pagina: 15,
                pagina_actual: 1,
                ultima_pagina: 1,
                desde: 0,
                hasta: 0,
            };
            state.ultimosFiltros = {
                cdgo_usrio: null,
                periodo_vacacional_id: null,
                anio: null,
                codigo: null,
                fecha_inicio: null,
                fecha_fin: null,
            };
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.isLoadingMotivos = false;
        },
        onSetPaginacion: (state, { payload }) => {
            state.paginacion = payload;
        },
        onSetUltimosFiltros: (state, { payload }) => {
            state.ultimosFiltros = payload;
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
    onSetPaginacion,
    onSetUltimosFiltros,
} = vacacionesSlice.actions;
