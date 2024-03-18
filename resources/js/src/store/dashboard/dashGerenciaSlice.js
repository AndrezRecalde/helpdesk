import { createSlice } from "@reduxjs/toolkit";

export const dashGerenciaSlice = createSlice({
    name: "dashGerencia",
    initialState: {
        isLoading: false,
        soportesForEstado: [],
        soportesPorMes: [],
        soportesForAreas: [],

        soportesActuales: 0,
        soportesNoAsignados: 0,
        soportesPendientes: 0,
        soportesCerrados: 0,

        totalUsuarios: 0,
        totalDirecciones: 0,
        totalTecnicos: 0,
        totalAreasTic: 0,

        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload; //true or false
        },
        onLoadSoportesForEstado: (state, { payload }) => {
            state.soportesForEstado = payload;
        },
        onLoadSoportePorMes: (state, { payload }) => {
            state.soportesPorMes = payload;
        },
        onLoadSoportesForAreas: (state, { payload }) => {
            state.soportesForAreas = payload;
        },
        onLoadTotalSoportesActuales: (state, { payload }) => {
            state.soportesActuales = payload;
        },
        onLoadTotalSoportesNoAsignados: (state, { payload }) => {
            state.soportesNoAsignados = payload;
        },
        onLoadTotalSoportesPendientes: (state, { payload }) => {
            state.soportesPendientes = payload;
        },
        onLoadTotalSoportesCerrados: (state, { payload }) => {
            state.soportesCerrados = payload;
        },
        onLoadTotalUsuarios: (state, { payload }) => {
            state.totalUsuarios = payload;
        },
        onLoadTotalDirecciones: (state, { payload }) => {
            state.totalDirecciones = payload;
        },
        onLoadTotalTecnicos: (state, { payload }) => {
            state.totalTecnicos = payload;
        },
        onLoadTotalAreasTic: (state, { payload }) => {
            state.totalAreasTic = payload;
        },
        onClearDashboard: (state) => {
            state.soportesForEstado = [];
            state.soportesPorMes = [];
            state.soportesForAreas = [];
            state.soportesActuales = 0;
            state.soportesNoAsignados = 0;
            state.soportesPendientes = 0;
            state.soportesCerrados = 0;
            state.totalUsuarios = 0;
            state.totalDirecciones = 0;
            state.totalTecnicos = 0;
            state.totalAreasTic = 0;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onLoadSoportesForEstado,
    onLoadSoportePorMes,
    onLoadSoportesForAreas,
    onLoadTotalSoportesActuales,
    onLoadTotalSoportesNoAsignados,
    onLoadTotalSoportesPendientes,
    onLoadTotalSoportesCerrados,
    onLoadTotalUsuarios,
    onLoadTotalDirecciones,
    onLoadTotalTecnicos,
    onLoadTotalAreasTic,
    onClearDashboard,
    onLoadErrores,
} = dashGerenciaSlice.actions;
