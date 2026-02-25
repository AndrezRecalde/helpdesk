import { createSlice } from "@reduxjs/toolkit";

export const permisoSlice = createSlice({
    name: "permiso",
    initialState: {
        isLoading: false,
        isExport: false,
        permisos: [],
        paginacion: {
            total: 0,
            por_pagina: 0,
            pagina_actual: 0,
            ultima_pagina: 0,
            desde: 0,
            hasta: 0,
        },
        ultimosFiltros: {
            anio: new Date(),
            fecha_inicio: null,
            fecha_fin: null,
            id_direccion_pide: null,
            id_usu_pide: null,
            idper_permisos: null,
        },
        activatePermiso: null,
        activateStatsUsuarioPermiso: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadPermisos: (state, { payload }) => {
            state.permisos = payload;
        },
        onLoadPaginacion: (state, { payload }) => {
            state.paginacion = payload;
        },
        onSetUltimosFiltros: (state, { payload }) => {
            state.ultimosFiltros = payload;
        },
        onSetActivatePermiso: (state, { payload }) => {
            state.activatePermiso = payload;
        },
        onSetActivateStatsUsuarioPermiso: (state, { payload }) => {
            state.activateStatsUsuarioPermiso = payload;
        },
        onAnularPermiso: (state, { payload }) => {
            if (state.activatePermiso) {
                state.permisos = state.permisos.filter(
                    (permiso) =>
                        permiso.idper_permisos !==
                        state.activatePermiso.idper_permisos,
                );
            }
            state.activatePermiso = null;
        },
        onClearPermisos: (state) => {
            state.isLoading = false;
            state.isExport = false;
            state.permisos = [];
            state.paginacion = {
                total: 0,
                por_pagina: 0,
                pagina_actual: 0,
                ultima_pagina: 0,
                desde: 0,
                hasta: 0,
            };
            state.ultimosFiltros = {
                anio: new Date(),
                fecha_inicio: null,
                fecha_fin: null,
                id_direccion_pide: null,
                id_usu_pide: null,
                idper_permisos: null,
            };
            state.activatePermiso = null;
            state.activateStatsUsuarioPermiso = null;
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onExport,
    onLoadPermisos,
    onLoadPaginacion,
    onSetUltimosFiltros,
    onSetActivatePermiso,
    onSetActivateStatsUsuarioPermiso,
    onAnularPermiso,
    onClearPermisos,
    onLoadMessage,
    onLoadErrores,
} = permisoSlice.actions;
