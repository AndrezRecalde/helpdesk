import { createSlice } from "@reduxjs/toolkit";

export const uiDenunciaSlice = createSlice({
    name: "uiDenuncia",
    initialState: {
        openedModalVerificarCedula: false,
        openedModalCrearDenuncia: false,
        openedModalDetalleDenuncia: false,
        openedModalResponderDenuncia: false,
        openedDrawerFiltros: false,
    },
    reducers: {
        onOpenModalVerificarCedula: (state) => {
            state.openedModalVerificarCedula = true;
        },
        onCloseModalVerificarCedula: (state) => {
            state.openedModalVerificarCedula = false;
        },
        onOpenModalCrearDenuncia: (state) => {
            state.openedModalCrearDenuncia = true;
        },
        onCloseModalCrearDenuncia: (state) => {
            state.openedModalCrearDenuncia = false;
        },
        onOpenModalDetalleDenuncia: (state) => {
            state.openedModalDetalleDenuncia = true;
        },
        onCloseModalDetalleDenuncia: (state) => {
            state.openedModalDetalleDenuncia = false;
        },
        onOpenModalResponderDenuncia: (state) => {
            state.openedModalResponderDenuncia = true;
        },
        onCloseModalResponderDenuncia: (state) => {
            state.openedModalResponderDenuncia = false;
        },
        onOpenDrawerFiltros: (state) => {
            state.openedDrawerFiltros = true;
        },
        onCloseDrawerFiltros: (state) => {
            state.openedDrawerFiltros = false;
        },
    },
});

export const {
    onOpenModalVerificarCedula,
    onCloseModalVerificarCedula,
    onOpenModalCrearDenuncia,
    onCloseModalCrearDenuncia,
    onOpenModalDetalleDenuncia,
    onCloseModalDetalleDenuncia,
    onOpenModalResponderDenuncia,
    onCloseModalResponderDenuncia,
    onOpenDrawerFiltros,
    onCloseDrawerFiltros,
} = uiDenunciaSlice.actions;
