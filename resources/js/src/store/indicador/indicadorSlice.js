import { createSlice } from "@reduxjs/toolkit";

export const indicadorSlice = createSlice({
    name: "indicador",
    initialState: {
        isLoading: false,
        isLoadingPDF: false,
        pageLoad: false,
        desempenoForEstados: [],
        sumaDesempenoForEstados: null,
        desempenoForAreas: [],
        desempenoForTecnicos: [],
        efectividadForAreas: [],
        efectividadForTecnicos: [],
        sumaDiasHabiles: [],
        promedioCalificacion: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload; //true oor false
        },
        onLoadingPDF: (state, { payload }) => {
            state.isLoadingPDF = payload; //true oor false
        },
        onPageLoad: (state, { payload }) => {
            state.pageLoad = payload; // true or false
        },
        onLoadDesempenoForEstados: (state, { payload }) => {
            state.desempenoForEstados = payload;
        },
        onLoadSumaDesempenoForEstados: (state, { payload }) => {
            state.sumaDesempenoForEstados = payload;
        },
        onLoadDesempenoForAreas: (state, { payload }) => {
            state.desempenoForAreas = payload;
        },
        onLoadDesempenoForTecnicos: (state, { payload }) => {
            state.desempenoForTecnicos = payload;
        },
        onLoadEfectividadForAreas: (state, { payload }) => {
            state.efectividadForAreas = payload;
        },
        onLoadEfectividadForTecnicos: (state, { payload }) => {
            state.efectividadForTecnicos = payload;
        },
        onLoadSumaDiasHabiles: (state, { payload }) => {
            state.sumaDiasHabiles = payload;
        },
        onLoadPromedioCalificacion: (state, { payload }) => {
            state.promedioCalificacion = payload;
        },
        onClearIndicadores: (state) => {
            state.isLoading = false;
            state.isLoadingPDF = false;
            state.desempenoForEstados = [];
            state.sumaDesempenoForEstados = null;
            state.desempenoForAreas = [];
            state.desempenoForTecnicos = [];
            state.efectividadForAreas = [];
            state.efectividadForTecnicos = [];
            state.sumaDiasHabiles = [];
            state.promedioCalificacion = null;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
            state.isLoadingPDF = false;
        },
    },
});

export const {
    onLoading,
    onLoadingPDF,
    onPageLoad,
    onLoadDesempenoForEstados,
    onLoadSumaDesempenoForEstados,
    onLoadDesempenoForAreas,
    onLoadDesempenoForTecnicos,
    onLoadEfectividadForAreas,
    onLoadEfectividadForTecnicos,
    onLoadSumaDiasHabiles,
    onLoadPromedioCalificacion,
    onClearIndicadores,
    onLoadErrores,
} = indicadorSlice.actions;
